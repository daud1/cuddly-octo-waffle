import React, { Component } from "react";
import axios from "axios";
import { connect } from "react-redux";

import {
  clearInputError,
  comparePasswords,
  getUrlParameter,
  inputHasValue,
  isEmpty,
  openRoute,
  scrollToElement,
  setInputError,
  showAPIErrors
} from "../../utils/helpers";
import ACTIONS from "../../redux/action";
import { API_URL } from "../../utils/constants";
import Footer from "../Footer";
import NavBar from "../Navbar";

class PasswordResetConfirmation extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  passwordMismatch = () => {
    const message = "Passwords don't match!";
    setInputError("passwordConfirmation", message);
    setInputError("password", message);
  };

  passwordMatch = () => {
    clearInputError("passwordConfirmation");
    clearInputError("password");
  };

  handleInputChange = event => {
    const target = event.target;
    const value = target.value;
    const name = target.name;
    this.setState({ [name]: value });
    clearInputError(name);
    switch (name) {
      case "passwordConfirmation":
        !comparePasswords() ? this.passwordMismatch() : this.passwordMatch();
        break;
      case "password":
        if (!inputHasValue("passwordConfirmation")) break;
        !comparePasswords() ? this.passwordMismatch() : this.passwordMatch();
        break;
      default:
        break;
    }
  };

  resetPassword = event => {
    event.preventDefault();
    const errorFields = [];
    const { password, passwordConfirmation } = this.state;

    if (!password) {
      const name = "password";
      setInputError(name, "Password required!");
      errorFields.push(name);
    }
    if (!passwordConfirmation) {
      const name = "passwordConfirmation";
      setInputError(name, "Password confirmation required!");
      errorFields.push(name);
    }
    if (!comparePasswords()) {
      this.passwordMismatch();
      errorFields.push("password");
    } else {
      this.passwordMatch();
    }

    if (!isEmpty(errorFields)) {
      scrollToElement(errorFields[0]);
      return;
    }

    const token = getUrlParameter("token");
    const { setLoading, setNotification, setSignon, user } = this.props;
    const data = { password, token };

    if (user && user.email) {
      data.email = user.email;
    }

    setLoading({ isLoading: true, loadingText: "Resetting password..." });
    axios
      .post(`${API_URL}/auth/reset_password/`, data)
      .then(res => {
        setLoading({ isLoading: false });
        if (!res.data) {
          setNotification({ message: "Data missing" });
        }
        const { data } = res;
        if (data.status === "OK") {
          setSignon("Sign In");
          setNotification({ message: "Password reset successfully!" });
          setTimeout(function() {
            openRoute(null, "/");
          }, 3000);
        }
      })
      .catch(error => {
        setLoading({ isLoading: false });
        showAPIErrors(error, setNotification);
      });
  };

  render() {
    return (
      <div>
        <NavBar />
        <div
          id="employer_signin"
          className="tabcontent gray-top-border center"
          style={{ display: "block" }}
        >
          <div style={{ width: "23em", margin: "3em auto" }}>
            <span className="display-block" style={{ fontSize: "30px" }}>
              Set New Password
            </span>
            <span
              className="display-block"
              style={{ fontSize: "12px", margin: "1em 0 2em" }}
            >
              Set password to use from now on.
            </span>
            <div className="left">
              <span className="font-weight-600 font-size-11px display-block">
                New Password
                <sup title="Required" style={{ color: "red", fontSize: "1em" }}>
                  *
                </sup>
              </span>
              <input
                onChange={this.handleInputChange}
                name="password"
                type="password"
                placeholder="New Password"
                className="full-rounded-input"
                style={{
                  fontSize: "10px",
                  padding: "1em 2em",
                  margin: "1em 0 2em 0",
                  borderColor: "#EBECED"
                }}
              />
              <span className="font-weight-600 font-size-11px display-block">
                Confirm New Password
                <sup title="Required" style={{ color: "red", fontSize: "1em" }}>
                  *
                </sup>
              </span>
              <input
                onChange={this.handleInputChange}
                name="passwordConfirmation"
                type="password"
                placeholder="Retype New Password"
                className="full-rounded-input"
                style={{
                  fontSize: "10px",
                  padding: "1em 2em",
                  margin: "1em 0 2em 0",
                  borderColor: "#EBECED"
                }}
              />
            </div>
            <a href="/" onClick={this.resetPassword}>
              <button
                className="full-rounded-button gradient"
                style={{ margin: "1em 0 2em 0", width: "100%", padding: "1em" }}
              >
                Submit
              </button>
            </a>
          </div>
          <div className="gray-top-border"></div>
        </div>
        <Footer />
      </div>
    );
  }
}

const mapStateToProps = state => ({
  user: state.user,
  signOn: state.signOn
});

const mapDispatchToProps = dispatch => ({
  setUser: user => dispatch(ACTIONS.setUser(user)),
  setLoading: loading => dispatch(ACTIONS.setLoading(loading)),
  setNotification: notification =>
    dispatch(ACTIONS.setNotification(notification)),
  setSignon: signOn => dispatch(ACTIONS.setSignon(signOn))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(PasswordResetConfirmation);
