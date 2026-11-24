import {
  useCallback,
  useEffect,
  useState,
  type ReactNode,
} from "react";
import { MetaMaskSDK } from "@metamask/sdk";
import {
  MetaMaskContext,
  type WalletStatus,
} from "./MetaMaskContext";

let mmsdkInstance: MetaMaskSDK | null = null;

function getSDKInstance(): MetaMaskSDK {
  if (!mmsdkInstance) {
    mmsdkInstance = new MetaMaskSDK({
      dappMetadata: {
        name: "Point Bridge",
        url: typeof window !== "undefined" ? window.location.origin : "",
      },
      checkInstallationImmediately: false,
      logging: {
        developerMode: false,
      },
    });
  }
  return mmsdkInstance;
}

export function MetaMaskProvider({ children }: { children: ReactNode }) {
  const [account, setAccount] = useState<string | null>(null);
  const [chainId, setChainId] = useState<string | null>(null);
  const [status, setStatus] = useState<WalletStatus>("idle");
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const clearError = useCallback(() => setErrorMessage(null), []);

  const disconnect = useCallback(() => {
    setAccount(null);
    setChainId(null);
    setStatus("idle");
    setErrorMessage(null);
    if (typeof window !== "undefined") {
      localStorage.removeItem("pb_wallet_connected");
    }
  }, []);

  const connect = useCallback(async () => {
    setStatus("connecting");
    setErrorMessage(null);

    try {
      const sdk = getSDKInstance();
      const provider = sdk.getProvider();

      if (!provider) {
        throw new Error(
          "MetaMask provider is not available. Please install MetaMask from metamask.io"
        );
      }

      // Request accounts using standard EIP-1102 / EIP-1193 eth_requestAccounts
      const accounts = (await provider.request({
        method: "eth_requestAccounts",
      })) as string[];

      if (accounts && accounts.length > 0) {
        const activeAccount = accounts[0];
        setAccount(activeAccount);

        const activeChainId = (await provider.request({
          method: "eth_chainId",
        })) as string;
        setChainId(activeChainId);

        setStatus("connected");
        localStorage.setItem("pb_wallet_connected", "true");
      } else {
        setStatus("idle");
      }
    } catch (err: unknown) {
      setStatus("error");
      const error = err as { code?: number; message?: string };
      if (error.code === 4001 || error.code === 401) {
        // EIP-1193 userRejectedRequest
        setErrorMessage("Connection cancelled by user.");
      } else if (error.code === -32002) {
        // Pending request in extension
        setErrorMessage(
          "MetaMask request already pending. Please check your extension."
        );
      } else {
        setErrorMessage(error.message || "Failed to connect to MetaMask.");
      }
    }
  }, []);

  // Check for existing authorization on mount if user previously connected
  useEffect(() => {
    if (typeof window === "undefined") return;
    const wasConnected = localStorage.getItem("pb_wallet_connected") === "true";
    if (!wasConnected) return;

    try {
      const sdk = getSDKInstance();
      const provider = sdk.getProvider();
      if (!provider) return;

      provider
        .request({ method: "eth_accounts" })
        .then((accounts) => {
          const accs = accounts as string[];
          if (accs && accs.length > 0) {
            setAccount(accs[0]);
            setStatus("connected");
            provider
              .request({ method: "eth_chainId" })
              .then((cid) => setChainId(cid as string))
              .catch(() => {});
          } else {
            localStorage.removeItem("pb_wallet_connected");
          }
        })
        .catch(() => {
          localStorage.removeItem("pb_wallet_connected");
        });
    } catch {
      // Non-intrusive silent check failure
    }
  }, []);

  // Subscribe to provider events (accountsChanged, chainChanged)
  useEffect(() => {
    const sdk = getSDKInstance();
    const provider = sdk.getProvider();
    if (!provider) return;

    const handleAccountsChanged = (accounts: unknown) => {
      const accs = accounts as string[];
      if (accs && accs.length > 0) {
        setAccount(accs[0]);
        setStatus("connected");
      } else {
        disconnect();
      }
    };

    const handleChainChanged = (newChainId: unknown) => {
      setChainId(newChainId as string);
    };

    provider.on("accountsChanged", handleAccountsChanged);
    provider.on("chainChanged", handleChainChanged);

    return () => {
      if (provider.removeListener) {
        provider.removeListener("accountsChanged", handleAccountsChanged);
        provider.removeListener("chainChanged", handleChainChanged);
      }
    };
  }, [disconnect]);

  return (
    <MetaMaskContext.Provider
      value={{
        account,
        chainId,
        status,
        errorMessage,
        connect,
        disconnect,
        clearError,
      }}
    >
      {children}
    </MetaMaskContext.Provider>
  );
}
