import React, { Component } from "react";
import { connect } from "react-redux";
import $ from "jquery";
import ACTIONS from "../redux/action";
import AccountNavbar from "./AccountNavbar";
import Dashboard from "./Dashboard";
import { dismissOverlay } from "../utils/helpers";

class AccountHome extends Component {
  componentDidMount() {
    $("body").on("click", event => {
      event.preventDefault();
      dismissOverlay(null, [
        "notification-tray",
        "account-dropdown",
        "job-feed-dropdown",
        "message-dropdown",
        "portfolio-upload-modal",
        "portfolio-view-modal",
        "hire-me-modal",
        "freelancers-dropdown",
        "connections-dropdown"
      ]);
    });
  }

  render() {
    return (
      <div
        id="profile-home"
        className="main-tabcontent"
        style={{ display: "block" }}
      >
        <AccountNavbar />
        <Dashboard />
      </div>
    );
  }
}

const mapStateToProps = state => ({
  user: state.user
});

const mapDispatchToProps = dispatch => ({
  removeUser: () => dispatch(ACTIONS.removeUser()),
  setLoading: loading => dispatch(ACTIONS.setLoading(loading)),
  setNotification: notification =>
    dispatch(ACTIONS.setNotification(notification))
});

export default connect(mapStateToProps, mapDispatchToProps)(AccountHome);
