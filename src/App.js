import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css'
import Navbar from './components/Navbar';
import BlogList from './components/BlogList';
import BlogPost from './components/BlogPost';
import AddFavorite from './components/AddFavorite';
import BlogListHeading from './components/BlogListHeading';
import RemoveFavorites from './components/RemoveFavorites';
import { db } from './firebase'
import { collection, addDoc, getDocs, deleteDoc, doc , writeBatch} from "firebase/firestore";

const App = () => {
  const [movies, setMovies] = useState([]);
  const [searchValue, setSearchValue] = useState('');
  const [selectedMovie, setSelectedMovie] = useState(null);
  const [currentView, setCurrentView] = useState('blogList');
  const [favorites, setFavorites] = useState([]);

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
    getMovieRequest();
  }, [searchValue]);


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

  const removeFavouriteMovie = async (movie) => {
    const newFavouriteList = favorites.filter(
      (favorite) => favorite.imdbID !== movie.imdbID
    );
    
    if (newFavouriteList.length === favorites.length) {
      console.log('Movie not found in favorites list.');
      return;
    }
    
    setFavorites(newFavouriteList);
    saveToLocalStorage(newFavouriteList);
  
    const docRef = doc(db, 'favorites', movie.imdbID);
    console.log('Trying to delete docRef:', docRef);
    
    try {
      await deleteDoc(docRef);
      console.log('Document deleted successfully.');
      const batch = writeBatch(db);
      batch.delete(docRef);
      await batch.commit(); // esperar a que se confirme la operación de eliminación en lote
    } catch (error) {
      console.error('Error removing document from Firestore:', error);
      setFavorites(favorites);
      saveToLocalStorage(favorites);
      return;
    }
};

  
  const getFavorites = async () => {
    const favoritesRef = collection(db, 'favorites');
    const snapshot = await getDocs(favoritesRef);
    return snapshot.docs.map(doc => doc.data());
  };





  return (
    <div className='App'>
      
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
          />
          <div className='blog-container'>
            {currentView === 'blogList' ? (
              <BlogList
                movies={movies}
                handleMovieSelect={handleMovieSelect}
                favoriteComponent={AddFavorite}
                handleFavouritesClick={addFavoritesMS}
              />
            ) : (
              <BlogPost movie={selectedMovie} handleBackClick={handleBackClick} />
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
                    movies={favorites}
                    handleMovieSelect={handleMovieSelect}
                    handleFavouritesClick={removeFavouriteMovie}
                    favoriteComponent={RemoveFavorites} />
                ) : (
                  <BlogPost movie={selectedMovie} handleBackClick={handleBackClick} />
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