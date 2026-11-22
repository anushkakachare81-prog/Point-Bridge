
import { useState } from "react";

function PointBridge() {
  const [points, setPoints] = useState(120);
  const [connected, setConnected] = useState(false);
  const [message, setMessage] = useState("");

  const shops = [
    { name: "Coffee Corner", category: "Cafe", reward: 10 },
    { name: "Pizza Place", category: "Restaurant", reward: 20 },
    { name: "Local Market", category: "Grocery", reward: 15 },
  ];

  function earnPoints(amount: number, shop: string) {
    setPoints((previous) => previous + amount);
    setMessage(`You earned ${amount} points at ${shop}!`);
  }

  function redeemPoints() {
    if (points >= 50) {
      setPoints((previous) => previous - 50);
      setMessage("Congratulations! You redeemed 50 points!");
    } else {
      setMessage("You need at least 50 points to redeem this reward.");
    }
  }

  return (
    <div className="point-bridge" id="home">
      <header>
        <h2>Point Bridge</h2>

        <nav>
          <a href="#home">Home</a>
          <a href="#shops">Explore Shops</a>
          <a href="#rewards">My Rewards</a>
        </nav>

        <button onClick={() => {
          setConnected(!connected);
          setMessage(
            connected
              ? "Demo wallet disconnected."
              : "Demo wallet connected!"
          );
        }}>
          {connected ? "Wallet Connected" : "Connect Wallet"}
        </button>
      </header>

      <section className="hero">
        <h1>One Network. Endless Rewards.</h1>
        <p>Earn and redeem loyalty points across your favourite local shops.</p>
        <a href="#shops">
          <button>Explore Shops</button>
        </a>
      </section>

      {message && (
        <p className="message" role="status">{message}</p>
      )}

      <section id="shops">
        <h2>Explore Local Shops</h2>
        <div className="shop-grid">
          {shops.map((shop) => (
            <div className="shop-card" key={shop.name}>
              <h3>{shop.name}</h3>
              <p>{shop.category}</p>
              <p>Earn {shop.reward} points</p>
              <button onClick={() => earnPoints(shop.reward, shop.name)}>
                Earn Points
              </button>
            </div>
          ))}
        </div>
      </section>

      <section id="rewards">
        <div className="rewards-box">
          <h2>My Rewards</h2>
          <h3>Your Points Balance</h3>
          <p className="points">{points} Points</p>
          <p>Redeem 50 points for a demo reward.</p>
          <button onClick={redeemPoints}>Redeem Reward</button>
        </div>
      </section>

      <footer>
        <p>© {new Date().getFullYear()} Point Bridge</p>
        <p>Connecting local shops through shared rewards.</p>
      </footer>
    </div>
  );
}

export default PointBridge;
