import React, { Component } from "react";
import { connect } from "react-redux";
import toast from "toasted-notes";
import ACTIONS from "../redux/action";
import { isEmpty } from "../utils/helpers";
import RouteHandler from "../utils/RouteHandler";
import Loader from "../components/Loader";
import "toasted-notes/src/styles.css";
import "../styles/global.css";
import "../styles/home.css";

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
    return <Loader children={<RouteHandler />} />;
  }
}

const mapStateToProps = state => ({
  notification: state.notification,
  rememberMe: state.rememberMe
});

const mapDispatchToProps = dispatch => ({
  clearNotification: () => dispatch(ACTIONS.clearNotification()),
  removeUser: () => dispatch(ACTIONS.removeUser())
});

export default connect(mapStateToProps, mapDispatchToProps)(MainContainer);
