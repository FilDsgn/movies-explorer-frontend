// import { createContext } from "react";

// export const CurrentUserContext = createContext();

import { createContext, useContext } from "react";

const CurrentUserContext = createContext([]);

export function useCurrentUserContext() {
  const context = useContext(CurrentUserContext);
  return context;
}

export function CurrentUserContextProvider({ children, ...props }) {
  return (
    <CurrentUserContext.Provider value={props.context}>
      {children}
    </CurrentUserContext.Provider>
  );
}
