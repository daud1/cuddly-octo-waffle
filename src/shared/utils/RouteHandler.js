import { Redirect, Route, BrowserRouter as Router, Switch } from "react-router-dom";

import Dashboard from "../components/Dashboard.container";
import Home from "../../homePage/components/Home.container";
import JobSearch from "../../employee/components/JobSearch";
import PasswordResetConfirmation from "../../auth/components/PasswordResetConfirmation";
import React from "react";
import Settings from "../components/Settings";
import { connect } from "react-redux";
import { isLoggedIn } from "../utils/helpers";

const PrivateRoute = props => {
  const { path, component: Component, user } = props;
  return (
    <Route
      path={path}
      render={() => {
        if (isLoggedIn(user)) return <Component />;
        else return <Redirect to={{ pathname: "/" }} />;
      }}
    />
  );
};

class RouteHandler extends React.Component {
  render() {
    return (
      <Router>
        <Switch>
          <Route exact path="/" component={Home} />
          <Route path="/jobs/" component={JobSearch} />
          <Route path="/auth/reset-password/" component={PasswordResetConfirmation} />
          <PrivateRoute path="/dashboard" component={Dashboard} user={this.props.user} />
          <PrivateRoute path="/settings" component={Settings} user={this.props.user} />
        </Switch>
      </Router>
    );
  }
}

const mapStateToProps = state => ({ user: state.auth.user });

export default connect(mapStateToProps)(RouteHandler);
