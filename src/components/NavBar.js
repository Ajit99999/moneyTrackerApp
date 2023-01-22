import { Link } from "react-router-dom";
import useAuthContext from "../hooks/useAuthContext";
import useLogOut from "../hooks/useLogOut";
import "./NavBar.css";
const NavBar = () => {
  const { logOut } = useLogOut();
  const { islogged, user } = useAuthContext();
  return (
    <>
      <nav className="nav-bar">
        <div className="logo">
          <p> Finance Tracker </p>
        </div>
        <ul className="nav-list">
          {!islogged && (
            <Link to={"/login"} className="nav-link">
              <li> Login </li>
            </Link>
          )}

          {!islogged && (
            <Link to={"/signup"} className="nav-link">
              <li> Sign Up </li>
            </Link>
          )}

          {islogged && (
            <li>
              <button
                className="btn"
                onClick={() => {
                  logOut();
                }}
              >
                Log out
              </button>
            </li>
          )}

          {islogged && (
            <li>
              <p> Welcome {user?.displayName} </p>
            </li>
          )}
        </ul>
      </nav>
    </>
  );
};

export default NavBar;
