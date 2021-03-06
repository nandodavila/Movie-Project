import { useQuery, useMutation} from '@apollo/client';
import Auth from "../utils/auth";
import { CREATE_LIST } from '../utils/mutations';
import { GET_ME } from '../utils/queries'
import React, { useState } from 'react';
let apiKey = process.env.REACT_APP_API_KEY;
const Home = () => {
  const [title, setTitle] = useState('');
  const [year, setYear] = useState('');
  const [results, setResults] = useState([]);
  const [listName, setListName] = useState([]);
  const [listMsg, setListMsg] = useState([]);
  const [movieLists, setMovieLists] = useState([]);
  const [errorMsg, setErrorMsg] = useState([]);

  const [createList, { error }] = useMutation(CREATE_LIST);
  

  const { loading, data: userInfo} = useQuery(GET_ME)

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

//remove a movie from the list created
const removeMovie = (e) => {
  e.preventDefault();
  let targetId = e.target.parentNode.id
  movieLists.forEach((movie, index) => {
    if( movie.omdbId === targetId)
    {
      movieLists.splice(index, 1)
    }
  });
  setMovieLists([...movieLists])
}
//call the api to get the info for the movie you clicked on to add it to the list
  const searchMovie = async (event) => {

    let id = event.target.id;
    if(id !== '')
    {
      try{
        fetch(`https://www.omdbapi.com/?apikey=${apiKey}&i=${id}`)
        .then(response => response.json())
        .then(data => {
          let movieObject = {
            title: data.Title,
            year: data.Year,
            omdbId: data.imdbID
          }
          if(data)
          {
            setMovieLists([...movieLists, movieObject])
          }
        });
      }catch(error)
      {
        alert(error)
      }
    }
  }
  //add list of movies to the database
  const saveMovieList = async (event) => {
    if(listName.length !== 0 && listMsg.length !== 0 && movieLists.length !== 0)
    {

      try {
        await createList({
          variables: {name: listName, message: listMsg, badge: "/images/badges/User-Added-List.png", movies:movieLists, createdBy: JSON.parse(`{"username":"${userInfo.me.username}"}`)},
        });
        window.location.reload()
      } catch (err) {
        console.error(err);
      }
    } else {
      event.preventDefault();
      if(!errorMsg.includes('Please make sure you have entered List Name, List Message, and have created a Movie List.'))
      {
        setErrorMsg([...errorMsg,{msg: 'Please make sure you have entered List Name, List Message, and have created a Movie List.'}]);
      }
      
    }
  }
  //call the api to return the movie you searched for
  function apiCall(event)
  {
    if(title)
      {
        event.preventDefault();
        fetch(`https://www.omdbapi.com/?apikey=${apiKey}&type=movie&s=${title}&r=json&y=${year}`)
        .then(response => response.json())
        .then(data => {
            setResults(data.Search);
            setTitle('');
            setYear('');
        });
        setErrorMsg([])
    } else {
      event.preventDefault();
      if(!errorMsg.includes('Please enter a movie title.'))
      {
        setErrorMsg([...errorMsg, {msg: 'Please enter a movie title.'}]);
      }
      
    }
  }
  //styles for jsx
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
      backgroundColor: 'white'
    },
    listHeight: {
      maxHeight: '200px',
      height: '200px'
    },
    posterHeight: {
      maxHeight: '650px',
      backgroundColor: '#314E52'
    },
    delBtn: {
      backgroundColor: '#314E52',
      color: '#F2A154'
    },
    hidden: {
      display: 'none'
    }
  }
  //html to return
  return (
    <form className='container d-flex flex-column mt-5 align-items-center col-sm-12'>
      
        
      <div className='container col-12 d-flex flex-column justify-content-center'>
        {Auth.loggedIn() ?
        <div className="d-flex flex-row position-relative justify-content-center">
          <div className="d-flex flex-column position-relative justify-content-center align-items-center col-6">
            <h1 style={styles.orangeColor} className="d-flex justify-content-center ">Create A List!</h1>
            <div className="col-10 d-flex flex-column border rounded justify-content-center align-items-center m-2" > 
              <div className="form-group d-flex flex-column mt-1 mb-1 col-sm-8">
                <input 
                value={listName}
                onChange={handleInputChange}
                type="text"
                id="listName" 
                name="listName"
                placeholder="List Name" 
                className="form-control justify-content-center align-items-center col-sm-12"/>
              </div>
              <div className="form-group d-flex flex-column mt-1 mb-1 col-sm-8">
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
          </div>
          <div className="d-flex flex-column list-group col-sm-6 border rounded m-2 overflow-auto">
            <button
              style={styles.orangeColorBg} 
              id="createList" 
              type="button" 
              className="btn d-flex justify-content-center align-items-center col-lg-6 m-auto mt-1"
              onClick={saveMovieList}>
                
                Create Movie List
            </button>
            <div className="overflow-auto" style={styles.listHeight}>
              {movieLists.map( list => 
                <li
                className="list-group-item d-flex justify-content-center align-items-center fs-5 rounded m-2"
                style={styles.movieList}
                key={list.omdbId}
                id={list.omdbId}> {list.title}
                <button style={styles.delBtn}
                onClick={removeMovie} className="d-flex justify-content-end float-right align-items-end ms-auto">X</button> </li>
              )}
            </div>
          </div>
        </div>
          :
          <div></div>
          }
        <div className="d-flex flex-row list-group col-sm-12 justify-content-around align-items-center">
          <div className="d-flex flex-column list-group col-sm-12 justify-content-center">
            <div className="errorMsg d-flex flex-column col-sm-12 justify-content-center">{errorMsg.map( (error, index)  => <h1 key={index} className="errorMsg">{error.msg}</h1>)}</div>
            <div className="d-flex flex-row list-group col-sm-12 justify-content-around">
              <h3 style={styles.orangeColor} className="d-flex justify-content-around">Search By Title & Year</h3>
              <div className="form-group d-flex m-1 justify-content-around">
                <input 
                  value={title}
                  onChange={handleInputChange}
                  type="text"
                  id="title" 
                  name="title"
                  placeholder="Title" 
                  className="form-control justify-content-center align-items-center col-sm-6"/>
              </div>
              <div className="form-group d-flex m-1">
                <input 
                  value={year}
                  onChange={handleInputChange}
                  type="text"
                  id="year" 
                  name="year"
                  placeholder="Year" 
                  className="form-control justify-content-center align-items-center col-sm-6"/>
              </div>
                <button
                  style={styles.orangeColorBg} 
                  id="search-by-title-button" 
                  type="submit" 
                  className="btn d-flex justify-content-center align-items-center col-sm-2"
                  onClick={apiCall}>
                    
                    Search
                </button>
              </div>
            </div>
          </div>
        </div>
        {results ?
        <div 
          id="searchResults"
          className="overflow-auto col-sm-6"
          style={styles.posterHeight}>
            {results.map(movie => 
            <div className='imgContainer card m-5'
            style={styles.blueColorBg}
            id={movie.imdbID}
            name={movie.Title} 
            key={movie.imdbID} 
            onClick={searchMovie}> 
            <img src={movie.Poster}
            style={styles.blueColorBg}
            id={movie.imdbID}
            name={movie.Title} 
            alt="Poster" 
            width="550" 
            height="600"/> 
            <h3 className='centered'> 
            {movie.Title} {movie.Year}</h3> </div>) }
        </div>
        :
        <div><h1>Movie Not Found</h1></div>      
        }
    </form>
  );
  };
export default Home;
