import { useState } from "react";
// import useAuthContext from "../../hooks/useAuthContext";
import useSignUp from "../../hooks/useSignUp";
import "../signup/SignUpForm.css";
const SignUpForm = () => {
  const [emailInput, setEmailInput] = useState("");
  const [emailInputError, setEmailInputError] = useState("");
  const [passwordInput, setPasswordInput] = useState("");
  const [passwordInputError, setPasswordInputError] = useState("");
  const [nameInput, setNameInput] = useState("");
  const [nameInputError, setNameInputError] = useState("");
  const [confirmpasswordInput, setConfirmPasswordInput] = useState("");
  const [confirmpasswordInputError, setConfirmPasswordInputError] =
    useState("");
  // const { dispatch } = useAuthContext();
  const { signUpUser, loading, error } = useSignUp(
    emailInput,
    passwordInput,
    nameInput
  );
  const onSubmitHandler = (e) => {
    e.preventDefault();

    if (
      emailInput.length === 0 ||
      passwordInput.length === 0 ||
      nameInput.length === 0 ||
      confirmpasswordInput.length === 0
    ) {
      return;
    }
    setEmailInput("");
    setPasswordInput("");
    setNameInput("");
    setConfirmPasswordInput("");

    signUpUser(emailInput, passwordInput, nameInput);
  };
  const onBlurEmailHandler = () => {
    if (emailInput.length === 0) {
      setEmailInputError("Please enter your email address");
    }
  };
  const onFocusEmailHandler = () => {
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
  const onBlurNameHandler = () => {
    if (nameInput.length === 0) {
      setNameInputError("Please enter your name");
    }
  };

  const onFocusNameHandler = () => {
    if (nameInputError) {
      setNameInputError("");
    }
  };
  const onBlurConfirmPasswordHandler = () => {
    if(confirmpasswordInput.length === 0)
    {
      setConfirmPasswordInputError(
        "Please make sure password & confirm password are same"
      );
    }
    else if (passwordInput !== confirmpasswordInput) {
      setConfirmPasswordInputError(
        "Please make sure password & confirm password are same"
      );
    }
  };
  const onFocusConfirmPasswordHandler = () => {
    if (confirmpasswordInputError) {
      setConfirmPasswordInputError("");
    }
  };
  return (
    <div className="form-div">
      <form onSubmit={onSubmitHandler}>
        <div className="form-group">
          <label htmlFor="name"> Name </label>
          <input
            onBlur={onBlurNameHandler}
            onFocus={onFocusNameHandler}
            autoComplete="true"
            placeholder="Enter Name"
            name="name"
            id="name"
            type="text"
            value={nameInput}
            onChange={(e) => setNameInput(e.target.value)}
          />
          <p> {nameInputError && nameInputError} </p>
        </div>
        <div className="form-group">
          <label htmlFor="email"> Email </label>
          <input
            onBlur={onBlurEmailHandler}
            onFocus={onFocusEmailHandler}
            autoComplete="true"
            placeholder="Enter Email"
            name="email"
            id="email"
            type="text"
            value={emailInput}
            onChange={(e) => setEmailInput(e.target.value)}
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
          <label htmlFor="confirmpassword"> Confirm Password </label>
          <input
            onBlur={onBlurConfirmPasswordHandler}
            onFocus={onFocusConfirmPasswordHandler}
            autoComplete="true"
            placeholder="Enter Password Again"
            name="confirmpassword"
            id="confirmpassword"
            type="password"
            value={confirmpasswordInput}
            onChange={(e) => setConfirmPasswordInput(e.target.value)}
          />
          <p> {confirmpasswordInputError && confirmpasswordInputError} </p>
        </div>
        <div className="form-group">
          {loading && (
            <button type="button" disabled className="btn">
              {" "}
              Loading....{" "}
            </button>
          )}
          {!loading && (
            <button type="submit" className="btn">
              {" "}
              Sign up{" "}
            </button>
          )}
          {error && <p className="error-class" > {error}</p>}
        </div>
      </form>
    </div>
  );
};
export default SignUpForm;
