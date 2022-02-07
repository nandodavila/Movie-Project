// import { Link } from 'react-router-dom';
// import { useQuery } from '@apollo/client';
// import { QUERY_MATCHUPS } from '../utils/queries';
import React, { useState } from 'react';
let apiKey = '8ffb7060';
const Home = () => {
  const [title, setTitle] = useState('');
  const [year, setYear] = useState('');

  const handleInputChange = (e) => {
    // Getting the value and name of the input which triggered the change
    const { target } = e;
    const inputType = target.name;
    const inputValue = target.value;

    if (inputType === 'title') {
      setTitle(inputValue);
    } else {
      setYear(inputValue);
    };
  }

  function apiCall(event)
  {
    event.preventDefault();
    fetch(`http://www.omdbapi.com/?apikey=${apiKey}&type=movie&s=${title}&r=json&y=${year}`)
    .then(response => response.json())
    .then(data => {
        document.getElementById('searchResults').innerHTML = '';
        let movieResults = '';
        data.Search.forEach(element => {
           movieResults += `<div class='imgContainer'> <img src="${element.Poster}" alt="Poster" width="500" height="600"> <h3 class='centered'> ${element.Title} ${element.Year}</h3> </div>` 
        });
        document.getElementById('searchResults').innerHTML = movieResults;
    });
  }

  const styles = {
    orangeColor: {
      color: '#F2A154'
    },
    blueColor: {
      color: '#314E52'
    },
    orangeColorBg: {
      backgroundColor: '#F2A154'
    },
    blueColorBg: {
      backgroundColor: '#314E52'
    }
  }

  return (
    <form className='container d-flex flex-column justify-content-center align-items-center'>
        <h1 style={styles.orangeColor}>Search By Title & Year</h1>
        <div className=''>
          <div className="form-group d-flex flex-row mt-1 mb-1">
            <label
              style={styles.orangeColor}
              htmlFor="title" 
              className="control-label col-sm-2 col-form-label" >
                Title:
            </label>
            <input 
              value={title}
              onChange={handleInputChange}
              type="text"
              id="title" 
              name="title"
              placeholder="Title" 
              className="form-control justify-content-center align-items-center col-sm-8"/>
          </div>
          <div className="form-group d-flex flex-row mt-1">
            <label 
              style={styles.orangeColor}
              className="control-label col-sm-2 col-form-label" >
                Year:
            </label>
            <input 
              value={year}
              onChange={handleInputChange}
              type="text"
              id="year" 
              name="year"
              placeholder="Year" 
              className="form-control justify-content-center align-items-center col-sm-8"/>
          </div>
            <button
              style={styles.orangeColorBg} 
              id="search-by-title-button" 
              type="submit" 
              className="btn justify-content-center align-items-center col-lg-12 ml-auto"
              onClick={apiCall}>
                
                Search
            </button>
        </div>
        <div 
          id="searchResults">
            
        </div>
    </form>
  );
  };
export default Home;
