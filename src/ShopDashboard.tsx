
import { useState } from "react";

function ShopDashboard() {
  const [shopName, setShopName] = useState("Coffee Corner");
  const [customers, setCustomers] = useState(25);
  const [points, setPoints] = useState(450);
  const [customerName, setCustomerName] = useState("");
  const [purchaseAmount, setPurchaseAmount] = useState("");
  const [message, setMessage] = useState("");

  const [history, setHistory] = useState<string[]>([]);

  function addPoints() {
    const amount = Number(purchaseAmount);
    const name = customerName.trim();

    if (!name) {
      setMessage("Please enter customer name.");
      return;
    }

    if (
      purchaseAmount.trim() === "" ||
      !Number.isFinite(amount) ||
      amount < 20
    ) {
      setMessage("Minimum purchase amount is ₹20.");
      return;
    }

    const earned = Math.floor(amount / 20);

    setPoints((old) => old + earned);
    setCustomers((old) => old + 1);

    setHistory((old) => [
      `${name} | Purchase ₹${amount} | +${earned} points`,
      ...old,
    ]);

    setMessage(`${earned} points added successfully!`);
    setCustomerName("");
    setPurchaseAmount("");
  }

  return (
    <div className="shop-dashboard">
      <div className="dashboard-heading">
        <span className="tagline">BUSINESS ACCOUNT</span>
        <h1>Shop Owner Dashboard</h1>
        <p>Manage your shop and reward your customers.</p>
      </div>

      <div className="shop-info-card">
        <span>YOUR SHOP</span>
        <h2>{shopName}</h2>
        <label>Shop Name</label>
        <input
          value={shopName}
          onChange={(e) => setShopName(e.target.value)}
          placeholder="Enter shop name"
        />
      </div>

      <div className="dashboard-stats">
        <div>
          <h3>{customers}</h3>
          <p>Customer Entries</p>
        </div>

        <div>
          <h3>{points}</h3>
          <p>Points Distributed</p>
        </div>
      </div>

      <div className="shop-action-card">
        <h2>Give Customer Points</h2>
        <p>Every ₹20 purchase = 1 point</p>

        <label>Customer Name</label>
        <input
          type="text"
          placeholder="Enter customer name"
          value={customerName}
          onChange={(e) => setCustomerName(e.target.value)}
        />

        <label>Purchase Amount (₹)</label>
        <input
          type="number"
          min="20"
          placeholder="Enter purchase amount"
          value={purchaseAmount}
          onChange={(e) => setPurchaseAmount(e.target.value)}
        />

        <button onClick={addPoints}>
          Calculate & Give Points
        </button>

        {message && (
          <p className="customer-message" role="status">
            {message}
          </p>
        )}
      </div>

      <div className="shop-history-card">
        <h2>Transaction History</h2>
        <p>Recent points activity from this demo shop.</p>

        {history.length === 0 ? (
          <p>No transactions yet.</p>
        ) : (
          history.map((item, index) => (
            <div className="history-item" key={index}>
              {item}
            </div>
          ))
        )}
      </div>
    </div>
  );
}

export default ShopDashboard;
