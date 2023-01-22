import { useState } from "react";
import { projectFireAuth } from "../firebase/Config";
import useAuthContext from "./useAuthContext";

const useLogOut = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const { dispatch } = useAuthContext();

  const logOut = async () => {
    try {
      setError("");
      setLoading(true);
      await projectFireAuth.signOut();
      setError("");
      setLoading(false);
      dispatch({
        type: "LOGOUT",
      });
    } catch (err) {
      setError(err.message);
      setLoading(false);
      console.log(err.message);
    }
  };

  return {
    loading,
    error,
    logOut,
  };
};

export default useLogOut;
