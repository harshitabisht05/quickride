import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import api from "../services/api"
import { useNavigate } from "react-router-dom";

function Booking() {
  const { vehicleId } = useParams();
  const navigate = useNavigate();
  const [startTime, setStartTime] = useState("");
  const [endTime, setEndTime] = useState("");
  const [success, setSuccess] = useState(false);

const handleBooking = async () => {
  try {
    const token = localStorage.getItem("token");

    const response = await api.post(
      "/bookings/",
      {
        vehicle_id: Number(vehicleId),
        start_time: startTime,
        end_time: endTime,
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    console.log(response.data);

    setSuccess(true);

    setTimeout(() => {
      navigate("/bookings");
    }, 1000);

  } catch (error) {
    console.log("Status:", error.response?.status);
    console.log("Data:", error.response?.data);
    console.error(error);
  }
};
  return (
    <div className="booking-container">
       <div className="booking-card">
      <h2>Booking Vehicle {vehicleId}</h2>

      <div>
        <label>Start Time</label>

        <input
        type = "datetime-local"
        value={startTime}
        onChange={(e) => setStartTime(e.target.value)}
        />    
      </div>

      <div>
        <label>End Time</label>
        <input
        type = "datetime-local"
        value = {endTime}
        onChange = {(e) => setEndTime(e.target.value)}
        />
</div>
        <button
        onClick={handleBooking}
        >
        Confirm Booking
        </button>
        {success && (
  <p className="success-message">
    Booking Created Successfully!
  </p>
)}
    </div>
      </div>
  );
}

export default Booking;