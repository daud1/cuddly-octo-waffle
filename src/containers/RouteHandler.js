import React, { Component } from "react";
import { connect } from "react-redux";
import {
  Redirect,
  Route,
  BrowserRouter as Router,
  Switch
} from "react-router-dom";

import EmployerDashboard from "../containers/EmployerDashboard";
import Home from "./Home";
import PasswordResetConfirmation from "../components/auth/PasswordResetConfirmation";
import Settings from "../components/Settings";
import { isLoggedIn } from "../utils/helpers";

class RouteHandler extends Component {
  render() {
    const { user } = this.props;
    const PrivateRoute = ({ component: Component, ...rest }) => (
      <Route
        {...rest}
        render={props =>
          isLoggedIn(user) ? (
            <Component {...props} />
          ) : (
            <Redirect to={{ pathname: "/" }} />
          )
        }
      />
    );

    return (
      <Router>
        <Switch>
          {/* Open Routes */}
          <Route exact path="/" component={Home} />
          <Route
            path="/auth/reset-password/"
            component={PasswordResetConfirmation}
          />
          <Route path="/employer" component={EmployerDashboard} />

          {/* Authorized Routes */}
          <PrivateRoute path="/settings" component={Settings} />
        </Switch>
      </Router>
    );
  }
}

const mapStateToProps = state => ({
  user: state.user
});

export default connect(mapStateToProps)(RouteHandler);
