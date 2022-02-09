import React from "react";
import Auth from "../../utils/auth";
import { Link } from "react-router-dom";

function Nav() {

  function showNavigation() {
    if (Auth.loggedIn()) {
      return (
        <ul className="d-flex flex-row">
          <li className="mx-1">
            {/* this is not using the Link component to logout or user and then refresh the application to the start */}
            <a href="/" onClick={() => Auth.logout()}>
              Logout
            </a>
          </li>
        </ul>
      );
    } else {
      return (
        <ul className="flex-row">
          <li className="mx-1">
            <Link to="/signup">
              Signup
            </Link>
          </li>
          <li className="mx-1">
            <Link to="/login">
              Login
            </Link>
          </li>
        </ul>
      );
    }
  }

  return (
    <header className='d-flex flex-row'> 
    <Link to="/">
          <span role="img" aria-label="shopping bag"></span>
          🎥 Flicks On The Record
    </Link>
    <nav className='d-flex flex-row navbar-nav justify-content-end ms-auto px-5'>
        {showNavigation()}
    </nav>
    </header>
  );
}

export default Nav;
