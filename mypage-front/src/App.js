import React, { Component } from "react";
import { Switch, Route, Redirect } from "react-router-dom";
import routes from "./routes/routes";
class App extends Component {
  render() {
    return (
      <>
        <Switch>
          <Route
            path={routes.HOME_PAGE.path}
            exact
            component={routes.HOME_PAGE.component}
          />
          <Route
            path={routes.BOYARMAP_PAGE.path}
            exact
            component={routes.BOYARMAP_PAGE.component}
          />
            <Route
            path={routes.PAYMANTS_PAGE.path}
            exact
            component={routes.PAYMANTS_PAGE.component}
          />
          <Redirect to={routes.HOME_PAGE.path} />
        </Switch>
      </>
    );
  }
}

export default App;
