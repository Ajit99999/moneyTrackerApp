import { useEffect, useState } from "react";
import { projectFireAuth } from "../firebase/Config";
import useAuthContext from "./useAuthContext";
const useSignUp = (email,password,displayName) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [isCancelled, setisCancelled ] = useState(false);

 const {dispatch  } =  useAuthContext()
  const signUpUser = async (email, password, displayName) => {

    try {
      setError("");
      setLoading(true);
      const res = await projectFireAuth.createUserWithEmailAndPassword(
        email,
        password
      );

      await res.user.updateProfile({ displayName });
     
      if(!isCancelled)
      {
        setLoading(false);
        setError("");
      }
      dispatch({
        type:"LOGIN",
        payLoad : {
            user:res.user,
            islogged:true
        }
      })
    } catch (err) {
        if(!isCancelled)
        {
            setError(err.message);
            setLoading(false);
        }
      console.log(err.message);
     
    }
  };
  useEffect(()=>{
    
    return ()=>{
       
        setisCancelled(true)
    }
  },[])

  return {
    loading,
    error,
    signUpUser,
  };
};
export default useSignUp;
