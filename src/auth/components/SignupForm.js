import axios from "axios";
import { connect } from "react-redux";
import React, { Component } from "react";
import FacebookLogin from "react-facebook-login/dist/facebook-login-render-props";
import GoogleLogin from "react-google-login";

import {
  clearInputError,
  comparePasswords,
  facebookSignOn,
  googleSignOn,
  inputHasValue,
  isEmpty,
  scrollToElement,
  selectSingleRadioButton,
  setInputError,
  showAPIErrors,
  validateEmail
} from "../../common/utils/helpers";
import {
  API_URL,
  FACEBOOK_APP_ID,
  GOOGLE_CLIENT_ID
} from "../../common/utils/constants";

import {
  setUser,
  setSignOn,
  setNotification,
  setLoading,
  removeSignOn,
  createNewProfile
} from "../reducers";
import bubalusLogo from "../../common/images/bubalus.png";
import cover from "../../common/images/sample_cover_pic.jpg";
import followLogo from "../../common/images/follow_logo.jpg";
import logo from "../../common/images/athena_logo_image.jpg";
import profile12 from "../../common/images/sample_profile_pic_12.jpg";
import profile13 from "../../common/images/sample_profile_pic_13.jpg";
import profile15 from "../../common/images/sample_profile_pic_15.jpg";
import profile16 from "../../common/images/sample_profile_pic_16.jpg";
import profile17 from "../../common/images/sample_profile_pic_17.jpg";

class SignupForm extends Component {
  constructor(props) {
    super(props);
    this.state = { agreed: false };
  }

  toggleSignOn = (event, signOn) => {
    event.preventDefault();
    const { setSignOn } = this.props;
    setSignOn(signOn);
  };

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
      case "emailAddress":
        !validateEmail(value)
          ? setInputError(name, "Invalid Email")
          : clearInputError(name);
        break;
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

  renderSideImages = () => {
    const { user } = this.props;
    if (user.accountType === "employer") {
      return (
        <td className="center" style={{ width: "61%" }}>
          <div
            style={{
              width: "15em",
              height: "15em",
              borderRadius: "50%",
              overflow: "hidden",
              margin: "auto"
            }}
          >
            <img
              className="center-cropped-15-em"
              src={cover}
              onError={i => (i.target.style.display = "none")}
              alt="Logo"
            />
          </div>
          <div
            style={{
              width: "5em",
              height: "5em",
              borderRadius: "50%",
              overflow: "hidden",
              margin: "-10em auto 0"
            }}
          >
            <img
              className="center-cropped-5-em"
              src={logo}
              onError={i => (i.target.style.display = "none")}
              alt="Logo"
            />
          </div>
          <div
            className="avatar-large grey-box-shadow"
            style={{ display: "inline-block", margin: "1em 15em 0 0" }}
          >
            <img
              className="center-cropped-large"
              src={profile17}
              onError={i => (i.target.style.display = "none")}
              alt="Logo"
            />
          </div>
          <div
            className="grey-box-shadow"
            style={{
              width: "6em",
              height: "6em",
              borderRadius: "50%",
              overflow: "hidden",
              position: "relative",
              top: "-19em",
              right: "-6em"
            }}
          >
            <img
              className="center-cropped-6-em"
              src={followLogo}
              onError={i => (i.target.style.display = "none")}
              alt="Logo"
            />
          </div>
          <div
            className="grey-box-shadow"
            style={{
              width: "6em",
              height: "6em",
              borderRadius: "50%",
              overflow: "hidden",
              position: "relative",
              top: "-17em",
              right: "-23.8em"
            }}
          >
            <img
              className="center-cropped-6-em"
              src={bubalusLogo}
              onError={i => (i.target.style.display = "none")}
              alt="Logo"
            />
          </div>
          <span
            className="font-size-11px display-block"
            style={{ marginTop: "-12em" }}
          >
            Already User?{" "}
            <span
              className="bold blue all-links"
              onClick={event => this.toggleSignOn(event, "Sign In")}
            >
              Sign in now!
            </span>
          </span>
        </td>
      );
    } else if (user.accountType === "freelancer") {
      return (
        <td className="center" style={{ width: "32em" }}>
          <div
            style={{
              width: "5em",
              height: "5em",
              borderRadius: "56% 43% 62% 36% / 51% 30% 72% 49%",
              overflow: "hidden",
              margin: "-12em 0 -2em 14em"
            }}
          >
            <img
              className="center-cropped-5-em"
              src={profile16}
              onError={i => (i.target.style.display = "none")}
              alt="Logo"
            />
          </div>
          <div
            className="grey-box-shadow"
            style={{
              width: "10em",
              height: "12em",
              overflow: "hidden",
              display: "inline-block",
              margin: "1em 15em 0 0",
              borderRadius: "32% 68% 82% 18% / 78% 76% 24% 22%"
            }}
          >
            <img
              style={{ width: "10em", height: "12em", objectFit: "cover" }}
              src={profile13}
              onError={i => (i.target.style.display = "none")}
              alt="Logo"
            />
          </div>
          <div
            className="grey-box-shadow"
            style={{
              width: "6em",
              height: "6em",
              borderRadius: "69% 30% 26% 74% / 32% 50% 49% 80%",
              overflow: "hidden",
              position: "relative",
              right: "-18em"
            }}
          >
            <img
              className="center-cropped-6-em"
              src={profile12}
              onError={i => (i.target.style.display = "none")}
              alt="Logo"
            />
          </div>
          <div
            className="grey-box-shadow"
            style={{
              width: "6em",
              height: "6em",
              borderRadius: "30% 72% 65% 43% / 51% 83% 26% 49%",
              overflow: "hidden",
              position: "relative",
              top: "-17em",
              right: "-23.8em"
            }}
          >
            <img
              className="center-cropped-6-em"
              src={profile15}
              onError={i => (i.target.style.display = "none")}
              alt="Logo"
            />
          </div>
          <span className="font-size-11px display-inline-block">
            Already User?{" "}
            <span
              className="bold blue all-links"
              onClick={event => this.toggleSignOn(event, "Sign In")}
            >
              Sign in now!
            </span>
          </span>
        </td>
      );
    }
  };

