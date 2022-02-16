// import { Link } from 'react-router-dom';
import { useQuery, useMutation } from '@apollo/client';
import '../styles/Home.css';
import Auth from "../utils/auth";
import { GET_LISTS, GET_ME } from '../utils/queries'
import { UPDATE_USER_WATCHED, UPDATE_COMPLETED_LIST } from '../utils/mutations'
import React, { useState, useEffect } from 'react';
import Carousel from '../components/Carousel';
let apiKey = process.env.REACT_APP_API_KEY;

const ListPage = () => {
  const [title, setTitle] = useState('');
  const [year, setYear] = useState('');
  const [results, setResults] = useState([]);
  const [lists, setLists] = useState([]);
  const [checkbox, setCheckbox] = useState(false)
  const [completedList, setCompletedList] = useState([]);
  const [watchedMovies, setWatchedMovies] = useState([])
  

  const { loading, data } = useQuery(GET_LISTS);
  const allMovieLists = data?.lists || [];

  const [user, setUser] = useState(null);
  const { loading: loadingV2, data: userInfo } = useQuery(GET_ME, {
    onCompleted: (userInfo) => {
      if (!user) {
      setUser(userInfo.me)
      // setWatchedMovies(userInfo.me.watchedMovies)
      }
    },
  });

  // setUser(useQuery(GET_ME))
  // console.log(user)

  const [updateUserMovie, { error }] = useMutation(UPDATE_USER_WATCHED)
  const [updateUserCompletedList, { error: errCompletedList }] = useMutation(UPDATE_COMPLETED_LIST)

  // useEffect(() => {setCompletedList();}, [completedList]);

  let hideBadgeImage = `/images/badges/Hidden-Badge.png`;
  let foundListArr = []

  const filterList = (searched) => {
    let userCompletedLists = [];
    allMovieLists.forEach(list => {
      // All movies but still seperate arrays depending on list
      let allMovies = list.movies
      allMovies.forEach(movie => {
        let eachMovieId = movie.omdbId

        if (eachMovieId === searched[0].imdbID) {
          //trying to hide badge for users that dont have that list
          // if (user) {
            console.log(user.completedLists)
          //   userCompletedLists = user.completedLists._id;
          //   console.log(user.completedLists)
          // } else {
          //   console.log("user list not found")
          // }
          // foundListArr.forEach((listItem) => {
          //   let badgePopulateImg = listItem.badge;
          //   let badgePopulateId = listItem._id;
          //   let badgePopulateName = listItem.name;
          //   if (userCompletedLists.some((listData) => listData._id === !badgePopulateId)) {
          //     badgePopulateImg = hideBadgeImage;
          //     //save into db (on watch) pull in against user
          //   }
          //   foundListArr.push({
          //     id: badgePopulateId,
          //     badge: badgePopulateImg,
          //     name: badgePopulateName
          //   })
          foundListArr.push(list)
          };
      });
    });

    if (foundListArr.length === 0){
      alert("No List Found With This Movie")
    } else {
      // console.log("Found " + foundListArr.length + " List with this movie")
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

  function apiCall(event) {
    event.preventDefault()
    fetch(`https://www.omdbapi.com/?apikey=${apiKey}&type=movie&s=${title}&r=json&y=${year}`)
      .then(response => response.json())
      .then(data => {
        setResults(data.Search);
        setTitle('');
        setYear('');
        filterList(data.Search)
      });
  }


  const movieWatchedChange = async (event) => {


    if (event.target.checked === true) {
      let { id, title, value } = event.target
      const watchedMovieObj = {
        title: title,
        year: value,
        omdbId: id,
        isWatched: true
      }
      // setWatchedMovies([...watchedMovies, watchedMovieObj])
      try {
        const userUpdate = await updateUserMovie({
          variables: { UserMovieWatched: watchedMovieObj },
        });
        console.log("userUpdate", userUpdate)
        checkMovieWatched(userUpdate)

        console.log(user)
      } catch (err) {
        console.error(err);
      }
    }

  }

  const handleCompletedList = async (arrayOfArrayslmao) => {
    let completedListObj = {}
    //arrayOfArraysLmao is an array of objects that has the list name and ID and the list of movies the user has completed in that list
    for (let i = 0; i < arrayOfArrayslmao.length; i++) {
      lists.forEach(list => {
        if (arrayOfArrayslmao[i].listId === list._id) {
          console.log("found match " + arrayOfArrayslmao[i].listName)
          if(arrayOfArrayslmao[i].theWatchedMovies.length === list.movies.length) {
            
            console.log(userInfo.me.username + " completed " + list.name)
            completedListObj = {
              _id: list._id
            }  
            try {
              const userUpdateList = updateUserCompletedList({
                variables: { UserCompletedList: completedListObj },
              });
              // console.log(userUpdateList)
              // window.location.reload()
            } catch (err) {
              // console.log("you got an error dumb")
              console.error(err);
            }
          }
        }
      })  
    }
    // console.log(completedListObj)
    
    // setCompletedList(completedListArr)
    // console.log(completedListArr)
    // console.log(completedList)
    // try {
    //   const userUpdateList = updateUserCompletedList({
    //     variables: { completedLists: completedListArr },
    //   });
    //   console.log(userUpdateList)
    // } catch (err) {
    //   console.error(err);
    // }
  }



    //get list with movies
//     let foundListMovieArray = foundListArr.movies.map((listedMovie) => listedMovie.omdbId)
//     console.log(userWatchedMovies);
//     console.log("above userwatched list");
//     console.log(foundListMovieArray);
//     foundListMovieArray.forEach((movie) => {
//       if (movie != userWatchedMovies) {
//           return
//       }
//       try {
//         const userUpdateList = updateUserCompletedList({
//           variables: { UserCompletedList: foundListArr._id },
//         });
//         console.log(userUpdateList)
//       } catch (err) {
//         console.error(err);
//       }
//   });
// };
    
    //if all movies === isWatched: true on user, call function
      
  function checkMovieWatched(userMovies) {
    const arrayOfArrayslmao = []
    lists.forEach(list => {
      let moviesWatchedArr = []
      let listName = list.name
      list.movies.forEach(movie => {

        userMovies.data.updateUserMovie.watchedMovies.forEach(watchedMovie => {
          console.log(watchedMovie)
          if (watchedMovie.omdbId === movie.omdbId) {
            moviesWatchedArr.push(movie)
          }
        })
      })
      arrayOfArrayslmao.push({listName: listName, listId: list._id, theWatchedMovies: moviesWatchedArr})
    })
    // console.log(arrayOfArrayslmao)
    handleCompletedList(arrayOfArrayslmao)
    setCheckbox(!checkbox)
  }

  function twoCalls(event) {
    movieWatchedChange(event)



    
  }

  function CheckingFunc(movie) {
    let checkingBox = ""
    userInfo.me.watchedMovies.forEach(watchedMovie => {
      if (watchedMovie.title === movie) {
        checkingBox = "true"
        return "true"
      }
    })
    return checkingBox
  }

  const styles = {
    orangeColor: {
      color: '#F2A154'
    },
    blueColor: {
      color: '#314E52',
      textDecoration: 'none'
    },
    orangeColorBg: {
      backgroundColor: '#F2A154'
    },
    blueColorBg: {
      backgroundColor: '#314E52'
    },
    sideImage: {
      minHeight: '100vh'
    },
    badgeImage: {
      maxHeight: '50px',
      maxWidth: '50px'
    },
    overflow: {
      overFlow: 'auto',
      maxHeight: '100vh'
    }

  }

  //reverse if statement when done, make sure logged out person does not see check boxes

  if (Auth.loggedIn()) {
    return (
      <div className="col-sm-9">
        <form className='container d-flex flex-column justify-content-center align-items-center col-sm-12'>
        <Carousel />
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
                className="form-control justify-content-center align-items-center col-sm-8"
              />
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
                className="form-control justify-content-center align-items-center col-sm-8" />
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
        <div style={styles.overflow} className="accordion list-accordion container col-sm-6 overflow-auto">
          {lists.map(list =>
            <div className='card m-2' key={list._id}>
              <div className='card-header d-flex justify-content-center' style={styles.orangeColorBg} id={list.name}>
                <h2 className="mb-0" style={styles.blueColor}>
                  <button
                    style={styles.blueColor}
                    className="btn btn-link fs-3"
                    type="button"
                    data-toggle="collapse"
                    data-target={`#${list._id}`}
                    aria-expanded="true"
                    aria-controls={list._id}>
                    {list.name}
                    <img className="" style={styles.badgeImage} src={list.badge} />
                  </button>
                </h2>
              </div>
              <div id={list._id} className="collapse show d-flex justify-content-center" aria-labelledby={list.name} data-parent="#list-accordion">
                <div className="card-body d-flex justify-content-center">
                  <ul>
                    {list.movies.map((movie, index) =>
                      <li key={movie.omdbId}>
                        <form className="listForm">
                          <div
                            style={styles.blueColor}
                            className="listDiv">
                            <label className="form-check-label fs-4" htmlFor={movie.omdbId} style={styles.blueColor}>
                            <input
                              style={styles.blueColor}
                              type="checkbox"
                              className="form-check-input"
                              id={movie.omdbId}
                              key={movie.omdbId+index}
                              title={movie.title}
                              value={movie.year}
                              defaultChecked={CheckingFunc(movie.title)}
                              onClick={twoCalls}
                              onChange={(event) => setCheckbox(event.currentTarget.checked)}
                            />
                            
                            {movie.title}
                            </label>
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
      <div className='container d-flex flex-column align-items-center col-sm-9'>
        <Carousel />
        <form className='container d-flex flex-column justify-content-center align-items-center col-sm-12'>
          <h1 style={styles.orangeColor}>Search By Title & Year</h1>
          <div className='container col-8 d-flex flex-column justify-content-center'>
            <div className="form-group d-flex  mt-1 mb-1">
              <input
                value={title}
                onChange={handleInputChange}
                type="text"
                id="title"
                name="title"
                placeholder="Title"
                className="form-control justify-content-center align-items-center col-sm-8" />
            </div>
            <div className="form-group d-flex mt-1">
              <input
                value={year}
                onChange={handleInputChange}
                type="text"
                id="year"
                name="year"
                placeholder="Year"
                className="form-control justify-content-center align-items-center col-sm-8"
              />
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
          {lists.map(list =>
            <div className='card' key={list._id}>
              <div className='card-header' id={list.name}>
                <h2 className="mb-0">
                  <button className="btn btn-link" type="button" data-toggle="collapse" data-target={`#${list._id}`} aria-expanded="true" aria-controls={list._id}>
                    {list.name}
                    <img src={list.badge} />
                  </button>
                </h2>
              </div>
              <div id={list._id} className="collapse show" aria-labelledby={list.name} data-parent="#list-accordion">
                <div className="card-body">
                  <ul>
                    {list.movies.map(movie =>
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