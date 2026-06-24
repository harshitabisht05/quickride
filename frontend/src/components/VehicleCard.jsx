import { useNavigate } from "react-router-dom";

function VehicleCard({ id, name, type, price, available }) {
  const navigate = useNavigate();
  const normalizedType = type?.toLowerCase() || "";
  const isBike = normalizedType.includes("bike") || normalizedType.includes("scooter");
  const category = isBike ? "Two wheeler" : "Self drive";
  const capacity = isBike ? "2 seats" : "4 seats";
  const range = isBike ? "80 km range" : "180 km range";
  const pickup = isBike ? "Helmet included" : "AC included";

  return (
    <div className="vehicle-card">
      <div className="vehicle-card-top">
        <div>
          <p className="vehicle-type">{type}</p>
          <h3>{name}</h3>
        </div>
        <span className={available ? "status-pill available" : "status-pill unavailable"}>
          {available ? "Available" : "Unavailable"}
        </span>
      </div>

      <div className={`vehicle-visual ${isBike ? "bike-visual" : ""}`} aria-hidden="true">
        <span />
      </div>

      <div className="vehicle-meta">
        <span>{category}</span>
        <span>{capacity}</span>
        <span>{range}</span>
        <span>{pickup}</span>
      </div>

      <p className="vehicle-price">Rs {price}<span>/hour</span></p>

      {available && (
        <button
          onClick={() => navigate(`/booking/${id}`)}
        >
          Book Now
        </button>
      )}
    </div>
  );
}

export default VehicleCard;
