import useAuthContext from "../../hooks/useAuthContext";
import useCollection from "../../hooks/useCollection";
import TransactionForm from "./TransactionForm";
import TransactionsList from "./TransactionsList";
import "./Home.css";
import Shimmer from "../../components/Shimmer";

const Home = () => {
  const { user } = useAuthContext();
  const { documents, error, isLoading } = useCollection("transactions");
  
  return (
    <div className="home-container">
      {error && <p> {error} </p>}
      <div>
       { isLoading ? <p> Loading...... </p> : ""  }
      </div>
      <div className="list-container"  >   
      {documents ? <TransactionsList documents={documents} /> : <Shimmer/> }
      </div>
      <div  className="form-container"  >
          
      
      <TransactionForm uid={user.uid} />{" "}
      </div>
    </div>
  );
};
export default Home;
