import React, { useState, useCallback, useEffect } from "react";
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

let logoutTimer;

function App() {
  const [token, setToken] = useState(null);
  const [userId, setUserId] = useState(null);
  const [tokenExpirationDate, setTokenExpirationData] = useState();
  // never be recreated to avoid infinite callbacks
  const login = useCallback((uid, token, expirationDate) => {
    setToken(token);
    setUserId(uid);
    const tokenExpirationData =
      expirationDate || new Date(new Date().getTime() + 1000 * 60 * 60); // new date + 1hour
    setTokenExpirationData(tokenExpirationData);
    localStorage.setItem(
      "userData",
      JSON.stringify({
        userId: uid,
        token,
        expiration: tokenExpirationData.toISOString()
      })
    );
  }, []);

  const logout = useCallback(() => {
    setToken(null);
    setUserId(null);
    setTokenExpirationData(null);
  }, []);

  useEffect(() => {
    if (token && tokenExpirationDate) {
      const remainingTime =
        tokenExpirationDate.getTime() - new Date().getTime();
      logoutTimer = setTimeout(logout, remainingTime);
    } else {
      clearTimeout(logoutTimer);
    }
  }, [token, logout, tokenExpirationDate]);

  useEffect(() => {
    const data = JSON.parse(localStorage.getItem("userData"));
    if (data && data.token && new Date(data.expirationDate) > new Date()) {
      login(data.userId, data.token, new Date(data.expirationDate));
    }
  }, [login]);

  let routes;

  if (token) {
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
    <AuthContext.Provider
      value={{ isLoggedIn: !!token, login, logout, userId, token }}
    >
      <Router>
        <MainNav />
        <main>{routes}</main>
      </Router>
    </AuthContext.Provider>
  );
}

export default App;
