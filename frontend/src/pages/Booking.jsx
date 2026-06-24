import { useParams } from "react-router-dom";
import { useState } from "react";
import api from "../services/api"
import { useNavigate } from "react-router-dom";

function Booking() {
  const { vehicleId } = useParams();
  const navigate = useNavigate();
  const [startTime, setStartTime] = useState("");
  const [endTime, setEndTime] = useState("");
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState("");
  const [submitting, setSubmitting] = useState(false);

const handleBooking = async () => {
  if (!startTime || !endTime) {
    setError("Choose both start and end time before confirming.");
    return;
  }

  if (new Date(endTime) <= new Date(startTime)) {
    setError("End time must be after the start time.");
    return;
  }

  try {
    setSubmitting(true);
    setError("");
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
    setError(error.response?.data?.detail || "Booking failed. Please try again.");
  } finally {
    setSubmitting(false);
  }
};
  return (
    <div className="booking-container">
       <div className="booking-card">
      <span className="section-kicker">Reserve</span>
      <h2>Booking Vehicle {vehicleId}</h2>
      <p>Choose your rental window. You can review confirmed rides from My Bookings.</p>

      <div className="booking-summary">
        <span>Vehicle ID</span>
        <strong>{vehicleId}</strong>
        <span>Pickup</span>
        <strong>QuickRide station</strong>
      </div>

      <div>
        <label htmlFor="start-time">Start Time</label>

        <input
        id="start-time"
        type = "datetime-local"
        value={startTime}
        onChange={(e) => setStartTime(e.target.value)}
        />    
      </div>

      <div>
        <label htmlFor="end-time">End Time</label>
        <input
        id="end-time"
        type = "datetime-local"
        value = {endTime}
        onChange = {(e) => setEndTime(e.target.value)}
        />
</div>
        <button
        onClick={handleBooking}
        disabled={submitting}
        >
        {submitting ? "Confirming..." : "Confirm Booking"}
        </button>
        {error && <p className="error-message">{error}</p>}
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
