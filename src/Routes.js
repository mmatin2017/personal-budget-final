import React from "react";
import { Route, Switch } from "react-router-dom";
import Home from "./page/Home";
import NotFound from "./page/NotFound";
import Login from "./page/Login";
import Signup from "./page/Signup";
import Dashboard from "./page/Dashboard";
export default function Routes() {
  return (
    <Switch>
      <Route exact path="/">
        <Home />
      </Route>
      <Route exact path="/login">
        <Login />
      </Route>
      <Route exact path="/signup">
        <Signup />
      </Route>
      <Route exact path="/dashboard">
        <Dashboard />
      </Route>
      {/* Finally, catch all unmatched routes */}
      <Route>
        <NotFound />
      </Route>
    </Switch>
  );
}
