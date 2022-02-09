// import { Link } from 'react-router-dom';
import { useQuery, useMutation} from '@apollo/client';
import { GET_LISTS } from '../utils/queries'
import React, { useState } from 'react';
let apiKey = '8ffb7060';
const ListPage = () => {
  const [title, setTitle] = useState('');
  const [year, setYear] = useState('');
  const [results, setResults] = useState([]);
  const [lists, setLists] = useState([]);

  const { loading, data } = useQuery(GET_LISTS);
  const allMovieLists = data?.lists || [];

  console.log(allMovieLists)
  console.log(results)

  const filterList = () => {
      allMovieLists.forEach(list => {
        // All movies but still seperate arrays depending on list
        let allMovies = list.movies
        console.log('FACE OFF = tt0119094')
        allMovies.forEach(movie => {
            let eachMovieId = movie.omdbId
            console.log(results.imbdID)
            if (eachMovieId = results.imbdID) {
                console.log('Found!' + results)
            }
            else {
                console.log('Not Found, you suck')
            }
        })

          
      });
  }

  filterList()




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
        setResults(data.Search);
        setTitle('');
        setYear('');
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
        <div className='container col-8 d-flex flex-column justify-content-center'>
          <div className="form-group d-flex  mt-1 mb-1">
            {/* <label
              style={styles.orangeColor}
              htmlFor="title" 
              className="control-label col-sm-1 col-form-label" >
                Title:
            </label> */}
            <input 
              value={title}
              onChange={handleInputChange}
              type="text"
              id="title" 
              name="title"
              placeholder="Title" 
              className="form-control justify-content-center align-items-center col-sm-8"/>
          </div>
          <div className="form-group d-flex mt-1">
            {/* <label 
              style={styles.orangeColor}
              className="control-label col-sm-1 col-form-label" >
                Year:
            </label> */}
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
              className="btn d-flex justify-content-center align-items-center col-lg-8 m-auto mt-1"
              onClick={apiCall}>
                
                Search
            </button>
        </div>
        <div className="list-group">
            {lists.map( list => 
              <li
              key={list.imbdID}> {list.Title} </li>
            )}
        </div>
        <div 
          id="searchResults">
            {results.map(movie => 
            <div className='imgContainer card m-5'
            id={movie.imdbID}
            name={movie.Title} 
            key={movie.imdbID}> 
            <img src={movie.Poster}
            id={movie.imdbID}
            name={movie.Title} 
            alt="Poster" 
            width="500" 
            height="600"/> <h3 className='centered'> 
            {movie.Title} {movie.Year}</h3> </div>) }
        </div>
    </form>
  );
  };
export default ListPage;