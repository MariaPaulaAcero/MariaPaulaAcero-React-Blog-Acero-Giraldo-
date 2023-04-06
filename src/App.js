import React, { useState, useEffect } from 'react';
import './App.css'
import Navbar from './components/Navbar';
import BlogList from './components/BlogList';
import BlogPost from './components/BlogPost';

const App = () => {
  const [movies, setMovies] = useState([]);
  const [searchValue, setSearchValue] = useState('');
  const [selectedMovie, setSelectedMovie] = useState(null);
  const [currentView, setCurrentView] = useState('blogList');

  const getMovieRequest = async () => {
    const url = `http://www.omdbapi.com/?s=${searchValue}&apikey=d29dc057`;
    const response = await fetch(url);
    const responseJson = await response.json();

    if (responseJson.Search) {
      setMovies(responseJson.Search);
    }
  };
  

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

  return (
    <div className='container-fluid movie-blog'>
      <div className='row'>
        <div className='col-lg-8 offset-lg-2'>
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
        />
        <div className='blog-container'>
          {currentView === 'blogList' ? (
            <BlogList movies={movies} handleMovieSelect={handleMovieSelect} />
          ) : (
            <BlogPost movie={selectedMovie} handleBackClick={handleBackClick} />
          )}
        </div>
      </div>
    </div>
  );
};



export default App;