import React, { Component } from 'react';
import { connect } from "react-redux";
import axios from 'axios';
import ACTIONS from "../../redux/action";
import {
    validateEmail,
    setInputError,
    clearInputError,
    scrollToElement,
    isEmpty,
    showAPIErrors
} from '../../utils/helpers';
import { API_URL } from '../../utils/constants';

class PasswordResetForm extends Component {
    constructor(props) {
        super(props);
        this.state = {
            emailSent: false
        };
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

    renderResetForm = () => {
        const { emailSent, emailAddress } = this.state;
        const { signOn } = this.props;

        if (emailSent) {
            return (
                <div style={{ width: '23em', margin: '3em auto', minHeight: '19em', display: 'table' }}>
                    <div style={{ display: 'table-cell', verticalAlign: 'middle' }}>
                        <span className="display-block" style={{ fontSize: '30px' }}>Email Sent!</span>
                        <span className="display-block" style={{ fontSize: '12px', margin: '1em 0 2em' }}>
                            {`Instructions sent to ${emailAddress}`}
                        </span>
                    </div>
                </div>
            );
        }
        return (
            <div style={{ width: '23em', margin: '3em auto' }}>
                <span className="display-block" style={{ fontSize: '30px' }}>{signOn}</span>
                <span className="display-block" style={{ fontSize: '12px', margin: '1em 0 2em' }}>
                    Set email address to receive instructions
                </span>
                <div className="left">
                    <span className="font-weight-600 font-size-11px display-block">Email Address<sup title="Required" style={{ color: 'red', fontSize: '1em' }}>*</sup></span>
                    <input onChange={this.handleInputChange} name="emailAddress" placeholder="Email Address" className="full-rounded-input" style={{ fontSize: '10px', padding: '1em 2em', margin: '1em 0 2em 0', borderColor: '#EBECED' }} />
                </div>
                <a href="/" onClick={this.sendEmail}><button className="full-rounded-button gradient" style={{ margin: '1em 0 2em 0', width: '100%', padding: '1em' }}>Submit</button></a>
            </div>
        );
    }

    sendEmail = (event) => {
        event.preventDefault()
        const errorFields = [];
        const {
            emailAddress
        } = this.state;

        if (!emailAddress) {
            const name = "emailAddress";
            setInputError(name, "Email required!");
            errorFields.push(name);
        }

        if (!isEmpty(errorFields)) {
            scrollToElement(errorFields[0]);
            return;
        }

        const { setLoading, setNotification, user, setUser } = this.props;
        const data = { email: emailAddress };

        setLoading({ isLoading: true, loadingText: "Requesting instructions..." });
        axios.post(`${API_URL}/auth/reset_password/`, data)
            .then(res => {
                setLoading({ isLoading: false });
                if (!res.data) {
                    setNotification({ message: 'Data missing' });
                }
                const { data } = res;
                if (data.status === "OK") {
                    const newUser = {...user}; 
                    setNotification({ message: `Instructions sent to ${emailAddress}` });
                    this.setState({ emailSent: true, emailAddress });
                    newUser.email = emailAddress;
                    setUser(newUser);
                }
            })
            .catch((error) => {
                setLoading({ isLoading: false });
                showAPIErrors(error, setNotification);
            });
    }

    render() {
        return (
            <div id="employer_signin" className="tabcontent gray-top-border center" style={{ display: 'block' }}>
                {this.renderResetForm()}
                <div className="gray-top-border"></div>
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
    setNotification: notification => dispatch(ACTIONS.setNotification(notification)),
    removeSignon: () => dispatch(ACTIONS.removeSignon())
});

export default connect(mapStateToProps, mapDispatchToProps)(PasswordResetForm);
