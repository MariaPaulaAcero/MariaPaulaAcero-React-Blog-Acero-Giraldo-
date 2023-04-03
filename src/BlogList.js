import React from "react";

const BlogList = (props) => {
    const handleMovieClick = (movie) => {
        props.handleMovieSelect(movie);
    };

    return (
        <>
            {props.movies.map((movie, index) => (
                <div className='d-flex justify-content-start m-3' key={index} onClick={() => handleMovieClick(movie)}>
                    <img src={movie.Poster} alt='movie'></img>
                    <div className='ml-3'>
                        <h3>{movie.Title}</h3>
                    </div>
                </div>
            ))}
        </>
    );
};

export default BlogList;