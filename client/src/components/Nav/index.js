import React from "react";
import Auth from "../../utils/auth";
import { Link } from "react-router-dom";

const styles = {
  orangeColor: {
    color: '#F2A154'
  },
  blueColor: {
    color: '#314E52',

  },
  orangeColorBg: {
    backgroundColor: '#F2A154'
  },
  blueColorBg: {
    backgroundColor: '#314E52'
  },
  width: {
    minWidth: '200px'
  },
  header:{
    backgroundColor: '#F2A154'
  }


}

function Nav() {

  function showNavigation() {
    if (Auth.loggedIn()) {
      return (
        <ul className=" d-flex flex-row justify-content-around fs-3 fw-bold" style={styles.width}>
          <li className="mx-1">
            {/* <Link to="/orderHistory">
              Order History
            </Link> */}
          </li>
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
        <ul className="d-flex flex-row justify-content-around fs-3 fw-bold" style={styles.width}>
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
    <header className=" d-flex flex-row px-1 " style={styles.header}>
      <h1 style={styles.blueColor}>
        <Link to="/">
          <span role="img" aria-label="shopping bag"></span>
          Creative App Name
        </Link>
      </h1>

      <nav className="d-flex flex-row justify-content-end ms-auto align-items-center" style={styles.minWidth}>
        {showNavigation()}
    </nav>
    </header>
  );
}

export default Nav;
