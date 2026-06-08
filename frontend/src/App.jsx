import { Routes, Route } from "react-router-dom";

import Home from "./pages/Home";
import Navbar from "./components/Navbar";
import Vehicles from "./pages/Vehicles";
import Booking from "./pages/Booking";
import MyBookings from "./pages/MyBookings";
// import Login from "./pages/Login";
// import Register from "./pages/Register";

function App() {
  return (
    <>
    <Navbar />
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/vehicles" element={<Vehicles />} />
      <Route path="/booking/:vehicleId" element={<Booking />} />
      <Route path="/bookings" element={<MyBookings />} />
      {/* <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} /> */}
    </Routes>
    </>
  );
}

export default App;