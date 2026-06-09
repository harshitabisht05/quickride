import "./App.css";
import { Routes, Route } from "react-router-dom";

import Home from "./pages/Home";
import Navbar from "./components/Navbar";
import Vehicles from "./pages/Vehicles";
import Booking from "./pages/Booking";
import MyBookings from "./pages/MyBookings";
import Login from "./pages/Login";
import Register from "./pages/Register";
import ProtectedRoute from "./components/ProtectedRoute";

function App() {
  return (
    <>
    <Navbar />
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/vehicles" element={<Vehicles />} />
      <Route path="/booking/:vehicleId" element={<Booking />} />
      <Route path="/bookings" element={<MyBookings />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/bookings" element={<ProtectedRoute> <MyBookings /></ProtectedRoute>}/>
      <Route path="/booking/:vehicleId" element={ <ProtectedRoute><Booking /></ProtectedRoute>}/>
    </Routes>
    </>
  );
}

export default App;