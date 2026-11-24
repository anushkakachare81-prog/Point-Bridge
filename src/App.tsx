
import { useEffect, useState } from "react";
import "./App.css";
import Auth from "./Auth";
import { supabase } from "./supabaseClient";
import type { Session } from "@supabase/supabase-js";

import CustomerDashboard from "./CustomerDashboard";
import ShopDashboard from "./ShopDashboard";
import AdminDashboard from "./AdminDashboard";
import { useMetaMask } from "./hooks/useMetaMask";

function App() {
  const { account, status, connect, disconnect, errorMessage, clearError } =
    useMetaMask();
  const [session, setSession] = useState<Session | null>(null);
  const [role, setRole] = useState("");
  const [showSplash, setShowSplash] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowSplash(false);
    }, 3000);

    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    supabase.auth.getSession().then(({ data }) => {
      setSession(data.session);
    });

    const { data } = supabase.auth.onAuthStateChange(
      (_event, session) => {
        setSession(session);
      }
    );

    return () => data.subscription.unsubscribe();
  }, []);

  if (showSplash) {
    return (
      <div className="splash-container">

        <svg className="wave-top-left" viewBox="0 0 500 400" preserveAspectRatio="none">
          <path d="M0 0 H500 C350 100 300 180 0 300 Z" fill="#6c1ce8" opacity="0.10" />
          <path d="M0 0 H350 C250 90 180 150 0 220 Z" fill="#6c1ce8" opacity="0.12" />
        </svg>

        <svg className="wave-bottom-right" viewBox="0 0 500 400" preserveAspectRatio="none">
          <path d="M500 400 H0 C150 300 200 220 500 100 Z" fill="#6c1ce8" opacity="0.10" />
          <path d="M500 400 H150 C250 310 320 250 500 180 Z" fill="#6c1ce8" opacity="0.12" />
        </svg>

        <div className="circle-top-right" />
        <div className="circle-bottom-left" />

        <div className="dots-grid dots-top-right">
          {Array.from({ length: 16 }).map((_, i) => (
            <span className="dot" key={i} />
          ))}
        </div>

        <div className="dots-grid dots-bottom-left">
          {Array.from({ length: 16 }).map((_, i) => (
            <span className="dot" key={i} />
          ))}
        </div>

        <div className="content-wrapper">

          <svg className="logo-svg" viewBox="0 0 180 150" role="img" aria-label="Point Bridge logo">
            <path d="M35 125 V25 H85 C120 25 120 80 85 80 H55" fill="none" stroke="#6200ea" strokeWidth="16" strokeLinecap="round" strokeLinejoin="round" />
            <path d="M58 112 C85 105 112 100 145 55" fill="none" stroke="#171142" strokeWidth="10" strokeLinecap="round" />
            <rect x="112" y="83" width="10" height="24" rx="3" fill="#ffb300" />
            <rect x="128" y="70" width="10" height="37" rx="3" fill="#ffb300" />
            <rect x="144" y="55" width="10" height="52" rx="3" fill="#ffb300" />
            <path d="M145 15 L150 27 L162 32 L150 37 L145 49 L140 37 L128 32 L140 27 Z" fill="#ffb300" />
          </svg>

          <h1 className="brand-title">
            <span className="point">Point </span>
            <span className="bridge">Bridge</span>
          </h1>

          <div className="tagline-row">
            <span className="side-line left" />
            <span className="splash-tagline">
              Every purchase has something extra.
            </span>
            <span className="side-line right" />
          </div>

          <div className="progress-track">
            <div className="progress-fill" />
          </div>

          <p className="welcome-text">
            Welcome to Point Bridge...
          </p>

        </div>
      </div>
    );
  }


  if (role === "customer" && !session) {
    return <Auth />;
  }

  if (role === "customer") {
    return (
      <div className="home-page">
        <nav className="navbar">
          <h2>◇ Point Bridge</h2>
          <div className="navbar-actions">
            {status === "connected" && account && (
              <span
                style={{
                  background: "#1c1936",
                  border: "1px solid #a17aff66",
                  borderRadius: "10px",
                  padding: "8px 14px",
                  fontSize: "13px",
                  color: "#c5a5ff",
                }}
              >
                ● {account.slice(0, 6)}...{account.slice(-4)}
              </span>
            )}
            <button onClick={() => setRole("")}>
              ← Back to Home
            </button>
          </div>
        </nav>
        <CustomerDashboard />
      </div>
    );
  }

  if (role === "shop") {
    return (
      <div className="home-page">
        <nav className="navbar">
          <h2>◇ Point Bridge</h2>
          <div className="navbar-actions">
            {status === "connected" && account && (
              <span
                style={{
                  background: "#1c1936",
                  border: "1px solid #a17aff66",
                  borderRadius: "10px",
                  padding: "8px 14px",
                  fontSize: "13px",
                  color: "#c5a5ff",
                }}
              >
                ● {account.slice(0, 6)}...{account.slice(-4)}
              </span>
            )}
            <button onClick={() => setRole("")}>
              ← Back to Home
            </button>
          </div>
        </nav>
        <ShopDashboard />
      </div>
    );
  }

  if (role === "admin") {
    return (
      <div className="home-page">
        <nav className="navbar">
          <h2>◇ Point Bridge</h2>
          <div className="navbar-actions">
            {status === "connected" && account && (
              <span
                style={{
                  background: "#1c1936",
                  border: "1px solid #a17aff66",
                  borderRadius: "10px",
                  padding: "8px 14px",
                  fontSize: "13px",
                  color: "#c5a5ff",
                }}
              >
                ● {account.slice(0, 6)}...{account.slice(-4)}
              </span>
            )}
            <button onClick={() => setRole("")}>
              ← Back to Home
            </button>
          </div>
        </nav>
        <AdminDashboard />
      </div>
    );
  }

  return (
    <div className="home-page">
      <nav className="navbar">
        <h2>◇ Point Bridge</h2>

        <div className="navbar-actions">
          <span>Points • Rewards • Benefits</span>
          {status === "connected" && account ? (
            <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
              <span
                style={{
                  background: "#1c1936",
                  border: "1px solid #a17aff66",
                  borderRadius: "10px",
                  padding: "8px 14px",
                  fontSize: "13px",
                  color: "#c5a5ff",
                }}
              >
                ● {account.slice(0, 6)}...{account.slice(-4)}
              </span>
              <button className="connect-wallet-btn" onClick={disconnect}>
                Disconnect
              </button>
            </div>
          ) : (
            <button
              className="connect-wallet-btn"
              onClick={connect}
              disabled={status === "connecting"}
            >
              {status === "connecting" ? "Connecting..." : "Connect Wallet"}
            </button>
          )}
        </div>
      </nav>

      {errorMessage && (
        <div
          className="customer-message"
          style={{
            maxWidth: "600px",
            margin: "16px auto",
            cursor: "pointer",
            background: "#2a1226",
            border: "1px solid #ff446655",
            color: "#ff9999",
          }}
          onClick={clearError}
          title="Click to dismiss"
        >
          {errorMessage} (click to dismiss)
        </div>
      )}

      <main>
        <section className="hero" id="home">
          <span className="tagline">
            A SMARTER WAY TO REWARD
          </span>

          <h1>
            Every purchase has
            <br />
            <span>something extra.</span>
          </h1>

          <p>
            Collect points, discover rewards and enjoy
            benefits from your favourite shops.
          </p>
        </section>

        <section className="role-section">
          <div className="section-heading">
            <span className="tagline">ONE PLATFORM</span>
            <h2>Choose Your Role</h2>
            <p>Select how you want to use Point Bridge.</p>
          </div>

          <div className="role-cards">
            <button
              onClick={async () => {
                const { error } = await supabase.auth.signOut();

                if (error) {
                  alert("Logout failed. Please try again.");
                  return;
                }

                setSession(null);
                setRole("customer");
              }}
            >
              <span>01</span>
              <strong>Customer</strong>
              <small>View Points & Rewards</small>
              <b>Open Dashboard →</b>
            </button>

            <button onClick={() => setRole("shop")}>
              <span>02</span>
              <strong>Shop Owner</strong>
              <small>Manage Shop & Customers</small>
              <b>Open Dashboard →</b>
            </button>

            <button onClick={() => setRole("admin")}>
              <span>03</span>
              <strong>Admin</strong>
              <small>Manage All Shops & Platform</small>
              <b>Open Dashboard →</b>
            </button>
          </div>
        </section>
      </main>

      <footer>
        <strong>◇ Point Bridge</strong>
        <p>Points • Rewards • Connect</p>
      </footer>
    </div>
  );
}

export default App;
