import { createContext, useContext, useReducer } from "react";

export const MobileNav = createContext();

export const MobileNavProvider = ({ children }) => {
  const INITIAL_STATE = {
    open: false,
  }

  const chatReducer = (state, action) => {
    switch(action.type) {
        case "TOGGLE_OPEN":
            return {
                open: !state.open
            };
        default: 
            return state
    }
  }

  const [state, dispatch] = useReducer(chatReducer, INITIAL_STATE);

  return (
    <MobileNav.Provider value={{ data: state, dispatch }}>
      {children}
    </MobileNav.Provider>
  );
};