  renderFormHeader = () => {
    const { user } = this.props;
    if (user.accountType === "employer") {
      return (
        <span
          className="display-block blue"
          style={{ fontSize: "12px", margin: "1em 0 2em", width: "78%" }}
        >
          Join Thousands of Companies That Use Athena Every Day !
        </span>
      );
    } else if (user.accountType === "freelancer") {
      return (
        <div>
          <span
            className="display-block"
            style={{ fontSize: "12px", margin: "1em 0 2em" }}
          >
            Choose one of the following sign up methods
          </span>
          <div>
            <FacebookLogin
              appId={FACEBOOK_APP_ID}
              fields="name,email,picture"
              callback={response => facebookSignOn(response, this.props)}
              render={renderProps => (
                <button
                  onClick={renderProps.onClick}
                  className="full-rounded-button"
                  style={{ background: "#3A5999", padding: "0.8em 2em" }}
                >
                  <i
                    className="fa fa-facebook"
                    style={{ fontSize: "14px", margin: "0 1em 0 0" }}
                  ></i>
                  With Facebook
                </button>
              )}
            />
            <GoogleLogin
              clientId={GOOGLE_CLIENT_ID}
              buttonText="LOGIN WITH GOOGLE"
              onSuccess={response => googleSignOn(response, this.props)}
              onFailure={response => googleSignOn(response, this.props)}
              render={renderProps => (
                <button
                  onClick={renderProps.onClick}
                  className="full-rounded-button"
                  style={{ background: "#DA4538", padding: "0.8em 2em" }}
                >
                  <i
                    className="fa fa-google"
                    style={{ fontSize: "14px", margin: "0 1em 0 0" }}
                  ></i>
                  With Google
                </button>
              )}
            />
          </div>
          <span
            className="display-block"
            style={{ fontSize: "12px", margin: "1em 0 2em" }}
          >
            Or sign up using your email address
          </span>
        </div>
      );
    }
  };

