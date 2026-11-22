
import { useState } from "react";

function Login() {
  const [isSignup, setIsSignup] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    if (!email.trim()) {
      setMessage("Please enter your email.");
      return;
    }

    setMessage(
      isSignup
        ? `Welcome, ${name || "Customer"}! Demo signup successful.`
        : "Demo login successful!"
    );
  }

  return (
    <div className="login-page">
      <div className="login-card">
        <h1>Point Bridge</h1>
        <h2>{isSignup ? "Create Account" : "Welcome Back"}</h2>
        <p>{isSignup ? "Join our rewards network" : "Login to your account"}</p>

        <form onSubmit={handleSubmit}>
          {isSignup && (
            <input
              placeholder="Your Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          )}

          <input
            type="email"
            placeholder="Email Address"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />

          <button type="submit">
            {isSignup ? "Sign Up" : "Login"}
          </button>
        </form>

        {message && <p role="status">{message}</p>}

        <button
          type="button"
          onClick={() => {
            setIsSignup(!isSignup);
            setMessage("");
          }}
        >
          {isSignup
            ? "Already have an account? Login"
            : "New customer? Sign Up"}
        </button>
      </div>
    </div>
  );
}

export default Login;
