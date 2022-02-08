// import { Link } from 'react-router-dom';
import { useQuery, useMutation} from '@apollo/client';
// import { QUERY_MATCHUPS } from '../utils/queries';
import { CREATE_LIST } from '../utils/mutations';
import React, { useState } from 'react';
const jsonData = require('../pullInfo.json');
let apiKey = '8ffb7060';
const Home = () => {
  const [title, setTitle] = useState('');
  const [year, setYear] = useState('');
  const [results, setResults] = useState([]);

  const [createList, { error }] = useMutation(CREATE_LIST);

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

  const addMovie = async (event) => {
    console.log('i clicked' + event)
    console.log(event)
    try {
      await createList({
        variables: {  },
      });
    } catch (err) {
      console.error(err);
    }
  }

  function apiCall(event)
  {
    event.preventDefault();
    fetch(`http://www.omdbapi.com/?apikey=${apiKey}&type=movie&s=${title}&r=json&y=${year}`)
    .then(response => response.json())
    .then(data => {
        setResults(data.Search);
        setTitle('');
        setYear('');
    });
  }

//Made to get movie list ids easier
  // function apiRequest(event) {
  //   let completeJson = [];
  //   console.log(jsonData);
  //   event.preventDefault();
  //   jsonData.forEach((item) => {
  //     let title = item.title;
  //     fetch(`http://www.omdbapi.com/?apikey=${apiKey}&type=movie&s=${title}&r=json&y=${year}`)
  //       .then(response => response.json())
  //       .then(data => completeJson.push(data));
  //   });
  //   console.log(completeJson)
  // };

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
            className="form-control justify-content-center align-items-center col-sm-8" />
        </div>
        <div 
          id="searchResults">
            {results.map(movie => 
            <div className='imgContainer card m-5'
            id={movie.imdbID}
            name={movie.Title} 
            key={movie.imdbID} 
            onClick={addMovie}> 
            <img src={movie.Poster}
            id={movie.imdbID}
            name={movie.Title} 
            alt="Poster" 
            width="500" 
            height="600"/> <h3 className='centered'> 
            {movie.Title} {movie.Year}</h3> </div>) }
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
