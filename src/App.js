import React, { useState, useCallback } from "react";
import {
  BrowserRouter as Router,
  Route,
  Redirect,
  Switch
} from "react-router-dom";
import { AuthContext } from "./shared/context/auth-context";

import Auth from "./user/pages/Auth.pages";
import UpdatePlace from "./places/pages/UpdatePlace.pages";
import Users from "./user/pages/Users.pages";
import NewPlace from "./places/pages/NewPlace.pages";
import MainNav from "./shared/components/Navigation/MainNav.component";
import UserPlaces from "./places/pages/UserPlaces.pages";

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userId, setUserId] = useState(null);
  // never be recreated to avoid infinite callbacks
  const login = useCallback(uid => {
    setIsLoggedIn(true);
    setUserId(uid);
  }, []);

  const logout = useCallback(() => {
    setIsLoggedIn(false);
    setUserId(null);
  }, []);

  let routes;

  if (isLoggedIn) {
    routes = (
      <Switch>
        <Route path="/" exact>
          <Users />
        </Route>
        <Route path="/places/new" exact>
          <NewPlace />
        </Route>
        <Route path="/:userId/places" exact>
          <UserPlaces />
        </Route>
        <Route path="/places/:placeId" exact>
          <UpdatePlace />
        </Route>
        <Redirect to="/" />
      </Switch>
    );
  } else {
    routes = (
      <Switch>
        <Route path="/" exact>
          <Users />
        </Route>
        <Route path="/:userId/places" exact>
          <UserPlaces />
        </Route>
        <Route path="/auth" exact>
          <Auth />
        </Route>
        <Redirect to="/auth" />
      </Switch>
    );
  }

  return (
    <AuthContext.Provider value={{ isLoggedIn, login, logout, userId }}>
      <Router>
        <MainNav />
        <main>{routes}</main>
      </Router>
    </AuthContext.Provider>
  );
}

export default App;
