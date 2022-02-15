import React, { useEffect } from 'react';
import './style.css';
import { GET_LIST } from '../../utils/queries';
import { useQuery } from '@apollo/client';
import $ from 'jquery';
export default function ScratchOff() {
  const listId='620b00000c02da49fc705620'
  const {loading, error, data, refetch } = useQuery(GET_LIST, {variables: {listId}});
    const list = data?.list || {};
    console.log(data)
  const styles = {
    scratch: {
      position:'relative',
      width:'100%',
      height: '100vh',
      margin:'0',
      padding:'0'
    }
  };

  const imagePath="process.env.PUBLIC_URL' + '/images/badges/Top-100-SciFi.png";
  const scratchObj= {
    size: 75,          // The size of the brush/scratch.
      bg: {imagePath},  // Background (image path or hex color).
    fg: '#6699ff'  // Foreground (image path or hex color).
  }

  return (
    <div>
        <main className='column'>
        <h1>
          {list.message}
        </h1>
        <h2>
          You've completed {list.name} 
        </h2>
        </main>
        <div id='scratch' className='column' style={styles.scratch}>
        <script src="https://code.jquery.com/jquery-2.2.4.js" integrity="sha256-iT6Q9iMJYuQiMWNd9lDyBUStIq/8PuOW33aOqmvFpqI="crossOrigin="anonymous"></script>
          <script src="wScratchPad.min.js"></script>
          <script type="text/javascript">
          $('#scratch').wScratchPad({scratchObj}
          </script>
        </div>
        <h1>Return to Dashboard</h1>
    </div>
  );
}
