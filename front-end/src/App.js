import React from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";

import { useAuth } from "./components/hooks/auth-hook";
import AllPosts from "./pages/allPost";
import MainHeader from "./components/mainHeader";
import SinglePost from "./pages/singlePost";
import Authenticate from "./pages/authenticate";
import NewPost from "./pages/newPost";
import { AuthContext } from "./components/context/auth-context";

import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
function App() {
  const { token, userId, userName, image, login, logout } = useAuth();

  const route = token ? (
    <Switch>
      <Route exact path="/" component={AllPosts} />
      <Route exact path="/post/createPost" component={NewPost} />
      <Route exact path="/post/:postId">
        <SinglePost />
      </Route>
      <Redirect to="/" />
    </Switch>
  ) : (
    <Switch>
      <Route exact path="/" component={AllPosts} />
      <Route exact path="/authenticate" component={Authenticate} />
      <Route exact path="/post/:postId">
        <SinglePost />
      </Route>
    </Switch>
  );

  return (
    <AuthContext.Provider
      value={{
        isLoggedIn: !!token,
        token: token,
        userId: userId,
        login: login,
        logout: logout,
        userName: userName,
        image: image,
      }}
    >
      <Router>
        <React.Fragment>
          <MainHeader />
          {route}
        </React.Fragment>
      </Router>
    </AuthContext.Provider>
  );
}

export default App;
