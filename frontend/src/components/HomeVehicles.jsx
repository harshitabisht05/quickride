import { useEffect, useState } from "react";
import api from "../services/api";
import VehicleCard from "./VehicleCard";

function HomeVehicles() {

  const [vehicles, setVehicles] = useState([]);
  const [status, setStatus] = useState("loading");

  useEffect(() => {
    const fetchVehicles = async () => {
      try {
        setStatus("loading");
        const response = await api.get("/vehicles/");

        const availableVehicles = response.data.filter(
          (vehicle) => vehicle.available === true
        );

        setVehicles(availableVehicles.slice(0, 3));
        setStatus("ready");
      } catch (error) {
        console.error(error);
        setStatus("error");
      }
    };

    fetchVehicles();
  }, []);

  return (
    <section className="home-vehicles">
      <div className="vehicle-grid">
        {status === "loading" && [1, 2, 3].map((item) => (
          <div className="vehicle-card vehicle-skeleton" key={item}>
            <span />
            <span />
            <span />
          </div>
        ))}

        {status === "ready" && vehicles.map((vehicle) => (
          <VehicleCard
            key={vehicle.id}
            id={vehicle.id}
            name={vehicle.name}
            type={vehicle.type}
            price={vehicle.price_per_hour}
            imageUrl={vehicle.image_url}
            description={vehicle.description}
            fuelType={vehicle.fuel_type}
            transmission={vehicle.transmission}
            seats={vehicle.seats}
            rating={vehicle.rating}
            pickupLocation={vehicle.pickup_location}
            available={vehicle.available}
          />
        ))}

        {status === "ready" && vehicles.length === 0 && (
          <div className="empty-state">
            <h3>No vehicles available right now</h3>
            <p>Check the full fleet or try again in a few minutes.</p>
          </div>
        )}

        {status === "error" && (
          <div className="empty-state error-state">
            <h3>Could not load vehicles</h3>
            <p>Make sure the backend is running and try refreshing the page.</p>
          </div>
        )}
      </div>

    </section>
  );
}

export default HomeVehicles;
