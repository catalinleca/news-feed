import React, {useReducer} from "react";
import AuthReducer, {initialState} from "./authReducer";

export const AuthStateContext = React.createContext({});
export const AuthDispatchContext = React.createContext({});

export function useAuthState() {
  const context = React.useContext(AuthStateContext);
  if (context === undefined) {
    throw new Error("Cannot AuthStateContext without AuthProvider");
  }

  return context;
}

export function useAuthDispatch() {
  const context = React.useContext(AuthDispatchContext);
  if (context === undefined) {
    throw new Error("Cannot AuthDispatchContext without AuthProvider");
  }

  return context;
}

export const AuthProvider = ({ children }) => {
  const [state, dispatch] = useReducer(AuthReducer, initialState, () => initialState);

  return (
    <AuthStateContext.Provider value={state}>
      <AuthDispatchContext.Provider value={dispatch}>
        {children}
      </AuthDispatchContext.Provider>
    </AuthStateContext.Provider>
  );
}