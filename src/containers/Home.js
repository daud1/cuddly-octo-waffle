import React, { Component } from 'react';
import Navbar from '../components/Navbar';
import HomeHeader from '../components/HomeHeader';
import HomeSection1 from '../components/HomeSection1';
import HomeSection2 from '../components/HomeSection2';
import HomeSection3 from '../components/HomeSection3';
import HomeSection4 from '../components/HomeSection4';
import HomeSection5 from '../components/HomeSection5';
import HomeSection6 from '../components/HomeSection6';
import HomeSection7 from '../components/HomeSection7';
import Footer from '../components/Footer';

class Home extends Component {
    constructor(props) {
        super(props);
        this.state = { user: {} };
    }

    render() {
        return (
            <div>
                <Navbar />
                <div className="home-banner-div">
                    <HomeHeader />
                    <HomeSection1 />
                    <HomeSection2 />
                    <HomeSection3 />
                    <HomeSection4 />
                    <HomeSection5 />
                    <HomeSection6 />
                    <HomeSection7 />
                    <Footer />
                </div>
            </div>
        );
    }
}

export default Home;