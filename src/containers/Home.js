import React, { Component } from 'react';
import { connect } from "react-redux";
import { isLoggedIn } from '../utils/helpers';
import Navbar from '../components/Navbar';
import HomeHeader from '../components/HomeHeader';
import HomeSection1 from '../components/HomeSection1';
import HomeSection2 from '../components/HomeSection2';
import HomeSection3 from '../components/HomeSection3';
import HomeSection4 from '../components/HomeSection4';
import HomeSection5 from '../components/HomeSection5';
import HomeSection6 from '../components/HomeSection6';
import HomeSection7 from '../components/HomeSection7';
import Footer from '../components/Footer';
import AccountSelector from '../components/AccountSelector';
import SigninForm from '../components/SigninForm';
import SignupForm from '../components/SignupForm';
import AccountDropDown from '../components/AccountDropDown';
import PasswordResetForm from '../components/PasswordResetForm';

class Home extends Component {
    constructor(props) {
        super(props);
        this.state = {
            renderForms: false
        };
    }

    setRenderForms = (render) => {
        this.setState({ renderForms: render });
    }

    renderSignOnForms = () => {
        const { signOn, user } = this.props;
        if (signOn === 'Sign In') {
            return (
                <div>
                    <SigninForm user={user} />
                    <Footer />
                </div>
            );
        } else if (signOn === 'Sign up for free') {
            return (
                <div>
                    <SignupForm />
                    <Footer />
                </div>
            );
        } else if (signOn === 'Reset Password') {
            return (
                <div>
                    <PasswordResetForm />
                    <Footer />
                </div>
            );
        }
    }

    renderNavBar = () => {
        const { renderForms } = this.state;
        const { signOn, user } = this.props;
        if (signOn && !renderForms && signOn !== "Reset Password") {
            return;
        }
        return <Navbar page={`${isLoggedIn(user) ? '' : 'home'}`} renderForms={this.setRenderForms} />;
    }

    renderHome = () => {
        const { user, signOn } = this.props;
        const { renderForms } = this.state;
        if (isLoggedIn(user)) {
            return(
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
        } else if (!isLoggedIn(user) && ((user.accountType && signOn && renderForms) || (signOn === "Reset Password"))) {
            return (this.renderSignOnForms());
        } else if (!isLoggedIn(user)) {
            return <AccountSelector renderForms={this.setRenderForms} />;
        }
    }

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
