import { createContext, useEffect, useReducer } from "react";
import { projectFireAuth } from "../firebase/Config";

export const AuthContext = createContext();

const reducer = (state, action) => {
  if (action.type === "LOGIN") {
    return {
      ...state,
      user: action.payLoad.user,
      islogged: action.payLoad.islogged,
    };
  } else if (action.type === "LOGOUT") {
    return { ...state, user: null, islogged: false };
  } else if (action.type === "AUTH_READY") {
    return {
      ...state,
      user: action.payLoad.user,
      islogged: action.payLoad.islogged,
      authCheck: action.payLoad.authCheck,
    };
  }
  return state;
};
const AuthProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, {
    user: null,
    islogged: false,
    authCheck: false,
  });
  useEffect(() => {
    const unsub = projectFireAuth.onAuthStateChanged((user) => {
     
      if (user) {
         dispatch(
          {
            type : "AUTH_READY",
            payLoad:{
              user,
              islogged:true,
              authCheck:true
            }
          }
         )
      }
      else{
        dispatch(
          {
            type : "AUTH_READY",
            payLoad:{
              user: null,
              islogged:false,
              authCheck:true
            }
          }
         )
      }
      unsub();
    });
  }, []);


  return (
    <AuthContext.Provider value={{ ...state, dispatch }}>
      {children}
    </AuthContext.Provider>
  );
};
export default AuthProvider;
