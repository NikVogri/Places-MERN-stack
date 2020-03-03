import React from "react";
import {
  BrowserRouter as Router,
  Route,
  Redirect,
  Switch
} from "react-router-dom";
import { AuthContext } from "./shared/context/auth-context";
import { useAuth } from "./shared/hooks/auth-hook";
import Auth from "./user/pages/Auth.pages";
import UpdatePlace from "./places/pages/UpdatePlace.pages";
import Users from "./user/pages/Users.pages";
import NewPlace from "./places/pages/NewPlace.pages";
import MainNav from "./shared/components/Navigation/MainNav.component";
import UserPlaces from "./places/pages/UserPlaces.pages";

function App() {
  const { token, login, logout, userId } = useAuth();
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
