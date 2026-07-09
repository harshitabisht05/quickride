import { useNavigate } from "react-router-dom";
import HomeVehicles from "../components/HomeVehicles";

const suggestions = [
  {
    title: "Ride now",
    text: "Find nearby cars and bikes for daily trips, errands, and short plans.",
    action: "Explore",
  },
  {
    title: "Reserve",
    text: "Choose your vehicle ahead of time and keep the day predictable.",
    action: "Schedule",
  },
  {
    title: "Flexible fleet",
    text: "Switch between cars, bikes, and scooters based on the trip.",
    action: "View fleet",
  },
];

const steps = [
  ["01", "Pick vehicle", "Compare nearby cars and bikes with clear pricing."],
  ["02", "Enter trip", "Choose pickup, destination, and rental time."],
  ["03", "Start riding", "Confirm your booking and get moving in minutes."],
];

const reasons = [
  ["Upfront prices", "See hourly rates before you reserve."],
  ["Nearby pickup", "Choose vehicles from convenient pickup points."],
  ["Account security", "Protected sign-in for bookings and trip history."],
  ["Flexible fleet", "Cars, bikes, and scooters for different plans."],
];

function Home() {
  const navigate = useNavigate();

  return (
    <>
      <section className="hero">
        <div className="hero-left hero-center">
          <span className="hero-tag">QuickRide rentals</span>

          <h1>Book your next ride in seconds.</h1>

          <p>
            A fast, clean way to rent cars and two-wheelers for commutes,
            errands, and plans that change at the last minute.
          </p>

          <div className="hero-buttons">
            <button
              className="primary-btn"
              type="button"
              onClick={() => navigate("/vehicles")}
            >
              See vehicles
            </button>
            <button
              className="secondary-btn"
              type="button"
              onClick={() => navigate("/login")}
            >
              Sign in
            </button>
          </div>

          <div className="hero-highlights" aria-label="QuickRide highlights">
            <div>
              <strong>3 min</strong>
              <span>average booking</span>
            </div>
            <div>
              <strong>24/7</strong>
              <span>vehicle access</span>
            </div>
            <div>
              <strong>0 hidden</strong>
              <span>extra charges</span>
            </div>
          </div>
        </div>
      </section>

      <section className="suggestions-section">
        <div className="section-title compact">
          <span>Suggestions</span>
          <h2>Start with what you need</h2>
        </div>

        <div className="suggestions-grid">
          {suggestions.map((item) => (
            <article className="suggestion-card" key={item.title}>
              <div>
                <h3>{item.title}</h3>
                <p>{item.text}</p>
              </div>
              <button type="button" onClick={() => navigate("/vehicles")}>
                {item.action}
              </button>
            </article>
          ))}
        </div>
      </section>

      <section className="how-it-works">
        <div className="section-title">
          <span>How it works</span>
          <h2>Book your next ride in minutes</h2>
          <p>QuickRide keeps the trip flow direct from search to confirmation.</p>
        </div>

        <div className="steps-container">
          {steps.map(([number, title, text]) => (
            <article className="step-card" key={title}>
              <span className="step-number">{number}</span>
              <h3>{title}</h3>
              <p>{text}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="featured-section">
        <div className="section-title">
          <span>Nearby fleet</span>
          <h2>Popular vehicles around you</h2>
          <p>Pick from available cars and two-wheelers with transparent pricing.</p>
        </div>

        <HomeVehicles />
      </section>

      <section className="features-section">
        <div className="feature-copy">
          <span>Why QuickRide</span>
          <h2>Designed for fast city movement</h2>
          <p>
            The experience is built around the essentials: clear routes, quick
            decisions, and dependable access to vehicles when plans change.
          </p>
          <button
            className="primary-btn"
            type="button"
            onClick={() => navigate("/vehicles")}
          >
            Browse fleet
          </button>
        </div>

        <div className="features-grid">
          {reasons.map(([title, text]) => (
            <article className="feature-card" key={title}>
              <h3>{title}</h3>
              <p>{text}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="cta-section">
        <div className="cta-content">
          <span>QuickRide</span>
          <h2>Ready when you are</h2>
          <p>
            Find a nearby vehicle, review the price, and confirm your next trip.
          </p>
          <button
            className="cta-btn"
            type="button"
            onClick={() => navigate("/vehicles")}
          >
            Get started
          </button>
        </div>
      </section>

      <footer className="footer">
        <div className="footer-top">
          <div>
            <h3>QuickRide</h3>
            <p>Simple vehicle rentals for everyday city travel.</p>
          </div>

          <div>
            <h4>Company</h4>
            <a href="/">Home</a>
            <a href="/vehicles">Vehicles</a>
            <a href="/bookings">Bookings</a>
          </div>
        </div>

        <div className="footer-bottom">
          2026 QuickRide. All rights reserved.
        </div>
      </footer>
    </>
  );
}

export default Home;
