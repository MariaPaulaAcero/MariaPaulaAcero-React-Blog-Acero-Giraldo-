import { createContext, useContext, useEffect, useState } from 'react';
import { db } from '../firebase';
import { collection, getDocs } from 'firebase/firestore';

// Crea el contexto para almacenar los datos de favoritos y watchlist
export const DataContext = createContext();

// Crear el proveedor del contexto
export const DataProvider = ({ children }) => {
  const [favorites, setFavorites] = useState([]);
  const [watchList, setWatchList] = useState([]);

  // Obtener los favoritos y la lista de seguimiento
  useEffect(() => {
    const fetchData = async () => {
      const favoritesRef = collection(db, 'favorites');
      const favoritesSnapshot = await getDocs(favoritesRef);
      const favoritesData = favoritesSnapshot.docs.map(doc => doc.data());
      setFavorites(favoritesData);

      const watchListsRef = collection(db, 'watchList');
      const watchListSnapshot = await getDocs(watchListsRef);
      const watchListData = watchListSnapshot.docs.map(doc => doc.data());
      setWatchList(watchListData);
    };

    fetchData();
  });

  return (
    <DataContext.Provider value={{ favorites, watchList }}>
      {children}
    </DataContext.Provider>
  );
};
