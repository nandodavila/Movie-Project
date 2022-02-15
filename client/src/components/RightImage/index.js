import React from "react";
import { Link } from "react-router-dom";
console.log(process.env)
const styles = {
    sideImage: {
        minHeight: '70vh',
        maxWidth: '200px'
      }
}

function RightImage() {
  return (
    <div id="rightImage">
        <aside>
            <img
            style={styles.sideImage}
            className="icon default git_link"
            src={process.env.PUBLIC_URL+"/images/sideImages/Right-Reel.jpg"}
            rel="noreferrer noopener"
            alt="Reel"
            />
        </aside>
    </div>
  )
}

export default RightImage;
