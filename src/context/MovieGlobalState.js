import { createContext, useReducer, useEffect } from "react";
import AppReducer from "./AppReducer";
import { collection, getDocs } from 'firebase/firestore';
import { db } from '../firebase';

const getFavorites = async () => {
  const favoritesRef = collection(db, 'favorites');
  const snapshot = await getDocs(favoritesRef);
  return snapshot.docs.map(doc => doc.data());
};

const getWatchList = async () => {
  const watchListsRef = collection(db, 'watchList');
  const snapshot = await getDocs(watchListsRef);
  return snapshot.docs.map(doc => doc.data());
};
const initialState = {
    favoriteMovie: getFavoriteMovie(),
    watchList: localStorage.getItem("watchlist")
        ? JSON.parse(localStorage.getItem("watchlist"))
        : [],
};

async function getFavoriteMovie() {
  var favorites = []
  await getFavorites().then((data) => {
    favorites = (prev => [...prev,data]);
  });

  return favorites
}

// Llama a la función para obtener la película favorita y actualizar el estad

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