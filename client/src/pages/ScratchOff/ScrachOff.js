import React, { useEffect } from 'react';
import './style.css';

export default function ScratchOff() {
  
  const styles = {
    scratch: {
      position:'relative',
      width:'100%',
      height: '100vh',
      margin:'0',
      padding:'0'
    }
  }

  return (
    <div>
      <header>
        <h1>
          listMessage
        </h1>
        <h2>
          You've completed listMessage
        </h2>
        <div style={styles.scratch}>
        <script src="https://code.jquery.com/jquery-2.2.4.js" integrity="sha256-iT6Q9iMJYuQiMWNd9lDyBUStIq/8PuOW33aOqmvFpqI="crossorigin="anonymous"></script>
          <script src="wScratchPad.min.js"></script>
          <script type="text/javascript">
          $('#scratch').wScratchPad({
          size: 75,          // The size of the brush/scratch.
          bg: '../../public/images/badges/Top-100-SciFi.png',  // Background (image path or hex color).
          fg: '#6699ff',  // Foreground (image path or hex color).
        });
          </script>
        </div>
      </header>
        <h1>Return to Dashboard</h1>
    </div>
  );
}

export default ScratchOff;
