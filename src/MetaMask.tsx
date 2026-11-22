import { useState } from "react";

function MetaMask() {
  const [connected, setConnected] = useState(false);

  

  return (
    <div className="shop-action-card">
      <h2>MetaMask Wallet</h2>
      <p>Connect your wallet to Point Bridge</p>

      {connected ? (
        <>
          <p>Demo connection only — MetaMask is not connected.</p>
          <p>Demo wallet address is not connected.</p>

          <button onClick={() => setConnected(false)}>
            Disconnect Wallet
          </button>
        </>
      ) : (
        <button onClick={() => setConnected(true)}>
          Connect MetaMask
        </button>
      )}

      <p className="customer-message">
        Demo Wallet Interface
      </p>
    </div>
  );
}

export default MetaMask;