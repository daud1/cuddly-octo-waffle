import React from 'react';
import { openPage } from '../utils/helpers';

function AccountNavbar(props) {
    return (
        <div className="tab">
            <button className="tablinks active" onClick={(event) => openPage(event, 'Dashboard', 'tablinks', 'tabcontent')}>Dashboard</button>
            <button className="tablinks" onClick={(event) => openPage(event, 'My Projects', 'tablinks', 'tabcontent')}>My Projects</button>
            <button className="tablinks" onClick={(event) => openPage(event, 'My Profile', 'tablinks', 'tabcontent')}>My Profile</button>
            <button className="tablinks" onClick={(event) => openPage(event, 'Inbox', 'tablinks', 'tabcontent')}>Inbox</button>
            <button className="tablinks" onClick={(event) => openPage(event, 'Feedback', 'tablinks', 'tabcontent')}>Feedback</button>
            <label className="form-switch">
                <input type="checkbox" />
                <i></i>
                View Freelancer Profile
                </label>
        </div>
    );
}

export default AccountNavbar;
