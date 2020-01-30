import React, { Component } from 'react';
import { connect } from "react-redux";
import axios from 'axios';
import FacebookLogin from 'react-facebook-login/dist/facebook-login-render-props';
import GoogleLogin from 'react-google-login';
import ACTIONS from "../redux/action";
import {
    selectSingleRadioButton,
    validateEmail,
    setInputError,
    clearInputError,
    scrollToElement,
    isEmpty,
    showAPIErrors,
    facebookSignOn,
    googleSignOn
} from '../utils/helpers';
import { API_URL, FACEBOOK_APP_ID, GOOGLE_CLIENT_ID } from '../utils/constants';

class SigninForm extends Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    toggleSignOn = (event, signOn) => {
        event.preventDefault();
        const { setSignon } = this.props;
        setSignon(signOn);
    }

    changeAccountType = (event, accountType) => {
        event.preventDefault();
        const { setUser, user } = this.props;
        const newUser = { ...user };
        newUser.accountType = accountType;
        this.setState({ user: newUser })
        setUser(newUser);
    }

    handleInputChange = event => {
        const target = event.target;
        const value = target.value;
        const name = target.name;
        this.setState({ [name]: value });
        clearInputError(name);
        switch (name) {
            case "emailAddress":
                !validateEmail(value) ? setInputError(name, 'Invalid Email') : clearInputError(name);
                break;
            default:
                break;
        }
    }

    renderFormHeader = () => {
        const { user } = this.props;
        if (user.accountType === 'employer') {
            return (
                <span className="display-block" style={{ fontSize: '12px', margin: '1em 0 2em' }}>
                    Sign in now to Access Your Dashboard
                </span>
            );
        } else if (user.accountType === 'freelancer') {
            return (
                <div>
                    <span className="display-block" style={{ fontSize: '12px', margin: '1em 0 2em' }}>
                        Choose one of the following sign in methods
                    </span>
                    <div>
                        <FacebookLogin
                            appId={FACEBOOK_APP_ID}
                            fields="name,email,picture"
                            callback={(response) => facebookSignOn(response, this.props)}
                            render={renderProps => (
                                <button onClick={renderProps.onClick} className="full-rounded-button" style={{ background: '#3A5999', padding: '0.8em 2em', margin: '0em 0.25em 0em 0em' }}>
                                    <i className="fa fa-facebook" style={{ fontSize: '14px', margin: '0 1em 0 0' }}></i>With Facebook
                                </button>
                            )}
                        />
                        <GoogleLogin
                            clientId={GOOGLE_CLIENT_ID}
                            buttonText="LOGIN WITH GOOGLE"
                            onSuccess={(response) => googleSignOn(response, this.props)}
                            onFailure={(response) => googleSignOn(response, this.props)}
                            render={renderProps => (
                                <button onClick={renderProps.onClick} className="full-rounded-button" style={{ background: '#DA4538', padding: '0.8em 2em', margin: '0em 0em 0em 0.25em' }}>
                                    <i className="fa fa-google" style={{ fontSize: '14px', margin: '0 1em 0 0' }}></i>With Google
                                </button>
                            )}
                        />
                    </div>
                    <span className="display-block" style={{ fontSize: '12px', margin: '2em 0 2em' }}>Or sign in using your email address</span>
                </div>
            );
        }
    }

    getInputText = () => {
        const { user } = this.props;
        const inputLabels = ['Company ', 'User', 'name or Email'];
        if (user.accountType === 'employer') {
            return `${inputLabels[0]}${inputLabels[2]}`;
        } else if (user.accountType === 'freelancer') {
            return `${inputLabels[1]}${inputLabels[2]}`;
        }
    }

    signIn = (event) => {
        event.preventDefault()
        const errorFields = [];
        const {
            emailAddress,
            password
        } = this.state;

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

        if (!isEmpty(errorFields)) {
            scrollToElement(errorFields[0]);
            return;
        }

        const { user, setLoading, setNotification, setUser, removeSignon } = this.props;
        const data = {
            email: emailAddress,
            password
        }

        setLoading({ isLoading: true, loadingText: "Signing in..." });
        axios.post(`${API_URL}/auth/login/`, data)
            .then(res => {
                const { data: { key } } = res;
                const newUser = { ...user };

                setLoading({ isLoading: false });
                newUser.loggedIn = true;
                newUser.key = key;
                newUser.email = emailAddress;
                setUser(newUser);
                removeSignon();
            })
            .catch((error) => {
                setLoading({ isLoading: false });
                showAPIErrors(error, setNotification);
            });
    }

    render() {
        const { user: { accountType }, signOn, setRememberMe, rememberMe } = this.props;
        const rememberMeClasses = `border-radio-button ${rememberMe ? 'active' : ''}`;
        return (
            <div id="employer_signin" className="tabcontent gray-top-border center" style={{ display: 'block' }}>
                <div style={{ width: '23em', margin: '3em auto' }}>
                    <span className="display-block" style={{ fontSize: '30px' }}>{signOn}</span>
                    {this.renderFormHeader()}
                    <div className="left">
                        <span className="font-weight-600 font-size-11px display-block">{this.getInputText()}<sup title="Required" style={{ color: 'red', fontSize: '1em' }}>*</sup></span>
                        <input onChange={this.handleInputChange} name="emailAddress" placeholder={this.getInputText()} className="full-rounded-input" style={{ fontSize: '10px', padding: '1em 2em', margin: '1em 0 2em 0', borderColor: '#EBECED' }} />
                        <span className="font-weight-600 font-size-11px display-block">Password<sup title="Required" style={{ color: 'red', fontSize: '1em' }}>*</sup></span>
                        <input onChange={this.handleInputChange} name="password" placeholder="Password" type="password" className="full-rounded-input" style={{ fontSize: '10px', padding: '1em 2em', margin: '1em 0 2em 0', borderColor: '#EBECED' }} />
                        <div style={{ margin: '1em 0' }}>
                            <table>
                                <tbody>
                                    <tr>
                                        <td>
                                            <span className={rememberMeClasses} onClick={event => selectSingleRadioButton(event, setRememberMe)}>
                                                <span></span>
                                            </span>
                                        </td>
                                        <td>
                                            <span className="font-size-11px display-inline-block" style={{ lineHeight: 1 }}>
                                                Remember me
                                            </span>
                                            <span className="font-size-11px float-right all-links" onClick={event => this.toggleSignOn(event, 'Reset Password')}>
                                                Forgot password?
                                            </span>
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>
                    <a href="/" onClick={this.signIn}><button className="full-rounded-button gradient" style={{ margin: '1em 0 2em 0', width: '100%', padding: '1em' }}>Login</button></a>
                    <span className="font-size-11px display-inline-block" style={{ lineHeight: 2 }}>
                        Don't have an account?&nbsp;
                        <span className="blue all-links" onClick={event => this.toggleSignOn(event, 'Sign up for free')}>
                            Sign up now!
                        </span>
                    </span>
                    <span className="font-size-11px display-block" style={{ lineHeight: 2 }}>
                        Sign in as {accountType === 'freelancer' ? 'an' : 'a'}&nbsp;
                        <span className="blue all-links" onClick={event => this.changeAccountType(event, `${accountType === 'freelancer' ? 'employer' : 'freelancer'}`)}>
                            {`${accountType === 'freelancer' ? 'Employer' : 'Freelancer'}!`}
                        </span>
                    </span>
                </div>
                <div className="gray-top-border"></div>
            </div>
        );
    }
}

const mapStateToProps = state => ({
    user: state.user,
    signOn: state.signOn,
    rememberMe: state.rememberMe
});

const mapDispatchToProps = dispatch => ({
    setUser: user => dispatch(ACTIONS.setUser(user)),
    setSignon: signOn => dispatch(ACTIONS.setSignon(signOn)),
    setLoading: loading => dispatch(ACTIONS.setLoading(loading)),
    setNotification: notification => dispatch(ACTIONS.setNotification(notification)),
    removeSignon: () => dispatch(ACTIONS.removeSignon()),
    setRememberMe: rememberMe => dispatch(ACTIONS.setRememberMe(rememberMe)),
});

export default connect(mapStateToProps, mapDispatchToProps)(SigninForm);
