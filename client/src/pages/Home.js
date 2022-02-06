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
           movieResults += `<div> <img src="${element.Poster}" alt="Poster" width="500" height="600"> <div> ${element.Title} </div> <div> ${element.Type} </div> <div> ${element.Year} </div> </div>` 
        });
        document.getElementById('searchResults').innerHTML = movieResults;
    });
  }

  return (
    <form className='container d-flex flex-column justify-content-center align-items-center ml-auto'>
        <h1>Search By Title & Year</h1>
        <div className='row form-group'>
            <label 
              className="control-label" >
                Title:
            </label>
            <input 
              value={title}
              onChange={handleInputChange}
              type="text"
              id="title" 
              name="title"
              placeholder="Title" 
              className="form-control justify-content-center align-items-center"/>
            <label 
              class="control-label" >
                Year:
            </label>
            <input 
              value={year}
              onChange={handleInputChange}
              type="text"
              id="year" 
              name="year"
              placeholder="Year" 
              className="form-control justify-content-center align-items-center"/>
            <button 
              id="search-by-title-button" 
              type="submit" 
              className="btn justify-content-center align-items-center"
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
