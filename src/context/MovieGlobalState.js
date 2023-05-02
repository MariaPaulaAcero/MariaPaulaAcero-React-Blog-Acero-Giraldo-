import { createContext, useReducer, useEffect, useState } from "react";
import AppReducer from "./AppReducer";


const initialState = {
    favoriteMovie: 
         JSON.parse(
            localStorage.getItem('react-movie-app-favourites')
          ),
    
};


export const MovieContext = createContext(initialState);

export const MovieProvider = props => {

    const [favorites, setFavorites] = useState(initialState.favoriteMovie);
    const [watchlist, setWatchlist] = useState(initialState.watchList);   


    return (
        <MovieContext.Provider
            value={{
                watchlist,
                favorites,
        
            }}
        >
            {props.children}
        </MovieContext.Provider>
    );
};
