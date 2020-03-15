import React, { Component } from "react";
import { connect } from "react-redux";
import toast from "toasted-notes";
import { clearNotification, removeUser } from "../../auth/reducers";
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
    return <Loader children={<RouteHandler />} loading={this.props.loading} />;
  }
}

const mapStateToProps = state => ({
  notification: state.auth.notification,
  rememberMe: state.auth.rememberMe,
  loading: state.auth.loading
});

const mapDispatchToProps = dispatch => ({
  clearNotification: () => dispatch(clearNotification()),
  removeUser: () => dispatch(removeUser())
});

export default connect(mapStateToProps, mapDispatchToProps)(MainContainer);
