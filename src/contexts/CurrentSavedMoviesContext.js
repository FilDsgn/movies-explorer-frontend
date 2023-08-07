// import { createContext } from "react";

// export const CurrentSavedMoviesContext = createContext([]);

import { createContext, useContext } from "react";

const CurrentSavedMoviesContext = createContext([]);

export function useSavedMoviesContext() {
  const context = useContext(CurrentSavedMoviesContext);
  return context;
}

export function CurrentSavedMoviesContextProvider({ children, ...props }) {
  return (
    <CurrentSavedMoviesContext.Provider value={props.context}>
      {children}
    </CurrentSavedMoviesContext.Provider>
  );
}
