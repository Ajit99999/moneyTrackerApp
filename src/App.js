
import { BrowserRouter, Redirect, Route, Switch } from "react-router-dom";
import InvalidPage from "./components/InvalidPage";
import NavBar from "./components/NavBar";
// import AuthProvider from "./context/auth-context";
import useAuthContext from "./hooks/useAuthContext";


import Home from "./pages/home/Home";
import Login from "./pages/login/Login";
import SignUpForm from "./pages/signup/SignUpForm";

function App() {
  const { authCheck , islogged } = useAuthContext()
  return (
    <>
        { authCheck &&  <BrowserRouter>
        <NavBar />
        <Switch>
          <Route exact path={"/"}>
            
            {
                islogged ? <Home/> : <Redirect to={"/login"} />
            }
          </Route>
          <Route exact path={"/login"}>
           
            { !islogged ? <Login /> : <Redirect to={"/"} />  }
          </Route>
          <Route exact path={"/signup"}>
            
            { !islogged ? <SignUpForm /> : <Redirect to={"/"} /> }
          </Route>
          <Route exact path={"*"}>
            <InvalidPage />
          </Route>
        </Switch>
      </BrowserRouter> }
        
      
     
    </>
  );
}

export default App;
