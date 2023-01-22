import { useContext } from "react";
import { AuthContext } from "../context/auth-context";

const useAuthContext = () => {
  const { dispatch, islogged, user, authCheck } = useContext(AuthContext);
 
  return {
    dispatch,
    islogged,
    user,
    authCheck,
  };
};
export default useAuthContext;
