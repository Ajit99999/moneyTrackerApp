import { useEffect, useReducer, useState } from "react";
import { projectFireStore } from "../firebase/Config";

const reducer = (state, action) => {
  if (action.type === "PENDING") {
    return { documents: null, isLoading: true, error: null, success: false };
  } else if (action.type === "ADDED") {
    return {
      documents: action.payLoad,
      isLoading: false,
      error: null,
      success: true,
    };
  } else if (action.type === "ERROR") {
    return {
      documents: null,
      isLoading: false,
      error: action.payLoad,
      success: false,
    };
  } else if (action.type === "DELETE") {
    return {
      documents: action.payLoad,
      isLoading: false,
      error: null,
      success: false,
    };
  }
  return state;
};
const useFireStore = (collections) => {
  const [state, dispatch] = useReducer(reducer, {
    documents: null,
    isLoading: false,
    error: null,
    success: false,
  });
  const [isCancelled, setisCancelled] = useState(false);
  const ref = projectFireStore.collection(collections);

  const addTransactions = async (data) => {
    try {
      dispatch({
        type: "PENDING",
      });

      const response = await ref.add(data);
  
      if (!isCancelled) {
        dispatch({
          type: "ADDED",
          payLoad: response,
        });
      }
    } catch (err) {
      if (!isCancelled) {
        dispatch({
          type: "ERROR",
          payLoad: err.message,
        });
      }
    }
  };

  const deleteTransactions = async (id) => {
    try {
      dispatch({
        type: "PENDING",
      });
      await ref.doc(id).delete();

      if (!isCancelled) {
        dispatch({
          type: "DELETE",
          payLoad: null,
        });
      }
    } catch (err) {
      if (!isCancelled) {
        dispatch({
          type: "ERROR",
          payLoad: err.message,
        });
      }
    }
  };

  useEffect(() => {
    return () => {
      setisCancelled(true);
    };
  }, []);

  return {
    state,
    addTransactions,
    deleteTransactions,
  };
};

export default useFireStore;
