import React, { useState, useEffect} from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css'
import Navbar from './components/Navbar';
import BlogList from './components/BlogList';
import BlogPost from './components/BlogPost';
import AddFavorite from './components/AddFavorite';
import BlogListHeading from './components/BlogListHeading';
import RemoveFavorites from './components/RemoveFavorites';
import FavoriteView from './components/FavoriteView';
import { collection, addDoc, getDocs, deleteDoc, doc } from "firebase/firestore";
import { MovieContext, MovieProvider } from './context/MovieGlobalState';
import AddWatchList from './components/AddWatchList';
import RemoveWatchList from './components/RemoveWatchList';
import { createUserWithEmailAndPassword , onAuthStateChanged} from 'firebase/auth'
import { Await } from 'react-router-dom';
import { db, auth} from './firebase'


const App = () => {
  const [movies, setMovies] = useState([]);
  const [searchValue, setSearchValue] = useState('');
  const [selectedMovie, setSelectedMovie] = useState(null);
  const [currentView, setCurrentView] = useState('blogList');
  const [favorites, setFavorites] = useState([]);
  const [watchList, setWatchList] = useState([]);
  const [lastFiveWatched, setLastFiveWatched] = useState([]);
  const [registerEmail, setRegisterEmail] = useState('');
  const [registerPassword, setRegisterPassword] = useState('');
  const [loginPassword, setLoginPassword] = useState('');
  const [loginEmail, setLoginEmail] = useState('');
  const [user, setUser] = useState({});


  const getMovieRequest = async () => {
    const url = `http://www.omdbapi.com/?s=${searchValue}&apikey=d29dc057`;
    const response = await fetch(url);
    const responseJson = await response.json();

    if (responseJson.Search) {
      setMovies(responseJson.Search);
    }
  };

  useEffect(() => {
    const movieFavourites = JSON.parse(
      localStorage.getItem('react-movie-app-favourites')
    );

    if (movieFavourites) {
      setFavorites(movieFavourites);
    }
    getFavorites().then(data => {
      setFavorites(data);
    });
  }, []);

  useEffect(() => {
    const movieToWatchlist = JSON.parse(
      localStorage.getItem('react-movie-app-watchList')
    );

    if (movieToWatchlist) {
      setWatchList(movieToWatchlist);
    }
    getWatchList().then(data => {
      setWatchList(data);
      setLastFiveWatched(data.slice(0,5));
    });
  }, []);



  useEffect(() => {
    getMovieRequest();
  }, [searchValue]);


  // onAuthStateChanged(auth, (correntUser) => {
  //    setUser(correntUser);
  // });

  const handleLastFiveWatchedClick = (movies) => {
    setMovies(movies);
    setCurrentView('blogList');
    setSelectedMovie(null);
  };


  const handleMovieSelect = (movie) => {
    setSelectedMovie(movie);
    setCurrentView('blogPost');
  };

  const handleBlogPostClick = (movie) => {
    handleMovieSelect(movie);
    alert("Debes seleccionar una pelicula o serie para ver su información");
    setCurrentView('blogPost');
  };

  const handleBlogListClick = () => {
    setCurrentView('blogList');
    setSelectedMovie(null);
  };

  const handleBackClick = () => {
    setCurrentView('blogList');
    setSelectedMovie(null);
  };



  const saveToLocalStorage = (items) => {
    localStorage.setItem('react-movie-app-favourites', JSON.stringify(items));
  };

  const addFavoritesMS = async (movie) => {
    try {
      await addDoc(collection(db, "favorites"), movie);
      console.log("Document added to 'favorites' collection successfully");
      const newFavouriteList = [...favorites, movie];
      setFavorites(newFavouriteList);
    } catch (e) {
      console.error("Error adding document to 'favorites' collection: ", e);
    }
  };

  const addWatchListMS = async (movie) => {
    try {
      await addDoc(collection(db, "watchList"), movie);
      console.log("Document added to 'watchList' collection successfully");
      const newWatchList = [...watchList, movie];
      setWatchList(newWatchList);
    } catch (e) {
      console.error("Error adding document to 'watchList' collection: ", e);
    }
  };

  
  const removeFavouriteMovie = async (movie) => {
    const docRef = doc(db, 'favorites', movie.imdbID);
    try {
      await deleteDoc(docRef);
      const newFavouriteList = favorites.filter(
        (favorite) => favorite.imdbID !== movie.imdbID
      );
      setFavorites(newFavouriteList);
      saveToLocalStorage(newFavouriteList);
    } catch (error) {
     
      console.error('Error removing document: ', error);
      console.log('docRef: ', docRef);
    }
};

const removeWatchList = async (movie) => {
  const docRef = doc(db, 'watchList', movie.imdbID);
  try {
    await deleteDoc(docRef);
    const newWatchList = watchList.filter(
      (watchList) =>  watchList.imdbID !== movie.imdbID
    );
    setWatchList(newWatchList);
    saveToLocalStorage(newWatchList);
  } catch (error) {
   
    console.error('Error removing document: ', error);
    console.log('docRef: ', docRef);
  }
};
  
  const getFavorites = async () => {
    const favoritesRef = collection(db, 'favorites');
    const snapshot = await getDocs(favoritesRef);
    return snapshot.docs.map(doc => doc.data());
  };
  

  const getWatchList = async () => {
    const watchListRef = collection(db, 'watchList');
    const snapshot = await getDocs(watchListRef);
    return snapshot.docs.map(doc => doc.data());
  };

  const register = async () => {
    try {
      const user=  await createUserWithEmailAndPassword(auth, registerEmail, registerPassword)
      console.log(user);
    } catch (error) {
      console.error(error.message);
    }

  };

  const login = async () =>{
  
  };

  const logout = async() =>{

  };



  return (
    <div className='App'>
      <div >
        <h3>Register User</h3>
        <input 
        placeholder='Email...' 
        onChange={(event) => {
          setRegisterEmail(event.target.value)
          }}>
          </input>

        <input 
        placeholder='Password...'
        onChange={(event) => {
          setRegisterPassword(event.target.value)
          }}>
          </input>
      
        <button onClick ={register}>Create User</button>

      </div>
      <div>
        <h3> Login </h3>
        <input 
        placeholder='Email...'
        onChange={(event) => {
          setLoginEmail(event.target.value)
          }}>
          </input>

        <input 
        placeholder='Password...'
        onChange={(event) => {
          setLoginPassword(event.target.value)
          }}>
          </input>

        <button> Login </button>
      </div>

      <h4> User Logged in</h4>
      {/* {auth.currentUser.email} */}

      <button> Sing Out </button>

      <FavoriteView />
      <MovieProvider />
      <div className='container-fluid movie-blog'>

        <div className='row d-flex align-items-center mt-4 mb-4'>
          <BlogListHeading heading='Movies' />
          <div className='col col-sm-4'>
            <input

              className='form-control'
              type='search'
              placeholder='Search'
              aria-label='Search'
              value={searchValue}
              onChange={(e) => setSearchValue(e.target.value)}
            />
          </div>

        </div>

        <div className='row-bot'>
          <Navbar
            handleBlogListClick={handleBlogListClick}
            handleBlogPostClick={handleBlogPostClick}
            handleFavouritesClick={addFavoritesMS}
            handleWatchlist={addWatchListMS}
          />
          <div className='blog-container'>
            {currentView === 'blogList' ? (
              <BlogList
                movies={movies}
                type = {""}
                handleMovieSelect={handleMovieSelect}
                favoriteComponent={AddFavorite}
                watchListComponent={AddWatchList}
                handleFavouritesClick={addFavoritesMS}
                handleWatchlist={addWatchListMS}
                
              />
            ) : (
              <BlogPost movie={selectedMovie} handleBackClick={handleBackClick} handleLastFiveWatchedClick={handleLastFiveWatchedClick} lastFiveWatched={lastFiveWatched} />

            )}
          </div>


          <div className='row d-flex align-items-center mt-4 mb-4'>
            <BlogListHeading heading='Favorites' />
            
            <div className='row-bot'>
              <Navbar
                handleBlogListClick={handleBlogListClick}
                handleBlogPostClick={handleBlogPostClick}
                handleFavouritesClick={removeFavouriteMovie}
                
              />
              <div className='blog-container'>
                {currentView === 'blogList' ? (
                  <BlogList
                  type = {"favorites"}
                  movies = {[]}
                    
                    handleMovieSelect={handleMovieSelect}
                    handleFavouritesClick={removeFavouriteMovie}
                    favoriteComponent={RemoveFavorites} 
                    watchListComponent={RemoveWatchList}
                    handleWatchlist={removeWatchList}
                    />
                    
                ) : (
                  <BlogPost movie={selectedMovie} handleBackClick={handleBackClick} handleLastFiveWatchedClick={handleLastFiveWatchedClick} lastFiveWatched={lastFiveWatched} />

                )}
              </div>
            </div>
          </div>

          <div className='row d-flex align-items-center mt-4 mb-4'>
            <BlogListHeading heading='watchList' />
            
            <div className='row-bot'>
              <Navbar
                handleBlogListClick={handleBlogListClick}
                handleBlogPostClick={handleBlogPostClick}
                handleFavouritesClick={removeFavouriteMovie}
                handleWatchlist={removeWatchList}
              />
              <div className='blog-container'>
                {currentView === 'blogList' ? (
                  <BlogList
                  type = {"wachList"}
                  movies = {watchList}
                    
                    handleMovieSelect={handleMovieSelect}
                    handleFavouritesClick={removeFavouriteMovie}
                    favoriteComponent={RemoveFavorites} 
                    watchListComponent={RemoveWatchList}
                    handleWatchlist={removeWatchList}
                    />
                ) : (
                  <BlogPost movie={selectedMovie} handleBackClick={handleBackClick} handleLastFiveWatchedClick={handleLastFiveWatchedClick} lastFiveWatched={lastFiveWatched} />

                )}
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};



export default App;