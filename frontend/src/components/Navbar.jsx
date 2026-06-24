import { useState } from "react";
import { NavLink } from "react-router-dom";

function Navbar() {
  const token = localStorage.getItem("token");
  const [showMenu, setShowMenu] = useState(false);

  const handleLogout = () => {
    localStorage.removeItem("token");
    setShowMenu(false);
    window.location.href = "/";
  };

  const closeMenu = () => setShowMenu(false);

  return (
    <div className="navbar-wrapper">
      <nav className="navbar-modern">
        <div className="logo">
          <span className="logo-mark">Q</span>
          QuickRide
        </div>

        <button
          type="button"
          className="nav-toggle"
          onClick={() => setShowMenu((prev) => !prev)}
          aria-label="Toggle navigation menu"
          aria-expanded={showMenu}
        >
          <span />
          <span />
          <span />
        </button>

        <div className={`nav-menu ${showMenu ? "show-menu" : ""}`}>
          <div className="nav-center">
            <NavLink to="/" className={({ isActive }) => isActive ? "nav-link active-link" : "nav-link"} onClick={closeMenu}>
              Home
            </NavLink>
            <NavLink to="/vehicles" className={({ isActive }) => isActive ? "nav-link active-link" : "nav-link"} onClick={closeMenu}>
              Vehicles
            </NavLink>
            {token && (
              <NavLink to="/bookings" className={({ isActive }) => isActive ? "nav-link active-link" : "nav-link"} onClick={closeMenu}>
                My Bookings
              </NavLink>
            )}
          </div>

          <div className="nav-right">
            {token ? (
              <button className="nav-btn" onClick={handleLogout}>
                Logout
              </button>
            ) : (
              <>
                <NavLink to="/login" className="nav-link" onClick={closeMenu}>
                  Login
                </NavLink>
                <NavLink to="/register" className="nav-btn nav-link" onClick={closeMenu}>
                  Register
                </NavLink>
              </>
            )}
          </div>
        </div>
      </nav>
    </div>
  );
}

export default Navbar;