  renderFormSection1 = () => {
    const { user } = this.props;
    if (user.accountType === "freelancer") {
      return (
        <div>
          <span className="font-weight-600 font-size-11px display-block">
            First Name
          </span>
          <input
            onChange={this.handleInputChange}
            name="firstName"
            placeholder="Enter your first name"
            className="full-rounded-input"
            style={{
              fontSize: "10px",
              padding: "1em 2em",
              margin: "1em 0 2em 0",
              borderColor: "#EBECED"
            }}
          />
          <span className="font-weight-600 font-size-11px display-block">
            Last Name
          </span>
          <input
            onChange={this.handleInputChange}
            name="lastName"
            placeholder="Enter your last name"
            className="full-rounded-input"
            style={{
              fontSize: "10px",
              padding: "1em 2em",
              margin: "1em 0 2em 0",
              borderColor: "#EBECED"
            }}
          />
        </div>
      );
    }
  };

  renderFormSection2 = () => {
    const { user } = this.props;
    if (user.accountType === "employer") {
      return (
        <div>
          <span className="font-weight-600 font-size-11px display-block">
            Company Name
          </span>
          <input
            onChange={this.handleInputChange}
            name="companyName"
            placeholder="Your company name"
            className="full-rounded-input"
            style={{
              fontSize: "10px",
              padding: "1em 2em",
              margin: "1em 0 2em 0",
              borderColor: "#EBECED"
            }}
          />
          <span className="font-weight-600 font-size-11px display-block">
            Company Industry
          </span>
          <input
            onChange={this.handleInputChange}
            name="companyIndustry"
            placeholder="Please select maximum 3 industries"
            className="full-rounded-input"
            style={{
              fontSize: "10px",
              padding: "1em 2em",
              margin: "1em 0 2em 0"
            }}
          />
        </div>
      );
    }
  };

  toggleTermsAndConditions = agreed => {
    this.setState({ agreed });
  };

  signUp = event => {
    event.preventDefault();
    const errorFields = [];
    const { emailAddress, password, passwordConfirmation, agreed } = this.state;
    const { setNotification } = this.props;

    if (!emailAddress) {
      const name = "emailAddress";
      setInputError(name, "Email required!");
      errorFields.push(name);
    }
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
    if (!isEmpty(errorFields)) {
      scrollToElement(errorFields[0]);
      return;
    }
    if (!agreed) {
      setNotification({
        message:
          "Please agree with the Privacy Policy and Terms of Use to continue"
      });
      return;
    }
    const { user, setLoading, removeSignOn } = this.props;
    const data = {
      email: emailAddress,
      password1: password,
      password2: passwordConfirmation,
      user_type: user.accountType === "employer" ? "EMP" : "FRE"
    };

    setLoading({ isLoading: true, loadingText: "Signing up..." });
    axios
      .post(`${API_URL}/auth/register/`, data)
      .then(res => {
        console.log(res);
        const {
          data: { key }
        } = res;

        setLoading({ isLoading: false });
        return key;
      })
      .then(key => {
        this.getUserDetails(key);
        removeSignOn();
      })
      .catch(error => {
        setLoading({ isLoading: false });
        showAPIErrors(error, setNotification);
      });
  };

  getUserDetails = key => {
    const url = `${API_URL}/auth/user/`;
    const headers = { Authorization: `Token ${key}` };
    const {
      setUser,
      setLoading,
      setNotification,
      createNewProfile
    } = this.props;

    axios
      .get(url, { headers })
      .then(response => {
        let newUser = { ...response.data };
        newUser.loggedIn = true;
        newUser.key = key;
        createNewProfile(newUser.user_type, newUser.id, key);
        setUser(newUser);
      })
      .catch(error => {
        setLoading({ isLoading: false });
        showAPIErrors(error, setNotification);
      });
  };

