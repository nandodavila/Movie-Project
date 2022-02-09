// import { Link } from 'react-router-dom';
import { useQuery, useMutation} from '@apollo/client';
// import { QUERY_MATCHUPS } from '../utils/queries';
import { CREATE_LIST } from '../utils/mutations';
import React, { useEffect, useState } from 'react';
let apiKey = '8ffb7060';
let listOfMovie = [];
let loggedIn = true;
const Home = () => {
  const [title, setTitle] = useState('');
  const [year, setYear] = useState('');
  const [results, setResults] = useState([]);
  const [listName, setListName] = useState([]);
  const [listMsg, setListMsg] = useState([]);
  const [lists, setLists] = useState([]);

  const [createList, { error }] = useMutation(CREATE_LIST);

  const handleInputChange = (e) => {
    // Getting the value and name of the input which triggered the change
    const { target } = e;
    const inputType = target.name;
    const inputValue = target.value;

    if (inputType === 'title') {
      setTitle(inputValue);
    } else if (inputType === 'listName'){
      setListName(inputValue)
    } else if (inputType === 'listMsg'){
      setListMsg(inputValue)
    }else {
      setYear(inputValue);
    };
  }

  const addMovie = async (event) => {
    console.log('i clicked' + event)
    let id = event.target.id;
    fetch(`http://www.omdbapi.com/?apikey=${apiKey}&i=${id}`)
    .then(response => response.json())
    .then(data => {
      console.log(data)
      let movieObject = {
        title: data.Title,
        year: data.Year,
        id: data.imdbID
      }
      listOfMovie.push(movieObject);
      setLists(listOfMovie)
    });

    
    // try {
    //   await createList({
    //     variables: {  },
    //   });
    // } catch (err) {
    //   console.error(err);
   // }
  }
  // useEffect(() => setLists(listOfMovie), [])

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
      color: '#314E52',

    },
    orangeColorBg: {
      backgroundColor: '#F2A154'
    },
    blueColorBg: {
      backgroundColor: '#314E52'
    },
    movieList: {
      color: '#314E52' ,
      backgroundColor: '#F2A154'

    }
  }
  const createMovieList = (event) =>
  {
    event.preventDefault();
    console.log('yep')
  }

  return (
    <form className='container d-flex flex-column justify-content-center align-items-center'>
      
        
      <div className='container col-12 d-flex flex-column justify-content-center'>
        {loggedIn ?
        <div className="d-flex flex-row position-relative">
          <h1 style={styles.orangeColor} className="position-relative">Create A List!</h1>
          <div className="col-6 d-flex flex-column border rounded justify-content-center align-items-center m-2" > 
            <div className="form-group d-flex flex-column mt-1 mb-1 col-sm-6">
              <input 
              value={listName}
              onChange={handleInputChange}
              type="text"
              id="listName" 
              name="listName"
              placeholder="List Name" 
              className="form-control justify-content-center align-items-center col-sm-12"/>
            </div>
            <div className="form-group d-flex flex-column mt-1 mb-1 col-sm-6">
              <input 
              value={listMsg}
              onChange={handleInputChange}
              type="text"
              id="listMsg" 
              name="listMsg"
              placeholder="List Message" 
              className="form-control justify-content-center align-items-center col-sm-12"/>
            </div>
          </div>
          <div className="d-flex flex-column list-group col-sm-6 border rounded m-2">
            <button
              style={styles.orangeColorBg} 
              id="createList" 
              type="button" 
              className="btn d-flex justify-content-center align-items-center col-lg-6 m-auto mt-1"
              onClick={createMovieList}>
                
                Create Movie List
            </button>
            <div className="">
              {lists.map( list => 
                <li
                className="list-group-item d-flex justify-content-center align-items-center fs-4"
                style={styles.movieList}
                key={list.id}> {list.title} </li>
              )}
            </div>
          </div>
        </div>
          :
          <div></div>
          }
        <div className="d-flex flex-column list-group col-sm-12 justify-content-center align-items-center">
          <div className="d-flex flex-column list-group col-sm-6">
            <h1 style={styles.orangeColor}>Search By Title & Year</h1>
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
          </div>
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
    </form>
  );
  };
export default Home;
