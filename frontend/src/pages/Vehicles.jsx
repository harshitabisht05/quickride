import { useState, useEffect } from "react";
import VehicleCard from "../components/VehicleCard";
import api from "../services/api";

function Vehicles() {
  const [vehicles, setVehicles] = useState([]);
  const [search, setSearch] = useState("");

  useEffect(() => {
    fetchVehicles();
  }, []);

  const fetchVehicles = async () => {
    try {
      const response = await api.get("/vehicles/");
      setVehicles(response.data);
    } catch (error) {
      console.error("Error fetching vehicles:", error);
    }
  };

   const filteredVehicles = vehicles.filter((vehicle) =>
    vehicle.name.toLowerCase().includes(search.toLowerCase()) || vehicle.type.toLowerCase().includes(search.toLowerCase())
);
  return (
    <div className="vehicles-container">
      <div className="vehicles-header">
      <h2>Available Vehicles</h2>
       <p>Find the perfect ride for your journey.</p>
</div>
       <div className="search-container">
        <input
          className="search-box"
          type="text"
          placeholder="Search vehicle..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        </div>
<div className="vehicle-grid">
      {filteredVehicles.map((vehicle) => (
        <VehicleCard
          key={vehicle.id}
          id={vehicle.id}
          name={vehicle.name}
          type={vehicle.type}
          price={vehicle.price_per_hour}
          available={vehicle.available}
        />
      ))}
      </div>
      </div>

  );
}

export default Vehicles;