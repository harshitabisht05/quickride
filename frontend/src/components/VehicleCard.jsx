import { useNavigate } from "react-router-dom";

function VehicleCard({ id, name, type, price, available }) {
  const navigate = useNavigate();
  console.log(id);
  return (
    <div className="vehicles-container">
    <div className="vehicle-card">
      <h3>{name}</h3>

      <p>Type: {type}</p>

      <p>₹{price}/hour</p>

     <p className={available ? "available" : "unavailable"}>
  {available ? "Available" : "Unavailable"}
</p>

      {available && (
        <button
          onClick={() => navigate(`/booking/${id}`)}
        >
          Book Now
        </button>
      )}
      
    </div>
    </div>
  );
}

export default VehicleCard;