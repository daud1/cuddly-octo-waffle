import React, { Component } from "react";

import AccountDropDown from "../../auth/components/AccountDropDown";
import AccountSelector from "../../auth/components/AccountSelector";
import Footer from "../../common/components/Footer";
import HomeHeader from "./HomeHeader";
import HomeSection1 from "./HomeSection1";
import HomeSection2 from "./HomeSection2";
import HomeSection3 from "./HomeSection3";
import HomeSection4 from "./HomeSection4";
import HomeSection5 from "./HomeSection5";
import HomeSection6 from "./HomeSection6";
import HomeSection7 from "./HomeSection7";
import Navbar from "../../common/components/Navbar";
import PasswordResetForm from "../../auth/components/PasswordResetForm";
import SigninForm from "../../auth/components/SigninForm";
import SignupForm from "../../auth/components/SignupForm";
import { connect } from "react-redux";
import { isLoggedIn } from "../../common/utils/helpers";

class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      renderForms: false
    };
  }

  setRenderForms = render => {
    this.setState({ renderForms: render });
  };

  renderSignOnForms = () => {
    const { signOn, user } = this.props;
    if (signOn === "Sign In") {
      return (
        <div>
          <SigninForm user={user} />
          <Footer />
        </div>
      );
    } else if (signOn === "Sign up for free") {
      return (
        <div>
          <SignupForm />
          <Footer />
        </div>
      );
    } else if (signOn === "Reset Password") {
      return (
        <div>
          <PasswordResetForm />
          <Footer />
        </div>
      );
    }
  };

  renderNavBar = () => {
    const { renderForms } = this.state;
    const { signOn, user } = this.props;
    if (signOn && !renderForms && signOn !== "Reset Password") {
      return;
    }
    return (
      <Navbar
        page={`${isLoggedIn(user) ? "" : "home"}`}
        renderForms={this.setRenderForms}
      />
    );
  };

  renderHome = () => {
    const { user, signOn } = this.props;
    const { renderForms } = this.state;
    if (isLoggedIn(user)) {
      return (
        <div>
          <AccountDropDown />
        </div>
      );
    } else if (!isLoggedIn(user) && !signOn) {
      return (
        <div className="home-banner-div">
          <HomeHeader />
          <HomeSection1 />
          <HomeSection2 />
          <HomeSection3 />
          <HomeSection4 />
          <HomeSection5 />
          <HomeSection6 />
          <HomeSection7 />
          <Footer />
        </div>
      );
    } else if (
      !isLoggedIn(user) &&
      ((user.accountType && signOn && renderForms) ||
        signOn === "Reset Password")
    ) {
      return this.renderSignOnForms();
    } else if (!isLoggedIn(user)) {
      return <AccountSelector renderForms={this.setRenderForms} />;
    }
  };

  render() {
    return (
      <div>
        {this.renderNavBar()}
        {this.renderHome()}
      </div>
    );
  }
}

const mapStateToProps = state => ({
  user: state.user,
  signOn: state.signOn
});

export default connect(mapStateToProps)(Home);
