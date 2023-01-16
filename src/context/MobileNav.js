import { createContext, useReducer } from "react";

export const MobileNav = createContext();

export const MobileNavProvider = ({ children }) => {
  const width = window.innerWidth;
  const INITIAL_STATE = {
    open: true,
    width
  }

  const mobileReducer = (state, action) => {
    switch(action.type) {
        case "OPEN":
            return {
                ...state,
                open: true
            };
        case "CLOSE": 
            return {
                ...state,
                open: false
            }
        case "TOGGLE":
            return {
                ...state,
                open: !state.open
            }
        default: 
            return state
    }
  }

  const [state, dispatch] = useReducer(mobileReducer, INITIAL_STATE);

  return (
    <MobileNav.Provider value={{ data: state, dispatch }}>
      {children}
    </MobileNav.Provider>
  );
};