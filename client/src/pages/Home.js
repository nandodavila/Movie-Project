// import { Link } from 'react-router-dom';
// import { useQuery } from '@apollo/client';
// import { QUERY_MATCHUPS } from '../utils/queries';
import React, { useState } from 'react';
let apiKey = '8ffb7060';
const Home = () => {
  const [title, setTitle] = useState('');
  const [year, setYear] = useState('');
  const [results, setResults] = useState('');

  const handleInputChange = (e) => {
    // Getting the value and name of the input which triggered the change
    const { target } = e;
    const inputType = target.name;
    const inputValue = target.value;

    // Based on the input type, we set the state of either email, username, and password
    if (inputType === 'title') {
      setTitle(inputValue);
    } else {
      setYear(inputValue);
    };
  }

  function apiCall()
  {
    fetch(`http://www.omdbapi.com/?apikey=${apiKey}&type=movie&s=${title}&r=json&y=${year}`)
    .then(response => response.json())
    .then(data => {
        console.log(data)
        setResults('');
        data.Search.forEach(element => {
           setResults(`<div> <img src="${element.Poster}" alt="Poster" width="500" height="600"> <div> ${element.Title} </div> <div> ${element.Type} </div> <div> ${element.Year} </div> </div>`) 
        });
    });
  }

  return (
    <div>
        <fieldset>
            <legend>By Title</legend>
        </fieldset>
        <div>
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
              className="input-small"/>
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
              className="input-small"/>
            <button 
              id="search-by-title-button" 
              type="button" 
              className="btn-sm btn-primary"
              onClick={apiCall}>
                
                Search
            </button>
        </div>
        <div 
          id="searchResults">
            {results}
        </div>
    </div>
  );
  };
export default Home;
