import React, {useContext, useEffect, useState} from "react";
import { MovieContext } from '../context/MovieGlobalState';

const BlogList = (props) => {
    const { favoriteMovie, watchList } = useContext(MovieContext);
    const [movies, setMovies] = useState([]);

    useEffect(() => {
        const setContext = () => {
            if (props.type == "favorites") {
                setMovies(favoriteMovie)
            }else if (props.type == "wachList"){
                
                
                setMovies(props.movies)
            }else {
                setMovies(props.movies)
            }

        }
        setContext()
        console.log(favoriteMovie)
    
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
                    onClick={() => handleMovieClick(movie)}
                    key={movie.imdbID}
                >
                    <img src={movie.Poster} alt="movie"></img>
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