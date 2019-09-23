import React, { Component } from 'react';
import { connect } from "react-redux";
import axios from 'axios';
import ACTIONS from "../redux/action";
import {
    validateEmail,
    setInputError,
    clearInputError,
    scrollToElement,
    isEmpty,
    showAPIErrors
} from '../utils/helpers';
import { API_URL } from '../utils/constants';

class PasswordResetForm extends Component {
    constructor(props) {
        super(props);
        this.state = {};
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

    signIn = (event) => {
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

        const { setLoading, setNotification } = this.props;
        const data = { email: emailAddress };

        setLoading({ isLoading: true, loadingText: "Requesting instructions..." });
        axios.post(`${API_URL}/auth/password/reset/`, data)
            .then(res => {
                const { data } = res;
                console.log("RESPONSE DATA ------> ", data);
            })
            .catch((error) => {
                setLoading({ isLoading: false });
                showAPIErrors(error, setNotification);
            });
    }

    render() {
        const { signOn } = this.props;
        return (
            <div id="employer_signin" className="tabcontent gray-top-border center" style={{ display: 'block' }}>
                <div style={{ width: '23em', margin: '3em auto' }}>
                    <span className="display-block" style={{ fontSize: '30px' }}>{signOn}</span>
                    <span className="display-block" style={{ fontSize: '12px', margin: '1em 0 2em' }}>
                        Set email address to receive instructions
                    </span>
                    <div className="left">
                        <span className="font-weight-600 font-size-11px display-block">Email Address<sup title="Required" style={{ color: 'red', fontSize: '1em' }}>*</sup></span>
                        <input onChange={this.handleInputChange} name="emailAddress" placeholder="Email Address" className="full-rounded-input" style={{ fontSize: '10px', padding: '1em 2em', margin: '1em 0 2em 0', borderColor: '#EBECED' }} />    
                    </div>
                    <a href="/" onClick={this.signIn}><button className="full-rounded-button gradient" style={{ margin: '1em 0 2em 0', width: '100%', padding: '1em' }}>Submit</button></a> 
                </div>
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
