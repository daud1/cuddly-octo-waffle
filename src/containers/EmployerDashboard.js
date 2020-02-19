import React, { Component } from "react";

import ACTIONS from "../redux/action";
import { API_URL } from "../utils/constants";
import CreateJobForm from "../components/employer_dashboard/CreateJobForm";
import Footer from "../components/Footer";
import JobList from "../components/employer_dashboard/JobList";
import Modal from "../components/generic/Modal";
import NavBar from "../components/Navbar";
import Profile from "../components/employer_dashboard/Profile";
import Tabs from "../components/generic/Tabs";
import axios from "axios";
import { connect } from "react-redux";
import styled from "styled-components";

const Container = styled.div`
  font-size: 13px;
`;

class EmployerDashboard extends Component {
  state = { isOpen: false };

  toggleModal = () => {
    this.setState({ isOpen: !this.state.isOpen });
  };

  getAwards = () => {
    const { profile, getAwards, user } = this.props;
    let url = `${API_URL}/awards/?employer=${profile.employer_id}`;
    const headers = {
      "content-type": "application/json",
      Authorization: `Token ${user.key}`
    };

    axios
      .get(url, { headers })
      .then(response => {
        console.log(response);
        getAwards(response.data);
      })
      .catch(error => console.error(error));
  };

  editAwards = awards_edits => {
    const {
      profile: { employer_id },
      user
    } = this.props;
    const headers = {
      "content-type": "application/json",
      Authorization: `Token ${user.key}`
    };
    let url = `${API_URL}/awards/?employer=${employer_id}`;

    axios
      .put(url, awards_edits, { headers })
      .then(response => console.log(response))
      .catch(error => console.error(error));
  };

  getProfile = () => {
    const { user, setLoggedInProfile } = this.props;
    let url = `${API_URL}/employer/profile/?user=${user.id}`;
    const headers = {
      "content-type": "application/json",
      Authorization: `Token ${user.key}`
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
      user: { id, key },
      setLoggedInProfile
    } = this.props;
    const headers = {
      "content-type": "application/json",
      Authorization: `Token ${key}`
    };
    let url = `${API_URL}/employer/profile/?user=${id}`;

    axios
      .put(url, profile_edits, { headers })
      .then(response => {
        setLoggedInProfile(response.data[0]);
      })
      .catch(error => {
        console.log(error);
      });
  };

  getReviews = () => {
    const { profile, getReviews, user } = this.props;
    let url = `${API_URL}/reviews/?employer_id=${profile.employer_id}`;

    const headers = {
      "content-type": "application/json",
      Authorization: `Token ${user.key}`
    };

    axios
      .get(url, { headers })
      .then(response => {
        console.log(response.data);
        getReviews(response.data);
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
      description:
        "Fast response! My app was ready next day. I would hire again! Thanks!",
      industry: "Engineering as a Service",
      number_of_employees: "50-100"
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
        year: 2007
      },
      {
        title: "Fastest Growing SME",
        awarded_by: "URA",
        year: 2010
      },
      {
        title: "Friend to Nature",
        awarded_by: "UWA",
        year: 2013
      },
      {
        title: "Best Place to Work",
        awarded_by: "VNP",
        year: 2017
      }
    ];
    const { isOpen } = this.state;

    const { editReviews, editAwards, editProfile } = this;
    return (
      <Container>
        <NavBar />
        <Tabs>
          <div label="Dashboard">
            <JobList />
          </div>
          <div label="My Projects">
            <button onClick={this.toggleModal}>Post a Job</button>

            <Modal isOpen={isOpen} onClose={this.toggleModal}>
              <CreateJobForm />
            </Modal>
          </div>
          <div label="My Profile">
            <Profile
              editProfile={editProfile}
              editReviews={editReviews}
              editAwards={editAwards}
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
  user: state.user
});
const mapDispatchToProps = dispatch => ({
  setLoggedInProfile: profile => dispatch(ACTIONS.setLoggedInProfile(profile)),
  getReviews: reviews => dispatch(ACTIONS.getReviews(reviews)),
  getAwards: awards => dispatch(ACTIONS.getAwards(awards))
});

export default connect(mapStateToProps, mapDispatchToProps)(EmployerDashboard);
