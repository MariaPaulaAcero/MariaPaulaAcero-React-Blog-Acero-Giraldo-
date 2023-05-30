import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import RemoveFavorites from '../components/RemoveFavorites';
import RemoveWatchList from '../components/RemoveWatchList';
import BlogPost from '../components/BlogPost';

describe('RemoveFavorites', () => {
  it('should render the component', () => {
    render(<RemoveFavorites />);
    
    expect(screen.getByText('Remove from favourites')).toBeInTheDocument();
    expect(screen.getByTestId('remove-favorites-svg')).toBeInTheDocument();
  });
});

describe('RemoveWatchList', () => {
  it('should render the component', () => {
    render(<RemoveWatchList />);
    
    expect(screen.getByText('Remove from Watch List')).toBeInTheDocument();
    expect(screen.getByTestId('remove-watchlist-svg')).toBeInTheDocument();
  });
});


describe('BlogPost', () => {
  const mockMovie = {
    imdbID: 'tt0317219',
    Title: 'Cars',
    Poster: 'https://m.media-amazon.com/images/M/MV5BMTg5NzY0MzA2MV5BMl5BanBnXkFtZTYwNDc3NTc2._V1_SX300.jpg',
    Type: 'movie',
    Year: '2006',
  };

  const mockHandleBackClick = jest.fn();
  const mockHandleLastFiveWatchedClick = jest.fn();
  const mockLastFiveWatched = ['Movie A', 'Movie B', 'Movie C', 'Movie D', 'Movie E'];



  it('should render the component with correct movie data', () => {

    
    render(
      <BlogPost
        movie={mockMovie}
        handleBackClick={mockHandleBackClick}
        handleLastFiveWatchedClick={mockHandleLastFiveWatchedClick}
        lastFiveWatched={mockLastFiveWatched}
      />
    );

    expect(screen.getByText(mockMovie.Title)).toBeInTheDocument();
    expect(screen.getByText(`Año: ${mockMovie.Year}`)).toBeInTheDocument();
    expect(screen.getByText(`Id IMDB: ${mockMovie.imdbID}`)).toBeInTheDocument();
    expect(screen.getByText(`Tipo: ${mockMovie.Type}`)).toBeInTheDocument();
    expect(screen.getByAltText(mockMovie.Title)).toBeInTheDocument();
  });

  it('should call handleBackClick when "Volver a la lista de publicaciones" button is clicked', () => {
    
    render(
      <BlogPost
        movie={mockMovie}
        handleBackClick={mockHandleBackClick}
        handleLastFiveWatchedClick={mockHandleLastFiveWatchedClick}
        lastFiveWatched={mockLastFiveWatched}
      />
    );
    const backButton = screen.getByText('Volver a la lista de publicaciones');
    fireEvent.click(backButton);

    expect(mockHandleBackClick).toHaveBeenCalled();
  });

  it('should call handleLastFiveWatchedClick with lastFiveWatched array when "Últimas 5 películas agregadas al watchlist" button is clicked', () => {
    render(
      <BlogPost
        movie={mockMovie}
        handleBackClick={mockHandleBackClick}
        handleLastFiveWatchedClick={mockHandleLastFiveWatchedClick}
        lastFiveWatched={mockLastFiveWatched}
      />
    );
    const lastFiveWatchedButton = screen.getByText('Últimas 5 películas agregadas al watchlist');
    fireEvent.click(lastFiveWatchedButton);

    expect(mockHandleLastFiveWatchedClick).toHaveBeenCalledWith(mockLastFiveWatched);
  });
});
