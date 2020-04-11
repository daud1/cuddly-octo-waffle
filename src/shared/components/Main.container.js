import "toasted-notes/src/styles.css";
import "../styles/global.css";
import "../styles/home.css";

import React, { Component } from "react";
import { clearNotification, removeUser } from "../../auth/reducers";

import Loader from "../components/Loader";
import RouteHandler from "../utils/RouteHandler";
import { connect } from "react-redux";
import { isEmpty } from "../utils/helpers";
import toast from "toasted-notes";

class MainContainer extends Component {
  componentDidUpdate(prevProps, prevState, snapshot) {
    const { notification, clearNotification } = this.props;
    if (prevProps.notification !== notification && !isEmpty(notification)) {
      const { message, options } = notification;
      toast.notify(message, options);
      clearNotification();
    }
  }

  componentDidMount() {
    window.addEventListener("beforeunload", event => {
      event.preventDefault();
      const { rememberMe, removeUser } = this.props;
      if (!rememberMe) {
        removeUser();
      }
    });
  }

  render() {
    const { user } = this.props;
    return (
      <Loader children={<RouteHandler user={user} />} loading={this.props.loading} />
    );
  }
}

const mapStateToProps = state => ({
  notification: state.auth.notification,
  rememberMe: state.auth.rememberMe,
  loading: state.auth.loading,
  user: state.auth.user
});

const mapDispatchToProps = dispatch => ({
  clearNotification: () => dispatch(clearNotification()),
  removeUser: () => dispatch(removeUser())
});

export default connect(mapStateToProps, mapDispatchToProps)(MainContainer);
