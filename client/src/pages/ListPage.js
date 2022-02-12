// import { Link } from 'react-router-dom';
import { useQuery, useMutation} from '@apollo/client';
import Auth from "../utils/auth";
import { GET_LISTS, GET_ME } from '../utils/queries'
import { UPDATE_USER_WATCHED } from '../utils/mutations'
import React, { useState } from 'react';
let apiKey = process.env.REACT_APP_API_KEY;
const ListPage = () => {
  const [title, setTitle] = useState('');
  const [year, setYear] = useState('');
  const [results, setResults] = useState([]);
  const [lists, setLists] = useState([]);
  const [checkbox, setCheckbox] = useState(false)

  const { loading, data } = useQuery(GET_LISTS);
  const allMovieLists = data?.lists || [];

  const { loading: loadingV2, data: userInfo } = useQuery(GET_ME)
  console.log(userInfo)

  // const { loading: loadingV3, data: updateMovie} = useMutation(UPDATE_USER_WATCHED)


  let foundListArr = []

  const filterList = (searched) => {
    allMovieLists.forEach(list => {
      // All movies but still seperate arrays depending on list
      let allMovies = list.movies
      allMovies.forEach(movie => {
          let eachMovieId = movie.omdbId
          
          if (eachMovieId === searched[0].imdbID) {
            foundListArr.push(list)
          }
      })    
    });

    if (foundListArr.length === 0){
      alert("No List Found With This Movie")
    } else {
      console.log("Found " + foundListArr.length + " List with this movie")
      setLists(foundListArr) 
    }
}






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
        filterList(data.Search)
    });
  }


  const movieWatchedChange = async (event) => {
    event.preventDefault();
    console.log(event.target.checked)
    if (event.target.checked === true) {
      console.log(event.target)
      let { id, title, value} = event.target
      console.log(id)
      console.log(title)
      console.log(value)
      // try {
      //   await updateUserMovie({
      //     variables: {name: listName, message: listMsg, badge: 'badge', movies:movieLists, createdBy:'travis'},
      //   });
      //   window.location.reload()
      // } catch (err) {
      //   console.error(err);
      // }
    }
  }


  function checkMovieWatched(movie){
    if (Auth.loggedIn()) {
      console.log("logged in")
    } else {
      console.log("not logged in")
    }
    // if (user is logged in) {}
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

  //reverse if statement when done, make sure logged out person does not see check boxes

  if (Auth.loggedIn()) {
    return (
      <div>
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
            </form>
            <div className="accordion list-accordion container">
                {lists.map( list => 
                  <div className='card' key={list._id}>
                    <div className='card-header' id={list.name}>
                      <h2 className="mb-0">
                        <button className="btn btn-link" type="button" data-toggle="collapse" data-target={`#${list._id}`} aria-expanded="true" aria-controls={list._id}>
                          {list.name}
                          <img src={list.badge}/>
                        </button>
                      </h2>
                    </div>
                    <div id={list._id} className="collapse show" aria-labelledby={list.name} data-parent="#list-accordion">
                      <div className="card-body">
                        <ul>
                        {list.movies.map( movie =>
                          <li key={movie.omdbId}>
                            <form>
                              <div className="form-group form-check">
                                <input type="checkbox" 
                                className="form-check-input" 
                                id={movie.omdbId}
                                title={movie.title}
                                value={movie.year}
                                checked={checkMovieWatched(movie.omdbId)}
                                onChange={movieWatchedChange}
                                />
                                <label className="form-check-label" htmlFor={movie.omdbID}>{movie.title}</label>
                              </div>
                            </form>
                          </li>
                        )}
                        </ul>
                      </div>
                    </div>
                  </div>
                )}
            </div>
          </div>
      
    );

  } else {
    return (
      <div>
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
            </form>
            <div className="accordion list-accordion container">
                {lists.map( list => 
                  <div className='card' key={list._id}>
                    <div className='card-header' id={list.name}>
                      <h2 className="mb-0">
                        <button className="btn btn-link" type="button" data-toggle="collapse" data-target={`#${list._id}`} aria-expanded="true" aria-controls={list._id}>
                          {list.name}
                          <img src={list.badge}/>
                        </button>
                      </h2>
                    </div>
                    <div id={list._id} className="collapse show" aria-labelledby={list.name} data-parent="#list-accordion">
                      <div className="card-body">
                        <ul>
                        {list.movies.map( movie =>
                          <li key={movie.omdbId}>
                            {movie.title}
                          </li>
                        )}
                        </ul>
                      </div>
                    </div>
                  </div>
                )}
            </div>
          </div>
      
    );

  }
};
export default ListPage;