import { useNavigate } from "react-router-dom";

function VehicleCard({
  id,
  name,
  type,
  price,
  imageUrl,
  description,
  fuelType,
  transmission,
  seats,
  rating,
  pickupLocation,
  available,
}) {
  const navigate = useNavigate();
  const normalizedType = type?.toLowerCase() || "";
  const isBike = normalizedType.includes("bike") || normalizedType.includes("scooter");
  const category = isBike ? "Two wheeler" : "Self drive";
  const capacity = seats ? `${seats} seats` : isBike ? "2 seats" : "4 seats";
  const fuel = fuelType || "Fuel included";
  const gearType = transmission || "Manual";
  const pickup = pickupLocation || "Main Garage";
  const vehicleRating = Number(rating || 4.5).toFixed(1);

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

      <div className={`vehicle-visual ${isBike ? "bike-visual" : ""} ${imageUrl ? "has-image" : ""}`}>
        {imageUrl && (
          <img
            src={imageUrl}
            alt={`${name} ${type}`}
            loading="lazy"
            onError={(event) => {
              event.currentTarget.parentElement?.classList.remove("has-image");
              event.currentTarget.remove();
            }}
          />
        )}
        <span aria-hidden="true" />
      </div>

      <div className="vehicle-rating">
        <span>{vehicleRating} rating</span>
        <p>{pickup}</p>
      </div>

      {description && <p className="vehicle-description">{description}</p>}

      <div className="vehicle-meta">
        <span>{category}</span>
        <span>{capacity}</span>
        <span>{fuel}</span>
        <span>{gearType}</span>
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
