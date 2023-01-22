import { useState } from "react";
import useLogin from "../../hooks/useLogin";
import "./Login.css";
const Login = () => {
  const [emailInput, setEmailInput] = useState("");
  const [emailInputError, setEmailInputError] = useState("");
  const [passwordInput, setPasswordInput] = useState("");
  const [passwordInputError, setPasswordInputError] = useState("");

  const { loginIn, loading, error } = useLogin();
  const onSubmitHandler = (e) => {
    e.preventDefault();
    if (emailInput.length === 0 || passwordInput.length === 0) {
      return;
    }
    setEmailInput("");
    setPasswordInput("");
    loginIn(emailInput, passwordInput);
  };
  const onBlurHandler = (e) => {
    if (emailInput.length === 0) {
      setEmailInputError("Please enter your email address");
    }
  };
  const onFocusHandler = (e) => {
    if (emailInputError) {
      setEmailInputError("");
    }
  };

  const onBlurPasswordHandler = () => {
    if (passwordInput.length === 0) {
      setPasswordInputError("Please enter your password");
    }
  };

  const onFocusPasswordHandler = () => {
    if (passwordInputError) {
      setPasswordInputError("");
    }
  };

  return (
    <div className="form-div">
      <form onSubmit={onSubmitHandler}>
        <div className="form-group">
          <label htmlFor="email"> Email </label>
          <input
            onBlur={onBlurHandler}
            onFocus={onFocusHandler}
            autoComplete="true"
            placeholder="Enter Email"
            name="email"
            id="name"
            type="text"
            value={emailInput}
            onChange={(e) => {
              setEmailInput(e.target.value);
            }}
          />
          <p> {emailInputError && emailInputError} </p>
        </div>

        <div className="form-group">
          <label htmlFor="password"> Password </label>
          <input
            onBlur={onBlurPasswordHandler}
            onFocus={onFocusPasswordHandler}
            autoComplete="true"
            placeholder="Enter Password"
            name="password"
            id="password"
            type="password"
            value={passwordInput}
            onChange={(e) => setPasswordInput(e.target.value)}
          />
          <p> {passwordInputError && passwordInputError} </p>
        </div>
        <div className="form-group">
          {loading && (
            <button className="btn" type="button" disabled>
              Loading....
            </button>
          )}
          {!loading && (
            <button className="btn form-btn" type="submit">
              {" "}
              Login...{" "}
            </button>
          )}
        </div>
        <div className="form-group"> {error && <p  className="error-class" > {error}</p>} </div>
      </form>

      {/* <button
        onClick={() => {
          setSingleSignBtn((prev) => !prev);
        }}
      >
       
        Sign with Mobile number 
      </button> */}
    </div>
  );
};
export default Login;
