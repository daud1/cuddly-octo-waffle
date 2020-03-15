import React, { Component } from "react";
import { API_URL } from "../../common/utils/constants";
import { Button } from "./Common";
import CreateJobForm from "./CreateJobForm";
import Footer from "../../common/components/Footer";
import JobList from "./JobList";
import Modal from "../../common/components/Modal";
import NavBar from "../../common/components/Navbar";
import Profile from "./Profile";
import Tabs from "../../common/components/Tabs";
import axios from "axios";
import { connect } from "react-redux";
import { fetchLoggedInProfile } from "../../auth/reducers";
import { fetchReviews, fetchAwards } from "../reducers";
import styled from "styled-components";

const Container = styled.div`
  font-size: 13px;
`;

class EmployerDashboard extends Component {
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

  editProfile = profile_edits => {
    const {
      user: { key },
      profile: { id },
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

  componentDidMount() {
    const {
      fetchLoggedInProfile,
      fetchAwards,
      fetchReviews,
      user: { id, key, user_type },
      profile
    } = this.props;

    fetchLoggedInProfile(id, user_type, key);
    fetchAwards(profile.id, key);
    fetchReviews(profile.id, key);
  }

  render() {
    const { profile, awards, reviews } = this.props;
    const { editReviews, editAward, editProfile } = this;

    return (
      <Container>
        <NavBar />
        <Tabs>
          <div label="Projects">
            <Modal
              openButton={props => (
                <Button onClick={props.onClose}>Post a Job</Button>
              )}
              render={props => CreateJobForm({ onClose: props.onClose })}
            />
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
  profile: state.auth.loggedInProfile,
  reviews: state.employer.reviews.reviews,
  awards: state.employer.awards.awards,
  user: state.auth.user
});
const mapDispatchToProps = dispatch => ({
  fetchReviews: (profile_id, key) => dispatch(fetchReviews(profile_id, key)),
  fetchAwards: (profile_id, key) => dispatch(fetchAwards(profile_id, key)),
  fetchLoggedInProfile: (user_id, user_type, key) =>
    dispatch(fetchLoggedInProfile(user_id, user_type, key))
});

export default connect(mapStateToProps, mapDispatchToProps)(EmployerDashboard);
