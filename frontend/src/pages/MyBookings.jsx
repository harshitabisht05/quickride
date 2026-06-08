import { useEffect, useState } from "react";
import api from "../services/api";

function Bookings() {
  const [bookings, setBookings] = useState([]);

  useEffect(() => {
    fetchBookings();
  }, []);

  const fetchBookings = async () => {
    try {
      const response = await api.get("/bookings/");
      setBookings(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="booking-card">
      <h2>My Bookings</h2>

      {bookings.map((booking) => (
        <div key={booking.id}>
          <p>Booking ID: {booking.id}</p>
          <p>Vehicle ID: {booking.vehicle_id}</p>
          <p>Start: {booking.start_time}</p>
          <p>End: {booking.end_time}</p>
        </div>
      ))}
    </div>
  );
}

export default Bookings;