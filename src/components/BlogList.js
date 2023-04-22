import React from "react";


const BlogList = (props) => {
    const FavoriteComponent = props.favoriteComponent;
    const handleMovieClick = (movie) => {
        props.handleMovieSelect(movie);
   
    };



    return (
        <div className="posters">
            {props.movies.map((movie) => (
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
                    <div className="ml-3">
                        <h3>{movie.Title}</h3>
                    </div>
                </div>
            ))}
        </div>
    );
};

export default BlogList;