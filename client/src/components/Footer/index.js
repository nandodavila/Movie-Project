import React from "react";
import { Link } from "react-router-dom";
// const github = require(process.env.PUBLIC_URL+"/images/footer/github_icon.png");
console.log(process.env)
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
    backgroundColor: '#F7F6E7',
    position: 'fixed',
    bottom: 0,
    fontSize: '20px',
    width: "100%",
    textAlign:"center",
    fontColor: "#314E52",
    color: '#314E52'
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
    <footer className="footer d-flex flex-row px-1 " style={styles.footer}>
      <h5 style={styles.h4}>
          <a href="https://github.com/cormillionaire">
            <img
              className="icon default git_link"
              src={process.env.PUBLIC_URL+"/images/footer/github_icon.png"}
              target="_blank"
              rel="noreferrer noopener"
              alt="Collaborate on GitHub"
            />
            <img
              alt="Git Hub Icon Hover"
              className="icon git_link hover"
              src={process.env.PUBLIC_URL+"/images/footer/github_hover.png"}
            />
          </a>Cornelia Herman | 
          <a href="https://github.com/nandodavila">
          <img
              className="icon default git_link"
              src={process.env.PUBLIC_URL+"/images/footer/github_icon.png"}
              target="_blank"
              rel="noreferrer noopener"
              alt="Collaborate on GitHub"
            />
            <img
              alt="Git Hub Icon Hover"
              className="icon git_link hover"
              src={process.env.PUBLIC_URL+"/images/footer/github_hover.png"}
            />
          </a>Fernando Davila | 
          <a href="https://github.com/Tmcrocker89">
          <img
              className="icon default git_link"
              src={process.env.PUBLIC_URL+"/images/footer/github_icon.png"}
              target="_blank"
              rel="noreferrer noopener"
              alt="Collaborate on GitHub"
            />
            <img
              alt="Git Hub Icon Hover"
              className="icon git_link hover"
              src={process.env.PUBLIC_URL+"/images/footer/github_hover.png"}
            />
          </a>Travis Crocker | 
          <a href="https://github.com/jstndhouk">
          <img
              className="icon default git_link"
              src={process.env.PUBLIC_URL+"/images/footer/github_icon.png"}
              target="_blank"
              rel="noreferrer noopener"
              alt="Collaborate on GitHub"
            />
            <img
              alt="Git Hub Icon Hover"
              className="icon git_link hover"
              src={process.env.PUBLIC_URL+"/images/footer/github_hover.png"}
            />
          </a>Justin Houk 
      </h5>
    </footer>
  );
}

export default Footer;
