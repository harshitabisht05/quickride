import { useCallback, useEffect, useState } from "react";
import api from "../services/api";

function Bookings() {
  const [bookings, setBookings] = useState([]);
  const [status, setStatus] = useState("loading");
  const [activeCancelId, setActiveCancelId] = useState(null);

  const fetchBookings = useCallback(async () => {
    try {
      setStatus("loading");
      const response = await api.get("/bookings/");
      setBookings(response.data);
      setStatus("ready");
    } catch (error) {
      console.error(error);
      setStatus("error");
    }
  }, []);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    fetchBookings();
  }, [fetchBookings]);

  const cancelBooking = async (bookingId) => {
    try {
      setActiveCancelId(bookingId);
      const token = localStorage.getItem("token");

      await api.delete(`/bookings/${bookingId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      fetchBookings();
    } catch (error) {
      console.error(error);
    } finally {
      setActiveCancelId(null);
    }
  };

  return (
    <div className="bookings-page">
      <div className="vehicles-header">
        <span className="section-kicker">Trips</span>
        <h2>My Bookings</h2>
        <p>Review upcoming reservations and cancel when plans change.</p>
      </div>

      <div className="booking-list">
        {status === "loading" && [1, 2, 3].map((item) => (
          <div className="booking-item booking-skeleton" key={item}>
            <span />
            <span />
            <span />
          </div>
        ))}

        {status === "ready" && bookings.map((booking) => (
          <div className="booking-item" key={booking.id}>
            <p>Booking ID: {booking.id}</p>
            <h3>{booking.vehicle_name}</h3>
            <p>Start: {new Date(booking.start_time).toLocaleString()}</p>
            <p>End: {new Date(booking.end_time).toLocaleString()}</p>
            <button
              onClick={() => cancelBooking(booking.id)}
              className="cancel-btn"
              disabled={activeCancelId === booking.id}
            >
              {activeCancelId === booking.id ? "Cancelling..." : "Cancel Booking"}
            </button>
          </div>
        ))}

        {status === "ready" && bookings.length === 0 && (
          <div className="empty-state">
            <h3>No bookings yet</h3>
            <p>Your confirmed rides will show up here.</p>
          </div>
        )}

        {status === "error" && (
          <div className="empty-state error-state">
            <h3>Could not load bookings</h3>
            <p>Sign in again or check that the backend API is available.</p>
          </div>
        )}
      </div>
    </div>
  );
}

export default Bookings;
