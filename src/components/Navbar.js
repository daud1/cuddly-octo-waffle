//eslint-disable jsx-a11y/anchor-is-valid
import React, { Component } from 'react';
import { connect } from "react-redux";
import ACTIONS from "../redux/action";
import { 
    isLoggedIn, 
    stopPropagation, 
    showOverlay, 
    dismissOverlay, 
    openRoute,
    getUserImage
} from '../utils/helpers';
import logo from '../images/athena_logo.png';
import binderIcon from '../images/binder_icon.png';
import logoWhite from '../images/athena_logo_long_white.png';

class Navbar extends Component {
    toggleSignOn = (event, signOn) => {
        event.preventDefault();
        const { setSignon, renderForms } = this.props;
        setSignon(signOn);
        if (renderForms) {
            renderForms(false);
        }
    }

    clearSignOn = (event) => {
        event.preventDefault()
        const { removeSignon } = this.props;
        removeSignon();
    }

    checkPage = (pageName) => {
        const { page } = this.props;
        return page === pageName;
    }

    renderRightMenuItems = () => {
        if (this.checkPage('accountSelector')) {
            return;
        }
        const LABELS = ['JOB LIST', 'FREELANCERS', 'EMPLOYERS'];
        const menuItems = LABELS.map((label, index) => {
            return (
                <li key={index}>
                    <a className="browse-tablinks" href="/">{label}</a>
                </li>
            );
        });
        return menuItems;
    }

    renderAccountButtons = () => {
        const { user } = this.props;
        if (isLoggedIn(user)) {
            return;
        }
        const loginSelectorPageStyles = this.checkPage('accountSelector') ? { color: 'white' } : {};
        const signUpSelectorPageStyles = this.checkPage('accountSelector') ? { color: 'black', backgroundColor: 'white' } : {};
        const TITLES = ['Sign In', 'Sign up for free'];
        const buttons = TITLES.map((signOn, index) => {
            const isSignIn = signOn.toLocaleLowerCase().includes('sign in');

            const styles = isSignIn ? loginSelectorPageStyles : signUpSelectorPageStyles;
            const label = isSignIn ? 'Login' : 'Sign Up';
            const classes = `navbar-button ${isSignIn ? 'plain' : 'active'}`;

            return (
                <li className="margin-left-neg-1" key={index}>
                    <a href="/" onClick={event => this.toggleSignOn(event, signOn)}>
                        <span className={classes} style={styles}>{label}</span>
                    </a>
                </li>
            );
        });
        return buttons;
    }

