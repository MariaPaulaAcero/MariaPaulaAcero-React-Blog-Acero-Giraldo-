import React from 'react';

const BlogPost = ({ movie, handleBackClick, handleLastFiveWatchedClick, lastFiveWatched }) => {
  const { Title, Year, imdbID, Type, Poster } = movie;

  return (
    <div className='blog-post'>
      <button className='post-button' onClick={handleBackClick}>Volver a la lista de publicaciones</button>
      <button className='post-button' onClick={() => handleLastFiveWatchedClick(lastFiveWatched)}>Últimas 5 películas agregadas al watchlist</button>

      <h2>{Title}</h2>
      <p>Año: {Year}</p>
      <p>Id IMDB: {imdbID}</p>
      <p>Tipo: {Type}</p>
      <img src={Poster} alt={Title} />
     </div>
  );
}

export default BlogPost;
