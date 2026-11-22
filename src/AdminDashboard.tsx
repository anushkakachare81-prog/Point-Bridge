
import { useState } from "react";

function AdminDashboard() {
  const [shops, setShops] = useState([
    "Coffee Corner",
    "Pizza Place",
    "Local Market",
  ]);

  const [newShop, setNewShop] = useState("");
  const [message, setMessage] = useState("");

  const customers = 100;
  const points = 1500;

  function addShop() {
    const name = newShop.trim();

    if (!name) {
      setMessage("Please enter a shop name.");
      return;
    }

    if (shops.some((shop) => shop.toLowerCase() === name.toLowerCase())) {
      setMessage("This shop already exists.");
      return;
    }

    setShops((old) => [...old, name]);
    setNewShop("");
    setMessage("Shop added successfully!");
  }

  function removeShop(shopName: string) {
    setShops((old) => old.filter((shop) => shop !== shopName));
    setMessage(`${shopName} removed from this demo list.`);
  }

  return (
    <div className="admin-dashboard">
      <div className="dashboard-heading">
        <span className="tagline">PLATFORM MANAGEMENT</span>
        <h1>Admin Dashboard</h1>
        <p>Monitor and manage the Point Bridge platform.</p>
      </div>

      <div className="admin-stats">
        <div>
          <span>REGISTERED SHOPS</span>
          <h2>{shops.length}</h2>
          <p>Shops in demo list</p>
        </div>

        <div>
          <span>TOTAL CUSTOMERS</span>
          <h2>{customers}</h2>
          <p>Demo customer count</p>
        </div>

        <div>
          <span>POINTS DISTRIBUTED</span>
          <h2>{points.toLocaleString("en-IN")}</h2>
          <p>Demo points count</p>
        </div>
      </div>

      <div className="admin-add-card">
        <h2>Register a New Shop</h2>
        <p>Add a shop to the demo list.</p>

        <input
          type="text"
          placeholder="Enter shop name"
          value={newShop}
          onChange={(e) => setNewShop(e.target.value)}
        />

        <button onClick={addShop}>+ Add Shop</button>

        {message && (
          <p className="customer-message" role="status">
            {message}
          </p>
        )}
      </div>

      <div className="admin-shops-card">
        <h2>Registered Shops</h2>
        <p>Manage the shops listed in this demo.</p>

        {shops.map((shop, index) => (
          <div className="admin-shop-item" key={shop}>
            <div>
              <strong>{shop}</strong>
              <small>Shop #{index + 1} · Active in demo</small>
            </div>

            <button onClick={() => removeShop(shop)}>
              Remove
            </button>
          </div>
        ))}

        {shops.length === 0 && <p>No shops registered yet.</p>}
      </div>
    </div>
  );
}

export default AdminDashboard;
