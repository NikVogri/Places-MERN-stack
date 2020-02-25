import React from "react";
import {
  BrowserRouter as Router,
  Route,
  Redirect,
  Switch
} from "react-router-dom";
import Users from "./user/pages/Users.pages";
import NewPlace from "./places/pages/NewPlace.pages";
import MainNav from "./shared/components/Navigation/MainNav.component";
function App() {
  return (
    <Router>
      <MainNav />
      <main>
        <Switch>
          <Route path="/" exact>
            <Users />
          </Route>
          <Route>
            <Route path="/places/new" exact>
              <NewPlace />
            </Route>
          </Route>
          <Redirect to="/" />
        </Switch>
      </main>
    </Router>
  );
}

export default App;
