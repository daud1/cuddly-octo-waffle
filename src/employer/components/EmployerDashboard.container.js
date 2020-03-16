import React, { Component } from "react";

import ACTIONS from "../../common/redux/action";
import { API_URL } from "../../common/utils/constants";
import Footer from "../../common/components/Footer";
import JobList from "./JobList";
import NavBar from "../../common/components/Navbar";
import Profile from "./Profile";
import Tabs from "../../common/components/Tabs";
import axios from "axios";
import { connect } from "react-redux";
import styled from "styled-components";

const Container = styled.div`
  font-size: 13px;
`;

class EmployerDashboard extends Component {
  getAwards = () => {
    const { profile, fetchAwards, user } = this.props;
    const headers = {
      "content-type": "application/json",
      Authorization: `Token ${user.key}`
    };
    let url = `${API_URL}/employer/awards/?employer=${profile.id}`;
    axios
      .get(url, { headers })
      .then(response => {
        fetchAwards(response.data);
      })
      .catch(error => console.error(error));
  };

  editAward = awards_edits => {
    const { user } = this.props;
    const { id } = awards_edits;
    const headers = {
      "content-type": "application/json",
      Authorization: `Token ${user.key}`
    };
    let url = `${API_URL}/employer/awards/${id}/`;

    axios
      .patch(url, awards_edits, { headers })
      .then(response => console.log(response))
      .then(this.getAwards())
      .catch(error => console.error(error));
  };

  getProfile = () => {
    const {
      user: { id, key },
      setLoggedInProfile
    } = this.props;
    let url = `${API_URL}/employer/profile/?user=${id}`;
    const headers = {
      "content-type": "application/json",
      Authorization: `Token ${key}`
    };

    axios
      .get(url, { headers })
      .then(response => {
        setLoggedInProfile(response.data[0]);
      })
      .catch(error => {
        console.log(error);
      });
  };

  editProfile = profile_edits => {
    const {
      user: { key },
      loggedInProfile: { id },
      setLoggedInProfile
    } = this.props;
    const headers = {
      "content-type": "application/json",
      Authorization: `Token ${key}`
    };
    let url = `${API_URL}/employer/profile/${id}/`;

    axios
      .patch(url, profile_edits, { headers })
      .then(response => {
        setLoggedInProfile(response.data);
      })
      .catch(error => {
        console.log(error);
      });
  };

  getReviews = () => {
    const { profile, fetchReviews, user } = this.props;
    let url = `${API_URL}/reviews/?employer_id=${profile.employer_id}`;

    const headers = {
      "content-type": "application/json",
      Authorization: `Token ${user.key}`
    };

    axios
      .get(url, { headers })
      .then(response => {
        console.log(response.data);
        fetchReviews(response.data);
      })
      .catch(error => {
        console.error(error);
      });
  };

  componentDidMount() {
    this.getProfile();
    // this.getReviews();
    // this.getAwards();
  }

  render() {
    // const { profile, awards, reviews } = this.props;
    const profile = {
      company_name: "KanzuCode",
      location: "Kampala, Uganda",
      industry: "Engineering as a Service",
      number_of_employees: "50-100",
      phone_number: "256772123456",
      social: {
        facebook: "",
        twitter: "",
        linkedin: "",
        behance: "",
        dribbble: "",
        github: "",
        website: ""
      },
      description:
        "We have been catering to the software development \
        needs across the globe.For all possible technology platforms,\
        we have qualified resources to work with.We are armed with a team of \
        professional,experienced and expert developers, offers end-to-end \
        mobile/web/game applications development services for various platforms \
        including Android, iOS and Windows platform."
    };

    const reviews = [
      {
        title: "Quick Response Time",
        description:
          "loremipsumdolormet loremipsumdolormet loremipsumdolormet ",
        rating: 4,
        author: { first_name: "Margaret", last_name: "Ssajjalyabeene" },
        date_posted: "23/03/2019"
      },
      {
        title: "Excellent Support",
        description:
          "He's really good and finished my project in record time. Definitely would hire him again",
        rating: 5,
        author: { first_name: "Miriam", last_name: "Nakanjako" },
        date_posted: "15/04/2009"
      },
      {
        title: "Well Organized.",
        description: "loremipsumdolormet loremipsumdolormet loremipsumdolormet",
        rating: 3,
        author: { first_name: "Kirabo", last_name: "Mbulakyaalo" },
        date_posted: "21/12/2019"
      },
      {
        title: "Pay your workers",
        description: "Naye nyanya kiki?? obusungu bwaki muganda wange?",
        rating: 1,
        author: { first_name: "Jean de la Croix", last_name: "Mujawimaana" },
        date_posted: "3/01/2029"
      }
    ];

    const awards = [
      {
        title: "Excellent Staff",
        awarded_by: "VNP",
        year: 2007,
        id: 1
      },
      {
        title: "Fastest Growing SME",
        awarded_by: "URA",
        year: 2010,
        id: 2
      },
      {
        title: "Friend to Nature",
        awarded_by: "UWA",
        year: 2013,
        id: 3
      },
      {
        title: "Best Place to Work",
        awarded_by: "VNP",
        year: 2017,
        id: 4
      }
    ];

    const { editReviews, editAward, editProfile } = this;
    return (
      <Container>
        <NavBar />
        <Tabs>
          <div label="Projects">
            <JobList />
          </div>
          <div label="Profile">
            <Profile
              editProfile={editProfile}
              editReviews={editReviews}
              editAward={editAward}
              profile={profile}
              reviews={reviews}
              awards={awards}
            />
          </div>
          <div label="Inbox"></div>
          <div label="Feedback"></div>
        </Tabs>
        <Footer />
      </Container>
    );
  }
}

const mapStateToProps = state => ({
  profile: state.loggedInProfile,
  reviews: state.reviews,
  awards: state.awards,
  user: state.user,
  loggedInProfile: state.loggedInProfile
});
const mapDispatchToProps = dispatch => ({
  setLoggedInProfile: profile => dispatch(ACTIONS.setLoggedInProfile(profile)),
  fetchReviews: reviews => dispatch(ACTIONS.getReviews(reviews)),
  fetchAwards: awards => dispatch(ACTIONS.getAwards(awards))
});

export default connect(mapStateToProps, mapDispatchToProps)(EmployerDashboard);
