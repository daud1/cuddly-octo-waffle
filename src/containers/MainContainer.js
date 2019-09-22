import React, { Component } from 'react';
import { connect } from "react-redux";
import toast from 'toasted-notes' 
import ACTIONS from "../redux/action";
import { isEmpty } from '../utils/helpers';
import Home from './Home';
import Loader from '../components/Loader';
import 'toasted-notes/src/styles.css';
import '../styles/global.css';
import '../styles/home.css';

class MainContainer extends Component {
    componentDidUpdate(prevProps, prevState, snapshot) {
        const { notification, clearNotification } = this.props;
        if (prevProps.notification !== notification && !isEmpty(notification)) {
            const { message, options } = notification;
            toast.notify(message, options);
            clearNotification();
        }
    }

    render() {
        return (
            <Loader children={<Home />} />
        );
    }
}

const mapStateToProps = state => ({
    notification: state.notification
});

const mapDispatchToProps = dispatch => ({
    clearNotification: () => dispatch(ACTIONS.clearNotification())
});

export default connect(mapStateToProps, mapDispatchToProps)(MainContainer);