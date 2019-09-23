import React from 'react';
import { connect } from "react-redux";
import axios from 'axios';
import ACTIONS from "../redux/action";
import { 
    stopPropagation, 
    getNameFromUser, 
    getTitleFromUser, 
    showAPIErrors, 
    openRoute
} from '../utils/helpers';
import sampleProfilePic from '../images/sample_profile_pic.jpg';
import sampleCoverPic from '../images/sample_cover_pic.jpg';
import { API_URL } from '../utils/constants';

function AccountDropDown(props) {
    const { user, setLoading, setNotification, removeUser } = props;

    const signOut = (event) => {
        event.preventDefault();

        setLoading({ isLoading: true, loadingText: "Signing out..." });
        const headers = {
            'content-type': 'application/json',
            'Authorization': `Token ${user.key}`
        };
        axios.get(`${API_URL}/auth/logout/`, { headers })
            .then(res => {
                const { data: { detail } } = res;
                setLoading({ isLoading: false });
                removeUser();
                setNotification({ message: detail });
            })
            .catch((error) => {
                setLoading({ isLoading: false });
                removeUser();
                showAPIErrors(error, setNotification);
            });
    }

    return (
        <span id="account-dropdown" onClick={stopPropagation}>
            <div className="notification-container">
                <div className="account-dropdown-banner">
                    <img className="account-dropdown-banner-image" src={sampleCoverPic} onError={i => i.target.style.display = 'none'} alt="Cover" />
                </div>
                <div className="center">
                    <div className="avatar" style={{ display: 'inline-block', border: '3px solid white', width: '5em', height: '5em', margin: '-2.5em auto 0.4em' }}>
                        <img className="center-cropped" style={{ width: '5em', height: '5em' }} src={sampleProfilePic} onError={i => i.target.style.display = 'none'} alt="Profile" />
                    </div>
                    <span className="font-size-12 bold blue display-block">{getNameFromUser(user)}</span>
                    <span className="font-size-11px light-grey display-block">{getTitleFromUser(user)}</span>
                    <ul className="list--side-bar-employers account left">
                        <li className="side-tablinks dropdown">
                            <i className="fa fa-user"></i>
                            Profile
                        </li>
                        <li className="side-tablinks-2 dropdown">
                            <i className="fa fa-slideshare"></i>
                            Manage Connections
                        </li>
                        <li className="side-tablinks-2 dropdown" onClick={event => openRoute(event, '/settings')}>
                            <i className="fa fa-gear light-grey"></i>
                            Settings
                        </li>
                        <li className="side-tablinks-2 dropdown">
                            <i className="fa fa-toggle-on"></i>
                            Account Type
                        </li>
                        <li className="side-tablinks-2 dropdown">
                            <i className="fa fa-support"></i>
                            Help
                        </li>
                        <li className="side-tablinks-2 dropdown">
                            <a href="/" onClick={signOut}>
                                <i className="fa fa-sign-out"></i>
                                Log out
                            </a>
                        </li>
                    </ul>
                </div>
            </div>
        </span>
    );
}

const mapStateToProps = state => ({
    user: state.user
});

const mapDispatchToProps = dispatch => ({
    removeUser: () => dispatch(ACTIONS.removeUser()),
    setLoading: loading => dispatch(ACTIONS.setLoading(loading)),
    setNotification: notification => dispatch(ACTIONS.setNotification(notification))
});

export default connect(mapStateToProps, mapDispatchToProps)(AccountDropDown);
