import { useState } from "react";
import api from "../services/api";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";

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

      localStorage.setItem(
        "token",
        response.data.access_token
      );

      navigate("/vehicles");
    } catch (error) {
      console.error(error);
      setError(error.response?.data?.detail || "Login failed. Check your credentials.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="auth-container"> 
    <div className="auth-card">
      <h2>Login</h2>
      <p>Welcome back. Sign in to book and manage your rides.</p>

      <input
        type="text"
        placeholder="Phone Number"
        value={phone}
        onChange={(e) => setPhone(e.target.value)}
      />

      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />

      <button onClick={handleLogin} disabled={submitting}>
        {submitting ? "Signing in..." : "Login"}
      </button>

      {error && <p className="error-message">{error}</p>}

      <p className="auth-switch">
        New to QuickRide? <Link to="/register">Create an account</Link>
      </p>
    </div>
    </div>
  );
}

export default Login;