  render() {
    const { signOn } = this.props;
    const { agreed } = this.state;
    const TCClasses = `border-radio-button ${agreed ? "active" : ""}`;
    return (
      <div
        id="employer_signup"
        className="tabcontent gray-top-border"
        style={{ display: "block" }}
      >
        <div className="container" style={{ padding: "5em 0" }}>
          <table style={{ width: "95%" }}>
            <tbody>
              <tr>
                {this.renderSideImages()}
                <td className="vertical-align-top">
                  <span className="display-block" style={{ fontSize: "30px" }}>
                    {signOn}
                  </span>
                  {this.renderFormHeader()}
                  {this.renderFormSection1()}
                  <span className="font-weight-600 font-size-11px display-block">
                    Email Address
                    <sup
                      title="Required"
                      style={{ color: "red", fontSize: "1em" }}
                    >
                      *
                    </sup>
                  </span>
                  <input
                    onChange={this.handleInputChange}
                    name="emailAddress"
                    placeholder="Your email address"
                    className="full-rounded-input"
                    style={{
                      fontSize: "10px",
                      padding: "1em 2em",
                      margin: "1em 0 2em 0",
                      borderColor: "#EBECED"
                    }}
                  />
                  {this.renderFormSection2()}
                  <span className="font-weight-600 font-size-11px display-block">
                    Password
                    <sup
                      title="Required"
                      style={{ color: "red", fontSize: "1em" }}
                    >
                      *
                    </sup>
                  </span>
                  <input
                    onChange={this.handleInputChange}
                    name="password"
                    placeholder="Enter your password"
                    type="password"
                    className="full-rounded-input"
                    style={{
                      fontSize: "10px",
                      padding: "1em 2em",
                      margin: "1em 0 2em 0",
                      borderColor: "#EBECED"
                    }}
                  />
                  <span className="font-weight-600 font-size-11px display-block">
                    Confirm Password
                    <sup
                      title="Required"
                      style={{ color: "red", fontSize: "1em" }}
                    >
                      *
                    </sup>
                  </span>
                  <input
                    onChange={this.handleInputChange}
                    name="passwordConfirmation"
                    placeholder="Retype your password"
                    type="password"
                    className="full-rounded-input"
                    style={{
                      fontSize: "10px",
                      padding: "1em 2em",
                      margin: "1em 0 2em 0",
                      borderColor: "#EBECED"
                    }}
                  />
                  <div style={{ margin: "1em 0" }}>
                    <table>
                      <tbody>
                        <tr>
                          <td style={{ paddingBottom: "1em" }}>
                            <i
                              className="fa fa-shield light-grey display-inline-block"
                              style={{ margin: "0.2em 0.8em 0.2em 0" }}
                            ></i>
                          </td>
                          <td style={{ paddingBottom: "1em" }}>
                            <span
                              className="light-grey font-size-11px display-inline-block"
                              style={{ lineHeight: "1" }}
                            >
                              Your passwords at Athena are encrypted and secured
                            </span>
                          </td>
                        </tr>
                        <tr>
                          <td>
                            <span
                              className={TCClasses}
                              onClick={event =>
                                selectSingleRadioButton(
                                  event,
                                  this.toggleTermsAndConditions
                                )
                              }
                            >
                              <span></span>
                            </span>
                          </td>
                          <td>
                            <span
                              className="font-size-11px display-inline-block"
                              style={{ lineHeight: "1" }}
                            >
                              I have read & Accept Athena{" "}
                              <span className="blue">Privacy Policy</span> and{" "}
                              <span className="blue">Terms of Use</span>
                            </span>
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                  <a href="/" onClick={this.signUp}>
                    <button
                      className="full-rounded-button gradient"
                      style={{
                        margin: "1em 0 2em 0",
                        width: "100%",
                        padding: "1em"
                      }}
                    >
                      Sign Up
                    </button>
                  </a>
                  <span
                    className="font-size-11px display-inline-block"
                    style={{ lineHeight: 2 }}
                  >
                    By registering you confirm that you accept the{" "}
                    <span className="blue">Terms and Conditions</span> and{" "}
                    <span className="blue">Privacy Policy</span>
                  </span>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
        <div className="gray-top-border"></div>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  user: state.auth.user,
  signOn: state.auth.signOn
});

const mapDispatchToProps = dispatch => ({
  setUser: user => dispatch(setUser(user)),
  setSignOn: signOn => dispatch(setSignOn(signOn)),
  setNotification: notification => dispatch(setNotification(notification)),
  setLoading: loading => dispatch(setLoading(loading)),
  removeSignOn: () => dispatch(removeSignOn()),
  createNewProfile: (user_type, user_id, key) =>
    dispatch(createNewProfile(user_type, user_id, key))
});

export default connect(mapStateToProps, mapDispatchToProps)(SignupForm);
