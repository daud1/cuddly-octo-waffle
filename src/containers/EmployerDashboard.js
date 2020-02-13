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
  getReviews = () => {};

  getProfile = () => {
    const { user } = this.props;
    let url = `${API_URL}/employer/profile/?user=${user.id}`;
    const headers = {
      "content-type": "application/json",
      Authorization: `Token ${user.key}`
    };

    axios
      .get(url, { headers })
      .then(response => {
        console.log(response);
      })
      .catch(error => {
        console.log(error);
      });
  };

  componentDidMount() {
    this.getProfile();
  }
  render() {
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
        description: "loremipsumdolormet loremipsumdolormet loremipsumdolormet",
        rating: 4,
        author: { name: "Ssajjalyabeene Margaret" },
        date_posted: "23/03/2019"
      },
      {
        title: "Excellent Support",
        description:
          "He's really good and finished my project in record time. Definitely would hire him again",
        rating: 5,
        author: { name: "Nakanjako Miriam" },
        date_posted: "15/04/2009"
      },
      {
        title: "Well Organized.",
        description: "loremipsumdolormet loremipsumdolormet loremipsumdolormet",
        rating: 3,
        author: { name: "Mbulakyaalo Kirabo" },
        date_posted: "21/12/2019"
      },
      {
        title: "Pay your workers",
        description: "loremipsumdolormet loremipsumdolormet loremipsumdolormet",
        rating: 1,
        author: { name: "Jean de la Croix Mujawimaana" },
        date_posted: "3/01/2029"
      }
    ];
    return (
      <Container>
        <NavBar />
        <Tabs>
          <div label="Dashboard">
            <JobList />
          </div>
          <div label="My Projects">
            <JobList />
            <Modal>
              <CreateJobForm />
            </Modal>
          </div>
          <div label="Profile">
            <Profile profile={profile} reviews={reviews} />
          </div>
          <div label="Inbox"></div>
          <div label="Feedback"></div>
        </Tabs>
        <Footer />
      </Container>
    );
  }
  1;
}

const mapStateToProps = state => ({
  profile: state.profile,
  reviews: state.reviews,
  user: state.user
});
const mapDispatchToProps = dispatch => ({});

export default connect(mapStateToProps, mapDispatchToProps)(EmployerDashboard);
