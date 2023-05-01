import { createContext, useReducer, useEffect } from "react";
import AppReducer from "./AppReducer";


const initialState = {
    favoriteMovie: localStorage.getItem("favorites")
        ? JSON.parse(localStorage.getItem("favorites"))
        : [],
    watchList: localStorage.getItem("watchlist")
        ? JSON.parse(localStorage.getItem("watchlist"))
        : [],
};


export const MovieContext = createContext(initialState);

export const MovieProvider = props => {

   const { favoriteMovie, watchList } = useReducer(AppReducer, initialState);   



    return (
        <MovieContext.Provider
            value={{
                watchList,
                favoriteMovie,
        
            }}
        >
            {props.children}
        </MovieContext.Provider>
    );
};
