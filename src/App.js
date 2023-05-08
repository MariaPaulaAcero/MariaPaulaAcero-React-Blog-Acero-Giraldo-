import React, { useState, useEffect} from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css'
import Navbar from './components/Navbar';
import BlogList from './components/BlogList';
import BlogPost from './components/BlogPost';
import AddFavorite from './components/AddFavorite';
import BlogListHeading from './components/BlogListHeading';
import RemoveFavorites from './components/RemoveFavorites';
import { collection, addDoc, getDocs, deleteDoc, doc } from "firebase/firestore";
import { MovieContext, MovieProvider } from './context/MovieGlobalState';
import AddWatchList from './components/AddWatchList';
import RemoveWatchList from './components/RemoveWatchList';
import { createUserWithEmailAndPassword , signInWithEmailAndPassword, signOut} from 'firebase/auth'
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
  const [isLoggedIn, setIsLoggedIn] = useState(false);



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
      const userCredential = await createUserWithEmailAndPassword(auth, registerEmail, registerPassword);
      const newUser = userCredential.user;
      setIsLoggedIn(true);
      console.log(newUser);
      setUser(newUser);
    } catch (error) {
      console.error(error.message);
      alert("Cuenta existente o contraseña es muy corta debe tener mínimo 6 dígitos");
    }
  };
  
  const login = async () => {
    try {
      const userCredential = await signInWithEmailAndPassword(auth, loginEmail, loginPassword);
      const loggedInUser = userCredential.user;
      setIsLoggedIn(true);
      console.log(loggedInUser);
      setUser(loggedInUser);
    } catch (error) {
      console.error(error.message);
      alert("No se ha encontrado ninguna cuenta asociada");
    }
  };

  const logout = async () => {
    try {
      await signOut(auth);
      setIsLoggedIn(false);
      setUser(null); // Establecer isLoggedIn como false al cerrar la sesión
    } catch (error) {
      console.error(error.message);
    }
  };
  
  return (
    <div className='App'>
      
      <div> 
      <div className='register'>
      {!isLoggedIn && (
        <>
        <div>
        <h3>Register User</h3>
        <input
          placeholder='Email...'
          onChange={(event) => {
            setRegisterEmail(event.target.value)
          }}
          />
        <input
          placeholder='Password...'
          onChange={(event) => {
            setRegisterPassword(event.target.value)
          }}
        />
        <button className='register-button' onClick={register}>Create User</button>
      </div>
      <div>
        <h3>Login</h3>
        <input
          placeholder='Email...'
          onChange={(event) => {
            setLoginEmail(event.target.value)
          }}
        />
        <input
          placeholder='Password...'
          onChange={(event) => {
            setLoginPassword(event.target.value)
          }}
        />
        <button className='register-button' onClick={login}>Login</button>
      </div>
      </>
      )}


      <div className='register-logged '>
      <h4> User Logged in: {user ? 'Yes' : 'No'} </h4>
      {user && <p>Email: {user.email}</p>}

      <button className='register-button' onClick={logout}> Sing Out </button> 
      </div>
      </div>
      
      {isLoggedIn && (  
        <>
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
      </>
      )}
    </div>
    </div>
  );
};



export default App;