import { createContext } from "react";

export type WalletStatus = "idle" | "connecting" | "connected" | "error";

export interface MetaMaskContextType {
  account: string | null;
  chainId: string | null;
  status: WalletStatus;
  errorMessage: string | null;
  connect: () => Promise<void>;
  disconnect: () => void;
  clearError: () => void;
}

export const MetaMaskContext = createContext<MetaMaskContextType | null>(null);
