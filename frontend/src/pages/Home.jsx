import { useNavigate } from "react-router-dom";

function Home() {
  const navigate = useNavigate();

  return (
    <div className="hero">
      <h1>Rent Cars & Bikes Anytime</h1>

      <p>
        Affordable and reliable vehicle rentals
        at your fingertips.
      </p>

      <button
        onClick={() => navigate("/vehicles")}
      >
        Browse Vehicles
      </button>
    </div>
  );
}

export default Home;