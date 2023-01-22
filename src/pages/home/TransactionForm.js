import { useState } from "react";
import useFireStore from "../../hooks/useFireStore";
import "./TransactionForm.css";
const TransactionForm = ({ uid }) => {
  const [name, setName] = useState("");
  const [nameError, setNameError] = useState("");
  const [amount, setAmount] = useState("");
  const [amountError, setAmountError] = useState("");
  const { state, addTransactions } = useFireStore("transactions");
  const onSubmitHandler = (e) => {
    e.preventDefault();
    if (amount.length === 0 || name.length === 0) {
      return;
    }
    setAmount("");
    setName("");
    addTransactions({
      name,
      amount,
      uid,
    });
  };

  const onBlurHandler = () => {
    if (name.length === 0) {
      setNameError("Please enter transaction name");
    }
  };
  const onFocusHandler = () => {
    if (nameError) {
      setNameError("");
    }
  };

  const onBlurAmountHandler = () => {
    if (amount.length === 0) {
      setAmountError("Please enter transaction amount");
    }
  };
  const onFocusAmountHandler = () => {
    if (amountError) {
      setAmountError("");
    }
  };

  return (
    <div className="form-div" style={{ flexGrow: 1 }}>
      <form onSubmit={onSubmitHandler}>
        <div className="form-group">
          <label htmlFor="name"> Transaction Name</label>
          <input
            onBlur={onBlurHandler}
            onFocus={onFocusHandler}
            autoComplete="true"
            placeholder="Enter transaction name"
            name="name"
            id="name"
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <p> {nameError && nameError} </p>
        </div>
        <div className="form-group">
          <label htmlFor="amout">Transaction Amount </label>
          <input
            onBlur={onBlurAmountHandler}
            onFocus={onFocusAmountHandler}
            autoComplete="true"
            placeholder="Enter transaction amount"
            name="amount"
            id="amount"
            type="number"
            min={0}
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
          />
          <p> {amountError && amountError} </p>
        </div>
        <div className="form-group">
          <button className="btn" type="submit">
            Add
          </button>

          {state.error && <p> {state?.error}</p>}
        </div>
      </form>
    </div>
  );
};
export default TransactionForm;
