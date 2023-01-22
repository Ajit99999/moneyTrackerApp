import useFireStore from "../../hooks/useFireStore";
import './TransactionsList.css';
import { FaRupeeSign } from 'react-icons/fa'
const TransactionsList = ({ documents }) => {
  const { deleteTransactions, state } = useFireStore("transactions");
  if (documents?.length === 0) {
    return (
      <div>
        <p> No Data Found...... </p>
      </div>
    );
  }
  
  return (
    <div style={{flexGrow: 4}}  >
      <ul className="trans-list"  >
        {documents.map((ele) => {
          return (
            <div key={ele.id} className="trans-details"  >
              <li> Transaction name : {ele.name} </li>
              <li> Transaction amount : <span> <FaRupeeSign/>   </span>  {ele.amount}    </li>
              <button className="btn"
                onClick={() => {
                  deleteTransactions(ele.id);
                }}
              >
                Delete
              </button>
            </div>
          );
        })}

        { state.error && <p> { state.error } </p>}
      </ul>
    </div>
  );
};
export default TransactionsList;
