import React from 'react';
import athenaLogo from '../images/athena_logo.png';

function Footer() {
    const now = new Date();
    return (
        <div className="container">
            <div className="profile-info-area stats">
                <table>
                    <tbody>
                        <tr>
                            <td>
                                <span>
                                    <img className="navbar-brand-img no-left-margin" src={athenaLogo} onError={i => i.target.style.display = 'none'} alt="Logo" />
                                </span>
                            </td>
                            <td></td>
                            <td className="right">
                                <span className="bold-and-blue">2,342,233</span>
                                <span className="small-and-bold">COMMUNITY MEMBERS</span>
                                <span className="spacer" />
                                <span className="bold-and-blue">15,342,216</span>
                                <span className="small-and-bold">TOTAL JOBS POSTED</span>
                            </td>
                        </tr>
                        <tr>
                            <td className="width-25-percent about-athena">
                                Meet Athena
                                <p />
                                <p className="profile-user-info">
                                    About
                                    <br /> How it Works
                                    <br /> Our services
                                    <br /> Blog
                                    <br /> Contact us
                                </p>
                            </td>
                            <td className="width-25-percent about-athena">
                                Athena Tools
                                <p />
                                <p className="profile-user-info">
                                    My Account
                                    <br /> My Resumes
                                    <br /> My Jobs
                                    <br /> Employers' Messages
                                </p>
                            </td>
                            <td className="width-40-percent about-athena last">
                                Email Newsletters
                                <p />
                                <p className="profile-user-info">
                                    Keep me up to date with content, updates, and offers from Athena
                                </p>
                                <div className="margin-top-1em">
                                    <input placeholder="Email address" className="rounded-input" />
                                    <button className="rounded-input-button">SUBSCRIBE</button>
                                </div>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
            <div className="margin-top-and-bottom-2em">
                <span className="profile-user-info-bold">Privacy Policy</span>
                <span className="small-spacer"></span>
                <span className="profile-user-info-bold">Terms and Conditions</span>
                <span className="small-spacer"></span>
                <span className="profile-user-info-bold">Help</span>
                <span className="small-spacer"></span>
                <span className="profile-user-info-bold">Athena Licences</span>
                <span className="small-spacer"></span>
                <span className="profile-user-info-bold">Partners</span>
                <span className="profile-user-info-bold float-right">
                    <span className="profile-user-info">LANGUAGE:</span>
                    <select className="drop-down">
                        <option>ENGLISH</option>
                        <option>FRENCH</option>
                        <option>SPANISH</option>
                        <option>CHINESE</option>
                        <option>JAPANESE</option>
                    </select>
                </span>
            </div>
            <div className="margin-top-and-bottom-2em">
                <span className="profile-user-info">&copy; {now.getFullYear()} Athena - All Rights Reserved. Made by Moontheme</span>
                <div className="display-inline-block float-right">
                    <span className="profile-social-links">
                        <i className="fa fa-facebook"></i>
                    </span>
                    <span className="profile-social-links active twitter">
                        <i className="fa fa-twitter"></i>
                    </span>
                    <span className="profile-social-links">
                        <i className="fa fa-google-plus"></i>
                    </span>
                    <span className="profile-social-links">
                        <i className="fa fa-instagram"></i>
                    </span>
                </div>
            </div>
        </div>
    );
}

export default Footer;
