import { useNavigate } from "react-router-dom";
import HomeVehicles from "../components/HomeVehicles";

function Home() {
  const navigate = useNavigate();

  return (
    <>
      <section className="hero">
        <div className="hero-content">
          <span className="hero-badge">
            Smart vehicle rentals
          </span>

          <h1>
            Rent cars and bikes without the counter queue.
          </h1>

          <p>
            Book a clean, available ride in seconds for errands, commutes, and weekend plans.
          </p>

          <div className="hero-actions">
            <button onClick={() => navigate("/vehicles")}>
              Browse Vehicles
            </button>
            <span>From Rs 99/hour</span>
          </div>
        </div>

        <div className="hero-panel" aria-hidden="true">
          <div className="hero-vehicle">
            <span className="car-body" />
            <span className="car-window" />
            <span className="car-wheel wheel-left" />
            <span className="car-wheel wheel-right" />
          </div>
          <div className="hero-stat">
            <strong>24/7</strong>
            <span>Instant pickup</span>
          </div>
          <div className="hero-stat">
            <strong>3 min</strong>
            <span>Average booking</span>
          </div>
        </div>
      </section>

      <section className="how-it-works">

        <h2>How It Works</h2>

        <div className="steps-grid">

          <div className="step-card">
            <span>01</span>
            <h3>Browse</h3>
            <p>Explore available vehicles.</p>
          </div>

          <div className="step-card">
            <span>02</span>
            <h3>Book</h3>
            <p>Select your preferred vehicle and timing.</p>
          </div>

          <div className="step-card">
            <span>03</span>
            <h3>Confirm</h3>
            <p>Reserve your vehicle instantly.</p>
          </div>

          <div className="step-card">
            <span>04</span>
            <h3>Ride</h3>
            <p>Enjoy a smooth and hassle-free journey.</p>
          </div>

        </div>

      </section>


      <HomeVehicles />

      <section className="features-section">

        <h2>Why Choose QuickRide?</h2>

        <div className="features-grid">

          <div className="feature-card">
            <span className="feature-icon">01</span>
            <h3>Instant Booking</h3>
            <p>Book vehicles within seconds.</p>
          </div>

          <div className="feature-card">
            <span className="feature-icon">02</span>
            <h3>Secure Login</h3>
            <p>Protected user authentication using JWT.</p>
          </div>

          <div className="feature-card">
            <span className="feature-icon">03</span>
            <h3>Real-Time Availability</h3>
            <p>See only vehicles that are available.</p>
          </div>

          <div className="feature-card">
            <span className="feature-icon">04</span>
            <h3>Transparent Pricing</h3>
            <p>No hidden charges. Pay only what you see.</p>
          </div>

        </div>

      </section>

      <section className="cta-section">

        <h2>Ready To Start Your Journey?</h2>

        <p>
          Browse available vehicles and book your ride today.
        </p>

        <button
          onClick={() => navigate("/vehicles")}
        >
          Browse Vehicles
        </button>

      </section>

      <footer className="footer">
        <h3>QuickRide</h3>
        <p>Fast, affordable and secure vehicle rentals.</p>
      </footer>
    </>
  );
}

export default Home;
