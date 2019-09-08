//eslint-disable jsx-a11y/anchor-is-valid
import React, { Component } from 'react';
import { openPage } from '../utils/helpers';
import logo from '../images/athena_logo.png'

class Navbar extends Component {
    constructor(props) {
        super(props);
        this.state = { user: {} };
    }

    render() {
        return (
            <nav className="navbar navbar-default" style={{background: 'transparent'}}>
                <div className="container-fluid center home-nav-padding">
                    <ul className="nav navbar-nav">
                        <li>
                            <a id="home-link" onClick={(event) => openPage(event, 'home', 'browse-tablinks', 'tabcontent')} className="browse-tablinks active" href="#/">HOME</a>
                        </li>
                        <li>
                            <a id="second-home-link" onClick={(event) => openPage(event, 'second-home', 'browse-tablinks', 'tabcontent')} className="browse-tablinks" href="#/">HOME ALT</a>
                        </li>
                        <li>
                            <a onClick={(event) => openPage(event, 'about_us', 'browse-tablinks', 'tabcontent')} className="browse-tablinks" href="#/">ABOUT US</a>
                        </li>
                        <li>
                            <a onClick={(event) => openPage(event, 'services', 'browse-tablinks', 'tabcontent')} className="browse-tablinks" href="#/">SERVICES</a>
                        </li>
                        <li>
                            <a className="browse-tablinks" href="/blog" >BLOG</a>
                        </li>
                        <li>
                            <a onClick={(event) => openPage(event, 'contact', 'browse-tablinks', 'tabcontent')} className="browse-tablinks" href="#/">CONTACT</a>
                        </li>
                    </ul>

                    <div className="navbar-header display-inline-block float-unset">
                        <a className="navbar-brand" href="/">
                            <img className="navbar-brand-img" src={logo} onError={i => i.target.style.display='none'} alt="Logo"/>
                        </a>
                    </div>

                    <ul className="nav navbar-nav navbar-right">
                        <li>
                            <a onClick={(event) => openPage(event, 'job_lst', 'browse-tablinks', 'tabcontent')} className="browse-tablinks" href="#/">JOB LIST</a>
                        </li>
                        <li>
                            <a onClick={(event) => openPage(event, 'freelancers', 'browse-tablinks', 'tabcontent')} className="browse-tablinks" href="#/">FREELANCERS</a>
                        </li>
                        <li>
                            <a onClick={(event) => openPage(event, 'employers', 'browse-tablinks', 'tabcontent')} className="browse-tablinks" href="#/">EMPLOYERS</a>
                        </li>
                        <li className="margin-left-neg-1">
                            <a href="/login">
                                <span className="navbar-button plain">Login</span>
                            </a>
                        </li>
                        <li className="margin-left-neg-1">
                            <a href="/signup">
                                <span className="navbar-button active">Sign Up</span>
                            </a>
                        </li>
                    </ul>
                </div>
            </nav>
        );
    }
}

export default Navbar;