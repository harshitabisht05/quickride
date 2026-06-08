import { Link } from "react-router-dom";

function Navbar() {
  return (
    <nav className="navbar">
      <h1>QuickRide</h1>

      <div className="nav-links">
        <Link to="/">Home</Link>
        <Link to="/vehicles">Vehicles</Link>
        <Link to="/login">Login</Link>
        <Link to="/regiter">Register</Link>
        <Link to ="/bookings">My Bookings</Link>
      </div>
    </nav>
  );
}

export default Navbar;