import React from 'react';
import cover from '../images/sample_cover_pic.jpg';

function HomeHeader() {
    return (
        <div>
            <div>
                <img className="banner-image" src={cover} onError={i => i.target.style.display='none'} alt="Cover"/>
            </div>

            <div className="three-column banner-overlay">
                <p className="montserrat-font big-heading">
                    <strong>Athena Freelancers</strong>
                </p>
                <span>
                    Where the world meets startups. Millions of small businesses use Freelancer to turn their ideas into
                    reality
                </span>
                <div className="margin-top-1em margin-bottom-1em">
                    <i id="place-holder-icon" className="fa fa-search input-icon"></i>
                    <input placeholder="Enter job title, position, skills..." className="full-rounded-input" />
                    <button className="full-rounded-input-button gradient">FIND JOBS</button>
                </div>
                <span>Update the latest jobs and announcements from Athena.
                    <span className="bold-and-blue">Join us today</span>
                </span>
            </div>

            <span className="home-banner-indicators">
                <div>
                    <i className="fa fa-circle-thin spaced active" style={{ marginTop: '0.2em' }}></i>
                </div>
                <div>
                    <i className="fa fa-circle-thin spaced" style={{ marginTop: '0.2em' }}></i>
                </div>
                <div>
                    <i className="fa fa-circle-thin spaced" style={{ marginTop: '0.2em' }}></i>
                </div>
            </span>
        </div>
    );
}

export default HomeHeader;
