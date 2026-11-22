
import { useEffect, useState } from "react";
import { supabase } from "./supabaseClient";


type Reward = {
  id: string;
  reward_name: string;
  points_required: number;
};

function CustomerDashboard() {
  const [points, setPoints] = useState(120);
  const [purchaseAmount, setPurchaseAmount] = useState("");
  const [redeemAmount, setRedeemAmount] = useState("100");
  const [message, setMessage] = useState("");
  const [rewards, setRewards] = useState<Reward[]>([]);
  const [loadingRewards, setLoadingRewards] = useState(true);

  const [history, setHistory] = useState([
    "Welcome Bonus: +120 points",
  ]);

  useEffect(() => {
    async function loadRewards() {
      const { data, error } = await supabase
        .from("rewards")
        .select("id, reward_name, points_required")
        .order("points_required", { ascending: true });
if (error) {
  console.error("Rewards load error:", error);
  setMessage("Rewards could not load. Check Supabase access settings.");
} else {
  console.log("Rewards loaded:", data);
  setRewards(data ?? []);
}

      setLoadingRewards(false);
    }

    loadRewards();
  }, []);

  function earnPoints() {
    const amount = Number(purchaseAmount);

    if (
      purchaseAmount.trim() === "" ||
      !Number.isFinite(amount) ||
      amount < 20
    ) {
      setMessage("Please enter at least ₹20.");
      return;
    }

    const earned = Math.floor(amount / 20);
    setPoints((old) => old + earned);
    setHistory((old) => [
      `Purchase ₹${amount}: +${earned} points`,
      ...old,
    ]);
    setMessage(`Congratulations! You earned ${earned} points.`);
    setPurchaseAmount("");
  }

  function redeemPoints() {
    const amount = Number(redeemAmount);

    if (
      redeemAmount.trim() === "" ||
      !Number.isInteger(amount) ||
      amount < 100 ||
      amount % 100 !== 0
    ) {
      setMessage("Redeem points in multiples of 100.");
      return;
    }

    if (amount > points) {
      setMessage("You don't have enough points!");
      return;
    }

    setPoints((old) => old - amount);
    setHistory((old) => [
      `Redeemed ${amount} points: ₹${amount} discount`,
      ...old,
    ]);
    setMessage(`Success! ₹${amount} discount redeemed.`);
    setRedeemAmount("100");
  }

  return (
    <div className="customer-dashboard">
      <div className="dashboard-heading">
        <span className="tagline">CUSTOMER ACCOUNT</span>
        <h1>My Rewards</h1>
        <p>Welcome to your Point Bridge account.</p>
      </div>

      <div className="customer-points-card">
        <p>YOUR AVAILABLE POINTS</p>
        <h1>{points}</h1>
        <span>Points Balance</span>
        <small>Keep shopping. Keep earning.</small>
      </div>

      <div className="customer-actions">
        <div className="customer-action-card">
          <h2>Earn Points</h2>
          <p>Every ₹20 purchase = 1 point</p>

          <input
            type="number"
            min="20"
            placeholder="Purchase amount (₹)"
            value={purchaseAmount}
            onChange={(e) => setPurchaseAmount(e.target.value)}
          />

          <button onClick={earnPoints}>
            Calculate & Earn
          </button>
        </div>

        <div className="customer-action-card">
          <h2>Redeem Rewards</h2>
          <p>100 Points = ₹100 Discount</p>

          <input
            type="number"
            min="100"
            step="100"
            placeholder="Points to redeem"
            value={redeemAmount}
            onChange={(e) => setRedeemAmount(e.target.value)}
          />

          <button onClick={redeemPoints}>
            Redeem Points
          </button>
        </div>
      </div>

      {message && (
        <div className="customer-message">{message}</div>
      )}

      <div className="customer-history">
              <div className="customer-history">
        <h2>Available Rewards</h2>

        {loadingRewards ? (
          <p>Loading rewards...</p>
        ) : rewards.length === 0 ? (
          <p>No rewards available yet.</p>
        ) : (
          rewards.map((reward) => (
            <div className="history-item" key={reward.id}>
              <span>{reward.reward_name}</span>
              <strong>{reward.points_required} points</strong>
            </div>
          ))
        )}
      </div>

      <div className="customer-history">
        <h2>Transaction History</h2>
        <p>Your recent points activity</p>

        {history.map((item, index) => (
          <div className="history-item" key={index}>
            <span>{item}</span>
          </div>
        ))}
      </div>

      
      </div>
    </div>
  );
}

export default CustomerDashboard;
