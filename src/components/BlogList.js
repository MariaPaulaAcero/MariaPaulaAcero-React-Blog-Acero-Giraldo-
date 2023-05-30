import React, { useContext, useEffect, useState } from "react";
import { DataContext} from '../context/MovieContext';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '../firebase';
import { set } from "firebase/database";

const BlogList = (props) => {
  const { favorites, watchList} = useContext(DataContext);

  const [movies, setMovies] = useState([]);

  // Llama a la función para obtener la película favorita y actualizar el estado
  useEffect(()  => {
    const setContext = async () => {
      if (props.type === "favorites") {
        setMovies(favorites)
        
      } else if (props.type === "wachList") {
        setMovies(watchList);
      } else {
        setMovies(props.movies)
      }
    };
    setContext();

  });

  const handleMovieClick = (movie) => {
    props.handleMovieSelect(movie);
  };

  const FavoriteComponent = props.favoriteComponent;
  const WatchListComponent = props.watchListComponent;

  return (
    <div className="posters">
      {movies.map((movie) => (
        <div
          className="image-container d-flex flex-column align-items-center m-3 justify-content-start"      
          key={movie.imdbID}
        >
          <img src={movie.Poster} alt="movie" onClick={() => handleMovieClick(movie)}/>
          <div
            onClick={() => props.handleFavouritesClick(movie)}
            className="overlay d-flex align-items-center justify-content-center"
          >
            <FavoriteComponent />
          </div>
          <div
            onClick={() => props.handleWatchlist(movie)}
            className="overlay d-flex align-items-center justify-content-center"
          >
            <WatchListComponent />
          </div>
          <div className="ml-3">
            <h3>{movie.Title}</h3>
          </div>
        </div>
      ))}
    </div>
  );
};

export default BlogList;
