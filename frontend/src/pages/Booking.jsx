import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import api from "../services/api"

function Booking() {
  const { vehicleId } = useParams();

  const [startTime, setStartTime] = useState("");
  const [endTime, setEndTime] = useState("");


  const handleBooking = async () =>{
    try {
        const response = await api.post("/bookings",{
            vehicle_id : Number(vehicleId),
            start_time : startTime,
            end_time : endTime,
        });

         navigate("/bookings");
    alert("Booking Confirm");
  }
  catch (error){
    console.error(error)
  }
};
  return (
    <div>
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

        <button
        onClick={handleBooking}
        >
        Confirm Booking
        </button>

    </div>
      </div>
  );
}

export default Booking;