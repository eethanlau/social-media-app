import { createContext, useEffect, useReducer } from "react";
import AuthReducer from "./AuthReducer";

const INITIAL_STATE = {
  user: {
    _id: "64c17f80893bb3721eb07068",
    username: "john",
    email: "john@gmail.com",
    profilePicture: "",
    coverPicture: "",
    followers: ["64cb1ac0574eac2bf7847f02"],
    followings: ["64cb1ac0574eac2bf7847f02"],
    isAdmin: false,
    from: "New York",
    desc: "I'm the GOAT"
  },
  isFetching: false,
  error: false
};

export const AuthContext = createContext(INITIAL_STATE);

export const AuthContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(AuthReducer, INITIAL_STATE);

  return ( 
    <AuthContext.Provider
     value ={{
      user:state.user, 
      isFetching:state.isFetching, 
      error:state.error,
      dispatch,
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}