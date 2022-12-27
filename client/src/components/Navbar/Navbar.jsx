import React, { Fragment, useState } from "react";
import { Link } from "react-router-dom";
import jwt_decode from "jwt-decode";

function Navbar() {
  const token = localStorage.getItem("token");
  const decoded = jwt_decode(token);
  const [showToggleMenu, setShowToggleMenu] = useState(false);
  function logout() {
    localStorage.removeItem("token");
    window.location.pathname = "/login";
  }
  return (
    <>
      <ul className="web-size navbar">
        <li>
          <Link to="/">
            <h5>Khedmah</h5>
          </Link>
        </li>
        <li>
          <Link to="/phones">Phones, Tablets, & Accessories</Link>
        </li>
        <li>
          <Link to="/cars">Cars</Link>
        </li>
        <li>
          <Link to="/apartments">Apartments</Link>
        </li>
        <li>
          <Link to="/electronics">Electronics</Link>
        </li>
        <li className="nav-item dropdown">
          <a
            className="nav-link dropdown-toggle"
            href="#"
            id="navbarDropdown"
            role="button"
            data-bs-toggle="dropdown"
            aria-expanded="false"
          >
            {decoded.name}
          </a>
          <ul className="dropdown-menu" aria-labelledby="navbarDropdown">
            {decoded.adminRole ? (
              <li>
                <Link className="dropdown-item" to="/ZGFzaGJvYXJk">
                  Dashboard
                </Link>
              </li>
            ) : (
              <Fragment>
                <li>
                  <Link className="dropdown-item" to="/myAds">
                    My ads
                  </Link>
                </li>
                <li>
                  <Link className="dropdown-item" to="/favorites">
                    Favorites
                  </Link>
                </li>
              </Fragment>
            )}
            <li>
              <hr className="dropdown-divider" />
            </li>
            <li className="dropdown-item" onClick={logout}>
              Logout
            </li>
          </ul>
        </li>
      </ul>
      <ul className="mobile-size">
        <li>
          <Link to="/">
            <h5>Khedmah</h5>
          </Link>
        </li>

        <li className="toggle-icon" onClick={() => setShowToggleMenu(true)}>
          <i className="fas fa-outdent"></i>
        </li>
      </ul>
      <ul
        className="toggle-menu"
        style={{ right: `${showToggleMenu ? "0px" : "-300px"}` }}
      >
        <li onClick={() => setShowToggleMenu(false)}>
          <i className="fas fa-times"></i>
        </li>

        <li className="text-success fs-4">{decoded.name}</li>
        {decoded.adminRole ? (
          <li>
            <Link to="/ZGFzaGJvYXJk">Dashboard</Link>
          </li>
        ) : (
          <Fragment>
            <li>
              <Link to="/myAds">My ads</Link>
            </li>
            <li>
              <Link to="/favorites">Favorites</Link>
            </li>
          </Fragment>
        )}

        <li>
          <Link to="/phones">Phones, Tablets, & Accessories</Link>
        </li>
        <li>
          <Link to="cars">Cars</Link>
        </li>
        <li>
          <Link to="/apartments">Apartments</Link>
        </li>
        <li>
          <Link to="/electronics">Electronics</Link>
        </li>
        <li role="button" className="text-danger" onClick={logout}>
          Logout
        </li>
      </ul>
    </>
  );
}

export default Navbar;
