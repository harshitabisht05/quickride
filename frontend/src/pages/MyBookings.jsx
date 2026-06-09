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

const cancelBooking = async (bookingId) => {
  try {
    const token = localStorage.getItem("token");

    await api.delete(`/bookings/${bookingId}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    fetchBookings();
  } catch (error) {
    console.error(error);
  }
};

  return (
    <div>
      <h2>My Bookings</h2>
<div className="booking-list">

      {bookings.map((booking) => (
        <div className="booking-item" key={booking.id}>
          <p>Booking ID: {booking.id}</p>
          <p>Vehicle: {booking.vehicle_name}</p>
          <p>
            Start: {new Date(booking.start_time).toLocaleString()}
          </p>
          <p>
            End: {new Date(booking.end_time).toLocaleString()}
          </p>
          <button
  onClick={() => cancelBooking(booking.id)}
  className="cancel-btn"
>
  Cancel Booking
</button>
        </div>
      ))}
    </div>
    </div>
  );
}

export default Bookings;