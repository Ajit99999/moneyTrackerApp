import { useEffect, useState } from "react";
import { projectFireStore } from "../firebase/Config";
import useAuthContext from "./useAuthContext";

const useCollection = (collection) => {
  const [documents, setdocuments] = useState(null);
  const [error, setError] = useState("");
  const [isLoading, setisLoading] = useState(false);
  const { user } = useAuthContext();
  useEffect(() => {
    let ref = projectFireStore.collection(collection);
    let unsubcribe = ref.onSnapshot(
      (snap) => {
        setError("");
        setisLoading(true);
        let documentsDetails = snap.docs
          .flatMap((doc) => {
            return { ...doc.data(), id: doc.id };
          })
          .filter((ele) => ele.uid === user.uid);
      
        setdocuments(documentsDetails);
        setisLoading(false);
        setError("")
      },
      (err) => {
        setError(err.message);
        setisLoading(false);
      }
    );

    return () => unsubcribe();
  }, [collection, user.uid]);

  return {
    documents,
    error,
    isLoading,
  };
};

export default useCollection;
