import { useEffect, useState } from "react";
import api from "../services/api";
import VehicleCard from "./VehicleCard";

function HomeVehicles() {

  const [vehicles, setVehicles] = useState([]);

  useEffect(() => {
    fetchVehicles();
  }, []);

  const fetchVehicles = async () => {
    try {
      const response = await api.get("/vehicles/");

      const availableVehicles = response.data.filter(
        (vehicle) => vehicle.available === true
      );

      setVehicles(availableVehicles.slice(0, 3));

    } catch (error) {
      console.error(error);
    }
  };

  return (
    <section className="home-vehicles">

      <h2>Available Right Now</h2>

      <div className="vehicle-grid">

        {vehicles.map((vehicle) => (
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

    </section>
  );
}

export default HomeVehicles;