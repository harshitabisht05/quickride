import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import api from "../services/api";

function Register() {
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [submitting, setSubmitting] = useState(false);

  const handleRegister = async () => {
    if (!name || !phone || !password) {
      setError("Fill in all fields to create your account.");
      return;
    }

    try {
      setSubmitting(true);
      setError("");
      await api.post("/auth/register", {
        name,
        phone,
        password,
      });

      navigate("/login");
    } catch (error) {
      console.error(error);
      setError(error.response?.data?.detail || "Registration failed. Please try again.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <section className="auth-page register-page">
      <div className="auth-visual">
        <span className="auth-kicker">Get started</span>
        <h1>Your next ride is one account away.</h1>
        <p>
          Create a QuickRide profile to book faster, track reservations, and
          keep your rental details ready whenever plans change.
        </p>

        <div className="auth-route-card" aria-hidden="true">
          <div className="auth-route-line">
            <span />
            <span />
          </div>
          <div>
            <strong>3 min</strong>
            <span>average setup</span>
          </div>
          <div>
            <strong>0 hidden</strong>
            <span>extra charges</span>
          </div>
        </div>
      </div>

      <div className="auth-form-wrap">
        <div className="auth-card">
          <span className="auth-eyebrow">Create account</span>
          <h2>Join QuickRide</h2>
          <p>Create your account to reserve vehicles faster.</p>

          <div className="input-group">
            <label htmlFor="register-name">Full Name</label>
            <input
              id="register-name"
              type="text"
              placeholder="Enter full name"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>

          <div className="input-group">
            <label htmlFor="register-phone">Phone Number</label>
            <input
              id="register-phone"
              type="text"
              placeholder="Enter phone number"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
            />
          </div>

          <div className="input-group">
            <label htmlFor="register-password">Password</label>
            <input
              id="register-password"
              type="password"
              placeholder="Create password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          <button onClick={handleRegister} disabled={submitting}>
            {submitting ? "Creating account..." : "Create account"}
          </button>

          {error && <p className="error-message">{error}</p>}

          <p className="auth-switch">
            Already registered? <Link to="/login">Sign in</Link>
          </p>
        </div>
      </div>
    </section>
  );
}

export default Register;
