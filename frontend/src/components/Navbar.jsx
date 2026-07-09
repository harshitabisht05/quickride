import { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";

function Navbar() {
  const [token, setToken] = useState(localStorage.getItem("token"));

  useEffect(() => {
    const checkToken = () => {
      setToken(localStorage.getItem("token"));
    };

    window.addEventListener("storage", checkToken);
    window.addEventListener("authChange", checkToken);

    return () => {
      window.removeEventListener("storage", checkToken);
      window.removeEventListener("authChange", checkToken);
    };
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    window.dispatchEvent(new Event("authChange"));
  };

  return (
    <header className="navbar-container">
      <nav className="navbar">
        <NavLink to="/" className="nav-brand">
          QuickRide
        </NavLink>

        <div className="nav-links">
          <NavLink
            to="/"
            className={({ isActive }) =>
              isActive ? "nav-item active" : "nav-item"
            }
          >
            Home
          </NavLink>

          <NavLink
            to="/vehicles"
            className={({ isActive }) =>
              isActive ? "nav-item active" : "nav-item"
            }
          >
            Vehicles
          </NavLink>

          {token && (
            <NavLink
              to="/bookings"
              className={({ isActive }) =>
                isActive ? "nav-item active" : "nav-item"
              }
            >
              Bookings
            </NavLink>
          )}
        </div>

        <div className="nav-actions">
          {token ? (
            <button className="logout-btn" onClick={handleLogout}>
              Logout
            </button>
          ) : (
            <>
              <NavLink
                to="/login"
                className={({ isActive }) =>
                  isActive ? "nav-item active" : "nav-item"
                }
              >
                Login
              </NavLink>

              <NavLink
                to="/register"
                className={({ isActive }) =>
                  isActive ? "nav-cta active" : "nav-cta"
                }
              >
                Sign up
              </NavLink>
            </>
          )}
        </div>
      </nav>
    </header>
  );
}

export default Navbar;
