import React, { Component } from "react";

import { connect } from "react-redux";
import { selectRadioButton } from "../../shared/utils/helpers";
import { setUser } from "../reducers";

class AccountToggle extends Component {
  constructor(props) {
    super(props);
    this.state = {
      user: {},
    };
  }

  componentDidMount() {
    const { user, setUser } = this.props;
    if (!user.user_type) {
      let newUser = { ...user };
      newUser.user_type = "EMP";
      this.setState({ user: newUser });
      setUser(newUser);
    } else {
      this.setState({ user });
    }
  }

  changeAccountType = (event, user_type) => {
    const { setUser, user } = this.props;
    const newUser = { ...user };
    newUser.user_type = user_type;
    this.setState({ user: newUser });
    setUser(newUser);
    selectRadioButton(event, "sign-up-radio-buttons", user_type);
  };

  next = event => {
    const { proceed, user } = this.props;
    event.preventDefault();
    if (user.user_type) {
      proceed();
    } else {
    }
  };

  render() {
    const { user } = this.state;
    const { signOn } = this.props;
    const employerRadioClasses = `radio-button sign-up-radio-buttons ${
      user.user_type === "EMP" ? "active" : ""
    }`;
    const freelancerRadioClasses = `radio-button sign-up-radio-buttons ${
      user.user_type === "FRE" ? "active" : ""
    }`;

    return (
      <div
        style={{ position: "absolute", top: 0, width: "100%", height: "100%" }}
        className="display-flex flex-direction-column justify-content-center center"
      >
        <div
          className="angled-gradient"
          style={{
            color: "white",
            width: "30%",
            padding: "2em",
            borderRadius: "0.5em",
            margin: "auto",
          }}
        >
          <span className="center display-block" style={{ fontSize: "34px" }}>
            {signOn}
          </span>
          <span
            className="center display-block font-weight-300"
            style={{ fontSize: "18px", padding: "0.2em 4em 1em" }}
          >
            Join the millions of people using Athena.
          </span>
          <span
            className="center display-block font-weight-300"
            style={{ fontSize: "14px", margin: "0 0 2em 0" }}
          >
            I want to
          </span>
          <table style={{ color: "white" }}>
            <tbody>
              <tr>
                <td className="vertical-align-top" style={{ padding: "0 0 1em 0" }}>
                  <span
                    id="employer_signin-radio-btn"
                    className={employerRadioClasses}
                    onClick={event => this.changeAccountType(event, "EMP")}
                  ></span>
                </td>
                <td
                  className="vertical-align-top"
                  style={{ padding: "0 0 1em 0", textAlign: "left" }}
                >
                  <span
                    className="display-block font-weight-300"
                    style={{ fontSize: "15px", margin: "0 0 0.5em 1em" }}
                  >
                    Employers Account
                  </span>
                  <span
                    className="display-block font-weight-300"
                    style={{ fontSize: "12px", margin: "0 0 1em 1em" }}
                  >
                    Consectetur adipiscing elit. Ut accumsan quam in diam porta, quis
                    hendrerit urna eleifend.
                  </span>
                </td>
              </tr>
              <tr>
                <td className="vertical-align-top" style={{ padding: "0 0 1em 0" }}>
                  <span
                    id="freelancer_signin-radio-btn"
                    className={freelancerRadioClasses}
                    onClick={event => this.changeAccountType(event, "FRE")}
                  ></span>
                </td>
                <td
                  className="vertical-align-top"
                  style={{ padding: "0 0 1em 0", textAlign: "left" }}
                >
                  <span
                    className="display-block font-weight-300"
                    style={{ fontSize: "15px", margin: "0 0 0.5em 1em" }}
                  >
                    Freelancer Account
                  </span>
                  <span
                    className="display-block font-weight-300"
                    style={{ fontSize: "12px", margin: "0 0 0.5em 1em" }}
                  >
                    Auis hendrerit urna eleifend. Cras eget velit non leo malesuada
                    ullamcorper. Phasellus facilisis et dui id maximus.
                  </span>
                </td>
              </tr>
            </tbody>
          </table>
          <a href="/" onClick={event => this.next(event)}>
            <span
              className="navbar-button active font-weight-300 font-size-12 display-block"
              style={{
                backgroundColor: "#242527",
                padding: "0.8em 5em",
                margin: "2em 9em",
              }}
            >
              Next
            </span>
          </a>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  user: state.auth.user,
  signOn: state.auth.signOn,
});

const mapDispatchToProps = dispatch => ({
  setUser: user => dispatch(setUser(user)),
});

export default connect(mapStateToProps, mapDispatchToProps)(AccountToggle);
