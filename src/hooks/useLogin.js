import { useEffect, useState } from "react";
import { projectFireAuth } from "../firebase/Config";
import useAuthContext from "./useAuthContext";

const useLogin = (email, password) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [isCancelled, setisCancelled] = useState(false);
  const { dispatch  } = useAuthContext()
  const loginIn = async (email, password) => {
    try {
      setLoading(true);
      setError("");
      const res = await projectFireAuth.signInWithEmailAndPassword(
        email,
        password
      );
     
      if (!isCancelled) {
        setLoading(false);
        setError("");
      }
      dispatch({
        type:"LOGIN",
        payLoad :{
            user: res.user,
            islogged: true
        }
      })
    } catch (err) {
      console.log(err.message);

      if (!isCancelled) {
        setError(err.message);
        setLoading(false);
      }
    }
  };

  useEffect(() => {
    return () => {
      setisCancelled(true);
    };
  }, []);
  return { loading, error, loginIn };
};
export default useLogin;
