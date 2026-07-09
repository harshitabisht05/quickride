import { useState } from "react";
import api from "../services/api";
import { Link, useNavigate } from "react-router-dom";

function Login() {
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [submitting, setSubmitting] = useState(false);

  const navigate = useNavigate();

  const handleLogin = async () => {
    if (!phone || !password) {
      setError("Enter your phone number and password.");
      return;
    }

    try {
      setSubmitting(true);
      setError("");

      const response = await api.post("/auth/login", {
        phone,
        password,
      });

      localStorage.setItem("token", response.data.access_token);

      // Notify Navbar that login happened
      window.dispatchEvent(new Event("authChange"));
      navigate("/");
    } catch (error) {
      setError(
        error.response?.data?.detail ||
          "Login failed. Check your credentials."
      );
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <section className="auth-page">
      <div className="auth-visual">
        <span className="auth-kicker">QuickRide</span>
        <h1>Move through the city without the wait.</h1>
        <p>
          Sign in to reserve vehicles, manage upcoming bookings, and keep your
          trip history in one clean place.
        </p>

        <div className="auth-route-card" aria-hidden="true">
          <div className="auth-route-line">
            <span />
            <span />
          </div>
          <div>
            <strong>5 min</strong>
            <span>to confirm a ride</span>
          </div>
          <div>
            <strong>24/7</strong>
            <span>booking access</span>
          </div>
        </div>
      </div>

      <div className="auth-form-wrap">
        <div className="auth-card">
          <span className="auth-eyebrow">Sign in</span>
          <h2>Welcome back</h2>
          <p>Use your phone number to continue to QuickRide.</p>

          <div className="input-group">
            <label htmlFor="login-phone">Phone Number</label>
            <input
              id="login-phone"
              type="text"
              placeholder="Enter phone number"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
            />
          </div>

          <div className="input-group">
            <label htmlFor="login-password">Password</label>
            <input
              id="login-password"
              type="password"
              placeholder="Enter password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          <button
            className="login-btn"
            onClick={handleLogin}
            disabled={submitting}
          >
            {submitting ? "Signing in..." : "Sign in"}
          </button>

          {error && <p className="error">{error}</p>}

          <p className="register-text">
            New to QuickRide? <Link to="/register">Create an account</Link>
          </p>
        </div>
      </div>
    </section>
  );
}

export default Login;
