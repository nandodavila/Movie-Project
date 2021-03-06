import React, { useEffect } from 'react';
import { GET_LIST } from '../utils/queries';
import { useQuery } from '@apollo/client';
import { Link, useParams } from 'react-router-dom';

export default function ScratchOff() {
  const {listId} = useParams();
  // const listId='620b00000c02da49fc705620'
  const {loading, error, data, refetch } = useQuery(GET_LIST, {variables: {listId}});
  const list = data?.list || {};
  const styles = {
    scratch: {
      position:'relative',
      width:'100%',
      height: '100vh',
      margin:'0',
      padding:'0'
    },
    badgeImage: {
      maxHeight: '300px',
      maxWidth: '400px',
      alignSelf: 'center'
    },
    link: {
      textAlign:'center',
      textDecoration: 'none',
      color: '#F2A154',
      fontSize: '20px'
    }
  };

  return (
    <div className='d-flex flex-column justify-content-center'>
        <main className='d-flex flex-column justify-content-center'>
        <h1 className='text-center'>
          {list.message}
        </h1>
        <h2 className='text-center'>
        Congratulations!  You've watched all the movies in the "{list.name} list.
        </h2>
        <img src={list.badge} style={styles.badgeImage} alt="BadgeIcon"/>
        </main>
        <br></br>
        <Link style={styles.link}to="/dashboard">Return to Dashboard</Link>
    </div>
  );
}