    renderNavMenu = (side) => {
        const { user } = this.props;
        const rightMenuSelectorPageStyles = this.checkPage('accountSelector') ? { marginRight: '1em' } : {};

        if (!isLoggedIn(user) && this.checkPage('home') && side === "left") {
            return (
                <ul className="nav navbar-nav">
                    <li>
                        <a id="home-link" className="browse-tablinks active" href="/">HOME</a>
                    </li>
                    <li>
                        <a id="second-home-link" className="browse-tablinks" href="/">HOME ALT</a>
                    </li>
                    <li>
                        <a className="browse-tablinks" href="/">ABOUT US</a>
                    </li>
                    <li>
                        <a className="browse-tablinks" href="/">SERVICES</a>
                    </li>
                    <li>
                        <a className="browse-tablinks" href="/blog" >BLOG</a>
                    </li>
                    <li>
                        <a className="browse-tablinks" href="/">CONTACT</a>
                    </li>
                </ul>
            );
        } else if (!isLoggedIn(user) && this.checkPage('accountSelector') && side === "left") {
            return (
                <div className="navbar-header">
                    <a className="navbar-brand" href="/" onClick={event => {this.clearSignOn(event); openRoute(event, '/');}}>
                        <img className="navbar-brand-img" src={logoWhite} onError={i => i.target.style.display = 'none'} alt="Logo" />
                    </a>
                </div>
            );
        } else if ((this.checkPage('home') && side === "center") || (isLoggedIn(user) && side === "left")) {
            return (
                <div className={`navbar-header${isLoggedIn(user) ? '' : ' display-inline-block float-unset'}`}>
                    <a className={`navbar-brand${isLoggedIn(user) ? ' all-links' : ''}`} href="/" onClick={event => {this.clearSignOn(event); openRoute(event, '/');}} >
                        <img className="navbar-brand-img" src={logo} onError={i => i.target.style.display = 'none'} alt="Logo" />
                    </a>
                </div>
            );
        } else if (isLoggedIn(user) && side === "center") {
            return (
                <ul className="nav navbar-nav">
                    <li className="with-separator">
                        <a href="/" className="main-tablinks">
                            <img className="navbar-nav-img" id="browse-jobs-link-image" src={binderIcon} onError={i => i.target.style.display = 'none'} alt="Logo" />BROWSE JOBS
                    </a>
                    </li>
                    <li>
                        <a href="/" className="main-tablinks" onClick={event => {stopPropagation(event); showOverlay('freelancers-dropdown', event, 'main-tablinks'); dismissOverlay(null, ['account-dropdown', 'notification-tray', 'message-dropdown', 'job-feed-dropdown', 'connections-dropdown']);}}>FREELANCERS</a>
                    </li>
                    <li>
                        <a href="/" className="main-tablinks" >EMPLOYERS</a>
                    </li>
                    <li>
                        <a href="/" className="main-tablinks" onClick={event => {stopPropagation(event); showOverlay('connections-dropdown', event, 'main-tablinks'); dismissOverlay(null, ['account-dropdown', 'notification-tray', 'message-dropdown', 'job-feed-dropdown', 'freelancers-dropdown']);}}>CONNECTIONS</a>
                    </li>
                    <li>
                        <a href="/">BLOG</a>
                    </li>
                </ul>
            );
        } else if (!isLoggedIn(user) && side === "right") {
            return (
                <ul className="nav navbar-nav navbar-right" style={rightMenuSelectorPageStyles}>
                    {this.renderRightMenuItems()}

                    {this.renderAccountButtons()}
                </ul>
            );
        } else if (isLoggedIn(user) && side === "right") {
            return (
                <ul className="nav navbar-nav navbar-right">
                <li>
                    <a href="/">
                        <span className="glyphicon glyphicon-search navbar-icons"></span>
                    </a>
                </li>
                <li className="with-separator before-separator">
                    <a href="/" className="main-tab-buttons" >
                        <span className="navbar-button">Post a job</span>
                    </a>
                </li>
                <li className="after-separator">
                    <a href="/" onClick={event => {stopPropagation(event); showOverlay('job-feed-dropdown', event); dismissOverlay(null, ['account-dropdown', 'notification-tray', 'message-dropdown', 'freelancers-dropdown', 'connections-dropdown']);}} className="all-links">
                        <i className="fa fa-bolt navbar-icons"></i>
                    </a>
                </li>
                <li>
                    <a href="/" onClick={event => {stopPropagation(event); showOverlay('message-dropdown', event); dismissOverlay(null, ['account-dropdown', 'notification-tray', 'job-feed-dropdown', 'freelancers-dropdown', 'connections-dropdown']);}} className="all-links">
                        <i className="fa fa-wechat navbar-icons"></i>
                    </a>
                </li>
                <li>
                    <a href="/" onClick={event => {stopPropagation(event); showOverlay('notification-tray', event); dismissOverlay(null, ['account-dropdown', 'job-feed-dropdown', 'message-dropdown', 'freelancers-dropdown', 'connections-dropdown']);}} className="badge" data-badge="99">
                        <i className="fa fa-bell navbar-icons"></i>
                    </a>
                </li>
                <li>
                    <a href="/" onClick={event => {stopPropagation(event); showOverlay('account-dropdown', event); dismissOverlay(null, ['notification-tray', 'job-feed-dropdown', 'message-dropdown', 'freelancers-dropdown', 'connections-dropdown']);}} className="badge-no-data all-links" data-badge="">
                        <div className="avatar">
                            <img className="center-cropped" src={getUserImage(user)} onError={i => i.target.style.display = 'none'} alt="Logo" />
                        </div>
                    </a>
                </li>
            </ul>
            );
        }
    }

    render() {
        const { user } = this.props;
        const navClass = `navbar ${isLoggedIn(user) ? 'navbar-default' : 'navbar-transparent'}`;
        const navStyle = isLoggedIn(user) ? { background: 'transparent' } : {};
        const navContainerStyle = `container-fluid${isLoggedIn(user) ? '' : ' center'}`;
        return (
            <nav className={navClass} style={navStyle}>
                <div className={navContainerStyle}>
                    {this.renderNavMenu('left')}

                    {this.renderNavMenu('center')}

                    {this.renderNavMenu('right')}
                </div>
            </nav>
        );
    }
}

const mapStateToProps = state => ({
    user: state.user,
    signOn: state.signOn
});

const mapDispatchToProps = dispatch => ({
    setSignon: signOn => dispatch(ACTIONS.setSignon(signOn)),
    removeUser: () => dispatch(ACTIONS.removeUser()),
    removeSignon: () => dispatch(ACTIONS.removeSignon())
});

export default connect(mapStateToProps, mapDispatchToProps)(Navbar);