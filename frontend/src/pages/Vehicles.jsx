import { useState, useEffect } from "react";
import VehicleCard from "../components/VehicleCard";
import api from "../services/api";

function Vehicles() {
  const [vehicles, setVehicles] = useState([]);
  const [search, setSearch] = useState("");
  const [status, setStatus] = useState("loading");

  useEffect(() => {
    const fetchVehicles = async () => {
      try {
        setStatus("loading");
        const response = await api.get("/vehicles/");
        setVehicles(response.data);
        setStatus("ready");
      } catch (error) {
        console.error("Error fetching vehicles:", error);
        setStatus("error");
      }
    };

    fetchVehicles();
  }, []);

  const filteredVehicles = vehicles.filter((vehicle) =>
    vehicle.name.toLowerCase().includes(search.toLowerCase()) ||
    vehicle.type.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="vehicles-container">
      <div className="vehicles-header">
        <span className="section-kicker">Fleet</span>
        <h2>Available Vehicles</h2>
        <p>Find the perfect ride for your journey.</p>
      </div>

      <div className="search-container">
        <input
          className="search-box"
          type="text"
          placeholder="Search by name or type..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

      <div className="vehicle-grid">
        {status === "loading" && [1, 2, 3, 4, 5, 6].map((item) => (
          <div className="vehicle-card vehicle-skeleton" key={item}>
            <span />
            <span />
            <span />
          </div>
        ))}

        {status === "ready" && filteredVehicles.map((vehicle) => (
          <VehicleCard
            key={vehicle.id}
            id={vehicle.id}
            name={vehicle.name}
            type={vehicle.type}
            price={vehicle.price_per_hour}
            available={vehicle.available}
          />
        ))}

        {status === "ready" && filteredVehicles.length === 0 && (
          <div className="empty-state">
            <h3>No matching vehicles</h3>
            <p>Try a different name or vehicle type.</p>
          </div>
        )}

        {status === "error" && (
          <div className="empty-state error-state">
            <h3>Could not load the fleet</h3>
            <p>Check that your backend API is running and the VITE_API_URL value is correct.</p>
          </div>
        )}
      </div>
    </div>
  );
}

export default Vehicles;
