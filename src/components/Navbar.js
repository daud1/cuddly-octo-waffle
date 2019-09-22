//eslint-disable jsx-a11y/anchor-is-valid
import React, { Component } from 'react';
import { connect } from "react-redux";
import ACTIONS from "../redux/action";
import { isLoggedIn } from '../utils/helpers';
import logo from '../images/athena_logo.png'
import logoWhite from '../images/athena_logo_long_white.png'

class Navbar extends Component {
    toggleSignOn = (event, title) => {
        event.preventDefault();
        const { setSignon, renderForms } = this.props;
        setSignon(title);
        if (renderForms) {
            renderForms(false);
        }
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
        const buttons = TITLES.map((title, index) => {
            const isSignIn = title.toLocaleLowerCase().includes('sign in');

            const styles = isSignIn ? loginSelectorPageStyles : signUpSelectorPageStyles;
            const label = isSignIn ? 'Login' : 'Sign Up';
            const classes = `navbar-button ${isSignIn ? 'plain' : 'active'}`;

            return (
                <li className="margin-left-neg-1" key={index}>
                    <a href="#/" onClick={event => this.toggleSignOn(event, title)}>
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

        if (this.checkPage('home') && side === "left") {
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
        } else if ((!isLoggedIn(user) && this.checkPage('accountSelector')) && side === "left") {
            return (
                <div className="navbar-header">
                    <a className="navbar-brand" href="/">
                        <img className="navbar-brand-img" src={logoWhite} onError={i => i.target.style.display = 'none'} alt="Logo" />
                    </a>
                </div>
            );
        } else if (this.checkPage('home') && side === "center") {
            return (
                <div className="navbar-header display-inline-block float-unset">
                    <a className="navbar-brand" href="/">
                        <img className="navbar-brand-img" src={logo} onError={i => i.target.style.display = 'none'} alt="Logo" />
                    </a>
                </div>
            );
        } else if (side === "right") {
            return (
                <ul className="nav navbar-nav navbar-right" style={rightMenuSelectorPageStyles}>
                    {this.renderRightMenuItems()}

                    {this.renderAccountButtons()}
                </ul>
            );
        }
    }

    render() {
        const { user } = this.props;
        const navClass = `navbar ${isLoggedIn(user) ? 'navbar-default' : 'navbar-transparent'}`;
        const navStyle = isLoggedIn(user) ? { background: 'transparent' } : {};
        const navContainerStyle = `container-fluid center${isLoggedIn(user) ? ' home-nav-padding' : ''}`;
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
    title: state.signon
});

const mapDispatchToProps = dispatch => ({
    setSignon: signon => dispatch(ACTIONS.setSignon(signon)),
    removeUser: () => dispatch(ACTIONS.removeUser())
});

export default connect( mapStateToProps, mapDispatchToProps )(Navbar);