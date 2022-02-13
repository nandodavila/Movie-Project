import React from "react";
import { Link } from "react-router-dom";
console.log(process.env)
const styles = {
    sideImage: {
        minHeight: '100vh',
        maxWidth: '200px'
      }
}

function LeftImage() {
  return (
    <div>
        <aside>
            <img
            style={styles.sideImage}
            className="icon default git_link"
            src={process.env.PUBLIC_URL+"/images/sideImages/Left-Reel.jpg"}
            rel="noreferrer noopener"
            alt="Reel"
            />
        </aside>
    </div>
  )
}

export default LeftImage;
