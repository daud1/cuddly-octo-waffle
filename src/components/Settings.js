import React, { Component } from 'react';
import { connect } from "react-redux";
import axios from 'axios';
import ACTIONS from "../redux/action";
import { 
    openRoute, 
    setInputError,
    clearInputError,
    inputHasValue,
    comparePasswords,
    isEmpty,
    scrollToElement,
    showAPIErrors
} from '../utils/helpers';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import AccountDropDown from '../components/AccountDropDown';
import sampleProfilePic from '../images/sample_profile_pic.jpg';
import { API_URL } from '../utils/constants';

class Settings extends Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    passwordMismatch = () => {
        const message = "Passwords don't match!";
        setInputError("passwordConfirmation", message);
        setInputError("password", message);
    }

    passwordMatch = () => {
        clearInputError('passwordConfirmation');
        clearInputError('password');
    }

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
    }

    getDataFromState = (settingName) => {
        const errorFields = [];
        const {
            password,
            passwordConfirmation,
        } = this.state;

        if (!password && settingName === "Password") {
            const name = "password";
            setInputError(name, "Password required!");
            errorFields.push(name);
        }
        if (!passwordConfirmation && settingName === "Password") {
            const name = "passwordConfirmation";
            setInputError(name, "Password confirmation required!");
            errorFields.push(name);
        }
        if (!isEmpty(errorFields)) {
            scrollToElement(errorFields[0]);
            return;
        }

        switch (settingName) {
            case "Password":
                return {  
                    new_password1: password,
                    new_password2: passwordConfirmation
                };
            default:
                break;
        }
    }

    submitForm = (event, settingName, url, data, headers) => {
        event.preventDefault();
        const { setLoading, setNotification, removeUser } = this.props;

        if (!data) {
            setNotification({ message: "Input values missing." });
            return;
        }
        setLoading({ isLoading: true, loadingText: "Changing password..." });  
        axios.post(url, data, { headers })
            .then(res => {
                const { data: { detail } } = res;
                setLoading({ isLoading: false });
                setNotification({ message: detail });
                if (settingName === "Password") {
                    setNotification({ message: 'Password changed successfully!' });
                    setTimeout(function(){ removeUser(); }, 3000);
                }
            })
            .catch((error) => {
                setLoading({ isLoading: false });
                showAPIErrors(error, setNotification);
            });
    }

    renderSettingsPage = (name) => {
        const { user } = this.props;
        if (name === 'Password') {
            return (
                <div className="profile-info-item last" style={{ display: 'block', padding: '0 3em 3em 0px' }}>
                    <table>
                        <tbody>
                            <tr>
                                <td style={{ padding: '0 2em 0 0', width: '52%' }}>
                                    <span className="font-weight-600 font-size-11px display-block">New Password</span>
                                    <input onChange={this.handleInputChange} name="password" type="password" className="full-rounded-input" style={{ fontSize: '10px', padding: '0.5em 2em', margin: '0.5em 0', borderColor: '#EBECED' }} />
                                </td>
                                <td>
                                    <span className="font-weight-600 font-size-11px display-block">Confirm New Password</span>
                                    <input onChange={this.handleInputChange} name="passwordConfirmation" type="password" className="full-rounded-input" style={{ fontSize: '10px', padding: '0.5em 2em', margin: '0.5em 0', borderColor: '#EBECED' }} />
                                </td>
                            </tr>
                        </tbody>
                    </table>
                    <div className="margin-top-1em center">
                        <span className="btn--rounded--tiny plain button-shadow" onClick={event => openRoute(event, '/')}>Cancel</span>
                        <span className="btn--rounded--tiny" style={{ margin: '1em 0 0 0' }} onClick={event => this.submitForm(
                            event,
                            name, 
                            `${API_URL}/auth/password/change/`, 
                            this.getDataFromState(name),
                            {
                                'content-type': 'application/json',
                                'Authorization': `Token ${user.key}`
                            }
                        )}>Save</span>
                    </div>
                </div>
            );
        } else {
            return (
                <div className="profile-info-item last" style={{ display: 'block', padding: '0 3em 3em 0px' }}>
                    <table>
                        <tbody>
                            <tr>
                                <td style={{ padding: '0 2em 0 0' }}>
                                    <span className="font-weight-600 font-size-11px display-block">First Name</span>
                                    <input value="Jont" className="full-rounded-input" style={{ fontSize: '10px', padding: '0.5em 2em', margin: '0.5em 0', borderColor: '#EBECED' }} />
                                </td>
                                <td>
                                    <span className="font-weight-600 font-size-11px display-block">Last Name</span>
                                    <input value="Hennry" className="full-rounded-input" style={{ fontSize: '10px', padding: '0.5em 2em', margin: '0.5em 0', borderColor: '#EBECED' }} />
                                </td>
                            </tr>
                            <tr>
                                <td style={{ padding: '0 2em 0 0' }}>
                                    <span className="font-weight-600 font-size-11px display-block margin-top-1em">Email</span>
                                    <input value="jonthennry@gmail.com" className="full-rounded-input" style={{ fontSize: '10px', padding: '0.5em 2em', margin: '0.5em 0', borderColor: '#EBECED' }} />
                                </td>
                                <td>
                                    <span className="font-weight-600 font-size-11px display-block margin-top-1em">Phone Number</span>
                                    <input value="VN - (084)904968368" className="full-rounded-input" style={{ fontSize: '10px', padding: '0.5em 2em', margin: '0.5em 0', borderColor: '#EBECED' }} />
                                </td>
                            </tr>
                        </tbody>
                    </table>
                    <span className="font-weight-600 font-size-11px display-block margin-top-1em">Address</span>
                    <input className="full-rounded-input" style={{ fontSize: '10px', padding: '0.5em 2em', margin: '0.5em 0', borderColor: '#EBECED' }} />
                    <table>
                        <tbody>
                            <tr>
                                <td style={{ padding: '0 2em 0 0' }}>
                                    <span className="font-weight-600 font-size-11px display-block margin-top-1em">City/Province</span>
                                    <input value="Hanoi" className="full-rounded-input" style={{ fontSize: '10px', padding: '0.5em 2em', margin: '0.5em 0', borderColor: '#EBECED' }} />
                                </td>
                                <td>
                                    <span className="font-weight-600 font-size-11px display-block margin-top-1em">Country</span>
                                    <input value="Vietnam" className="full-rounded-input" style={{ fontSize: '10px', padding: '0.5em 2em', margin: '0.5em 0', borderColor: '#EBECED' }} />
                                </td>
                            </tr>
                        </tbody>
                    </table>
                    <span className="font-weight-600 font-size-11px display-block margin-top-1em">Company</span>
                    <input value="HKD Design" className="full-rounded-input" style={{ fontSize: '10px', padding: '0.5em 2em', margin: '0.5em 0', borderColor: '#EBECED' }} />

                    <table style={{ width: '50%' }}>
                        <tbody>
                            <tr>
                                <td className="vertical-align-top">
                                    <span className="font-weight-600 font-size-11px display-inline-block margin-top-1em">Photo</span>
                                </td>
                                <td className="vertical-align-top">
                                    <div className="avatar" style={{ display: 'inline-block', width: '4.5em', height: '4.5em', margin: '1em 0' }}>
                                        <img className="center-cropped" style={{ width: '4.5em', height: '4.5em' }} src={sampleProfilePic} onError={i => i.target.style.display = 'none'} alt="Logo" />
                                    </div>
                                </td>
                                <td>
                                    <span className="btn--rounded--tiny plain grey-box-shadow font-size-11px" style={{ color: 'black', padding: '0.7em 2em' }}>
                                        <i className="fa fa-camera-retro light-grey font-size-14px margin-right-0-point-2-em"></i>
                                        Change Photo
                                                                </span>
                                </td>
                            </tr>
                        </tbody>
                    </table>

                    <span className="section-titles font-weight-300" style={{ margin: '2em 0 1em' }}>Languange Settings</span>
                    <table style={{ margin: '0 0 3em' }}>
                        <tbody>
                            <tr>
                                <td style={{ width: '50%' }}>
                                    <span className="font-weight-600 font-size-11px display-block margin-top-1em margin-bottom-1em">I want to browse the website in:</span>
                                    <span className="wrapper-rounded-input" style={{ padding: '0em 1em 0.3em' }}>
                                        <select className="light-grey drop-down font-size-10px width-100-percent-minus-6em">
                                            <option>English</option>
                                            <option>Spanish</option>
                                            <option>French</option>
                                            <option>Luganda</option>
                                        </select>
                                    </span>
                                </td>
                                <td style={{ width: '50%' }}>
                                    <span className="font-weight-600 font-size-11px display-block margin-top-1em margin-bottom-1em">I want to browse the projects in the following languages:</span>
                                    <span className="wrapper-rounded-input" style={{ padding: '0em 1em 0.3em' }}>
                                        <select className="light-grey drop-down font-size-10px width-100-percent-minus-6em">
                                            <option>Add Languages</option>
                                        </select>
                                    </span>
                                </td>
                            </tr>
                        </tbody>
                    </table>

                    <div className="margin-top-1em center">
                        <span className="btn--rounded--tiny plain button-shadow" onClick={event => openRoute(event, '/')}>Cancel</span>
                        <span className="btn--rounded--tiny" style={{ margin: '1em 0 0 0' }} onClick={event => this.submitForm(event, 'edit-education-section', 'show-education-section')}>Save</span>
                    </div>
                </div>
            );
        }

    }

    renderSettings = (name) => {
        // const { user, signOn } = this.props;
        return (
            <div id="settings" className="main-tabcontent gray-top-border" style={{ display: 'block' }} >
                <div className="profile-info-area container__div--dashbord">
                    <div className="container">
                        <table>
                            <tbody>
                                <tr>
                                    <td className="profile-info-left vertical-align-top">
                                        <div className="profile-info-item last">
                                            <span className="section-titles font-weight-300">Settings / <span className="blue">{name}</span></span>
                                            {this.renderSettingsPage(name)}
                                        </div>
                                    </td>
                                    <td className="profile-info-right">
                                        <div className="gray-bottom-border wrapper-profile-right--bordered">
                                            <p className="profile-info-right-titles">Settings</p>
                                            <ul className="list--side-bar-employers">
                                                <li >General Information</li>
                                                <li className="active">Password</li>
                                                <li>Messaging</li>
                                                <li>Notifications</li>
                                                <li>Edit Profile</li>
                                                <li>Social Networks</li>
                                                <li>Account Type</li>
                                                <li>Privacy</li>
                                            </ul>
                                        </div>
                                        <div className="wrapper-profile-right--bordered connections">
                                            <p className="profile-info-right-titles">Connections</p>
                                            <div className="profile-user-info connections-summary">
                                                <table>
                                                    <tbody>
                                                        <tr>
                                                            <td>
                                                                <div className="connections-summary-inner images-div">
                                                                    <span className="connection-images-outer first">
                                                                        <div className="connection-images-inner">
                                                                            <img src={sampleProfilePic} onError={i => i.target.style.display = 'none'} alt="Logo" />
                                                                        </div>
                                                                    </span>
                                                                    <span className="connection-images-outer">
                                                                        <div className="connection-images-inner">
                                                                            <img src={sampleProfilePic} onError={i => i.target.style.display = 'none'} alt="Logo" />
                                                                        </div>
                                                                    </span>
                                                                    <span className="connection-images-outer">
                                                                        <div className="connection-images-inner">
                                                                            <img src={sampleProfilePic} onError={i => i.target.style.display = 'none'} alt="Logo" />
                                                                        </div>
                                                                    </span>
                                                                    <span className="connection-images-outer">
                                                                        <div className="connection-images-inner">
                                                                            <img src={''} onError={i => i.target.style.display = 'none'} alt="Logo" />
                                                                        </div>
                                                                    </span>
                                                                </div>
                                                            </td>
                                                            <td>
                                                                <div className="connections-summary-inner light-grey font-size-12">
                                                                    <span className="display-block">163 Connections</span>
                                                                    <span className="display-block">290 Followers</span>
                                                                    <span className="display-block">Following 36</span>
                                                                </div>
                                                            </td>
                                                        </tr>
                                                    </tbody>
                                                </table>
                                            </div>
                                            <div className="light-grey font-size-10px">To see more people</div>
                                            <div className="margin-top-and-bottom-2em">
                                                <a href="/">
                                                    <span className="btn--rounded--tiny">Add Connections</span>
                                                </a>
                                            </div>
                                        </div>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        );
    }

    render() {
        return (
            <div>
                <Navbar />
                <AccountDropDown />
                {this.renderSettings('Password')}
                <Footer />
            </div>
        );
    }
}

const mapStateToProps = state => ({
    user: state.user,
});

const mapDispatchToProps = dispatch => ({
    setLoading: loading => dispatch(ACTIONS.setLoading(loading)),
    setNotification: notification => dispatch(ACTIONS.setNotification(notification)),
    removeUser: () => dispatch(ACTIONS.removeUser())
});

export default connect(mapStateToProps, mapDispatchToProps)(Settings);
