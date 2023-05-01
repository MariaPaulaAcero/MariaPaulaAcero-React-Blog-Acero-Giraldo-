export default (state, action) =>{
    switch(action.type){
        case "ADD_MOVIE_TO_WATCHLIST":
      return {
        ...state,
        watchList: [action.payload, ...state.watchList],
      };
    case "REMOVE_MOVIE_FROM_WATCHLIST":
      return {
        ...state,
        watchList: state.watchList.filter(
          (movie) => movie.id !== action.payload
        ),
      };
    case "ADD_MOVIE_TO_WATCHED":
      return {
        ...state,
        watchList: state.watchList.filter(
          (movie) => movie.id !== action.payload.id
        ),
        favoriteMovie: [action.payload, ...state.favoriteMovie],
      };
    case "MOVE_TO_WATCHLIST":
      return {
        ...state,
        favoriteMovie: state.favoriteMovie.filter(
          (movie) => movie.id !== action.payload.id
        ),
        watchlist: [action.payload, ...state.watchlist],
      };
    case "REMOVE_FROM_WATCHED":
      return {
        ...state,
        favoriteMovie: state.favoriteMovie.filter((movie) => movie.id !== action.payload),
      };
    default:
      return state;
  }
};