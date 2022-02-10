import React from "react";
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
  },
  footer:{
    backgroundColor: '#F2A154',
    position: 'absolute',
    bottom: 0,
    fontSize: '20px',
    width: "100%",
    textAlign:"center",
    fontColor: "#314E52"
  }
  ,
  h4:{
    marginLeft: "auto",
    marginRight: "auto",
    marginTop: "Auto",
    marginBottom: "Auto",
    fontColor: "#314E52",
    height: "5%"
  }


}

function Footer() {
  return (
    <footer className=" d-flex flex-row px-1 " style={styles.footer}>
      <h5 style={styles.h4}>
          Developed by:  Cornelia Herman, Fernando Davila, Travis Crocker, and Justin Houk 
      </h5>

      <nav className="d-flex flex-row justify-content-end ms-auto align-items-center" style={styles.minWidth}>
    </nav>
    </footer>
  );
}

export default Footer;
