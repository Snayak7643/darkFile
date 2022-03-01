import React, { useEffect, useReducer, createContext, useContext } from "react";
import { BrowserRouter, Route, Switch, useHistory } from "react-router-dom";
import Navbar from "./Components/Navbar/Navbar";
import Home from "./Pages/Home/Home";
import SignIn from "./Pages/SignIn/SignIn";
import SignUp from "./Pages/SignUp/SignUp";
import CreatePost from "./Pages/CreatePost/CreatePost";
import AllPosts from "./Pages/AllPosts/AllPosts";
import Profile from "./Pages/Profile/Profile";
import { initialState, reducer } from "./Reducers/reducer";

export const AppContext = createContext();

const Routing = () => {
  const history = useHistory();
  const { dispatch } = useContext(AppContext);
  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user"));
    if (user) {
      dispatch({ type: "USER", payload: user });
    } else {
      history.push("/signin");
    }
  }, []);
  return (
    <Switch>
      <Route exact path="/">
        <Home />
      </Route>
      <Route path="/signin">
        <SignIn />
      </Route>
      <Route path="/signup">
        <SignUp />
      </Route>
      <Route path="/createpost">
        <CreatePost />
      </Route>
      <Route path="/profile">
        <Profile />
      </Route>
      <Route path="/allposts">
        <AllPosts />
      </Route>
    </Switch>
  );
};

function App() {
  const [state, dispatch] = useReducer(reducer, initialState);
  return (
    <AppContext.Provider value={{ state, dispatch }}>
      <BrowserRouter>
        <Navbar />
        <Routing />
      </BrowserRouter>
    </AppContext.Provider>
  );
}

export default App;
