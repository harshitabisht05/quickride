import { NavLink } from "react-router-dom";

function Navbar() {
  const token = localStorage.getItem("token");

  const handleLogout = () => {
    localStorage.removeItem("token");
    window.location.href = "/";
  };

  return (
    <div className="navbar-wrapper">
      <nav className="navbar-modern">
        <div className="logo">
          ⚡ QuickRide
        </div>

        <div className="nav-center">
          <NavLink to="/" className={({ isActive }) => isActive ? "nav-link active-link" : "nav-link"}>Home</NavLink>
          <NavLink to="/vehicles" className={({ isActive }) => isActive ? "nav-link active-link" : "nav-link"}>Vehicles</NavLink>

          {token && (
            <NavLink to="/bookings" className={({ isActive }) => isActive ? "nav-link active-link" : "nav-link"}>My Bookings</NavLink>
          )}
        </div>

        <div className="nav-right">
          {token ? (
            <button
              className="nav-btn"
              onClick={handleLogout}
            >
              Logout
            </button>
          ) : (
            <>
              <NavLink to="/login">Login</NavLink>

              <button className="nav-btn">
                <NavLink to="/register" className={({ isActive }) => isActive ? "nav-link active-link" : "nav-link"}>Register</NavLink>
              </button>
            </>
          )}
        </div>
      </nav>
    </div>
  );
}

export default Navbar;