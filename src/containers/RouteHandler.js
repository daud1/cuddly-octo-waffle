import React, { Component } from 'react';
import { connect } from "react-redux";
import { BrowserRouter as Router, Switch, Route, Redirect } from 'react-router-dom';
import { isLoggedIn } from '../utils/helpers';
import Home from './Home';
import Settings from '../components/Settings';

class RouteHandler extends Component {
    render() {
        const { user } = this.props;
        const PrivateRoute = ({ component: Component, ...rest }) => (
            <Route
                {...rest}
                render={props => isLoggedIn(user) ? (<Component {...props} />) : (<Redirect to={{ pathname: "/" }} />)}
            />
        );

        return (
            <Router>
                <Switch>
                    <Route exact path='/' component={Home} />
                    <PrivateRoute path='/settings' component={Settings} />
                </Switch>
            </Router>
        );
    }
}


const mapStateToProps = state => ({
    user: state.user,
});

export default connect(mapStateToProps)(RouteHandler);