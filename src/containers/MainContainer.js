import React, { Component } from 'react';
import Home from './Home';
import '../styles/global.css';
import '../styles/home.css';

class MainContainer extends Component {
    constructor(props) {
        super(props);
        this.state = { user: {} };
    }

    render() {
        return (
            <div className="main-container">
                <Home />
            </div>
        );
    }
}

export default MainContainer;