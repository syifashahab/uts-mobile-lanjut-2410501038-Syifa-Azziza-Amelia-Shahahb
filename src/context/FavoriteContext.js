import React, { createContext, useReducer } from 'react';

export const FavoriteContext = createContext();

const initialState = {
  favorites: []
};

function reducer(state, action) {
  switch (action.type) {
    case 'ADD_FAVORITE':
      return {
        favorites: [...state.favorites, action.payload]
      };

    case 'REMOVE_FAVORITE':
      return {
        favorites: state.favorites.filter(
          item => item.key !== action.payload
        )
      };

    default:
      return state;
  }
}

export function FavoriteProvider({ children }) {
  const [state, dispatch] = useReducer(reducer, initialState);

  return (
    <FavoriteContext.Provider value={{ state, dispatch }}>
      {children}
    </FavoriteContext.Provider>
  );
}