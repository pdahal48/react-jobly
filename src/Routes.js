import React from "react";
import { Switch, Route, Redirect } from "react-router-dom";
import Home from "./Home";
import CompanyList from "./Companies/CompanyList";
import JobList from "./Jobs/JobList";
import CompanyDetail from "./Companies/CompanyDetail";
import Login from "./Users/Login";
import Profile from "./Users/Profile";
import SignUp from "./Users/SignUp";
import PrivateRoute from "./PrivateRoute";

/** Site-wide routes.
 *
 * Parts of site should only be visitable when logged in. Those routes are
 * wrapped by <PrivateRoute>, which is an authorization component.
 *
 * Visiting a non-existant route redirects to the homepage.
 */

function Routes({ loginUser, signup }) {

  return (
      <div className="pt-5">
        <Switch>

          <Route exact path="/">
            <Home />
          </Route>

          <Route exact path="/login">
            <Login loginUser ={loginUser} />
          </Route>

          <Route exact path="/signup">
            <SignUp signup={signup} />
          </Route>

          <PrivateRoute exact path="/companies">
            <CompanyList />
          </PrivateRoute>

          <PrivateRoute exact path="/jobs">
            <JobList />
          </PrivateRoute>

          <PrivateRoute exact path="/companies/:handle">
            <CompanyDetail />
          </PrivateRoute>

          <PrivateRoute path="/profile">
            <Profile />
          </PrivateRoute>

          <Redirect to="/" />
        </Switch>
      </div>
  );
}

export default Routes;
