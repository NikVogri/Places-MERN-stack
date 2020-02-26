import React from "react";
import {
  BrowserRouter as Router,
  Route,
  Redirect,
  Switch
} from "react-router-dom";
import UpdatePlace from "./places/pages/UpdatePlace.pages";
import Users from "./user/pages/Users.pages";
import NewPlace from "./places/pages/NewPlace.pages";
import MainNav from "./shared/components/Navigation/MainNav.component";
import UserPlaces from "./places/pages/UserPlaces.pages";
function App() {
  return (
    <Router>
      <MainNav />
      <main>
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
      </main>
    </Router>
  );
}

export default App;
