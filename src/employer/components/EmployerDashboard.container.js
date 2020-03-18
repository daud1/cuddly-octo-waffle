import React, { Component } from "react";
import {
  addAward,
  editAward,
  editProfile,
  fetchAwards,
  fetchReviews,
  fetchJobs
} from "../reducers";
import Footer from "../../common/components/Footer";
import NavBar from "../../common/components/Navbar";
import Profile from "./Profile";
import Modal from "../../common/components/Modal";
import Projects from "./Projects";
import { PostButton } from "./Common";
import CreateJobForm from "./CreateJobForm";
import Tabs from "../../common/components/Tabs";
import { connect } from "react-redux";
import { fetchLoggedInProfile } from "../../auth/reducers";
import styled from "styled-components";

const Container = styled.div`
  font-size: 13px;
`;

class EmployerDashboard extends Component {
  componentDidMount() {
    const {
      fetchLoggedInProfile,
      fetchAwards,
      fetchReviews,
      fetchJobs,
      user: { id, key, user_type }
    } = this.props;

    function after(profile_id, key) {
      fetchAwards(profile_id, key);
      fetchReviews(profile_id, key);
      fetchJobs(profile_id);
    }

    fetchLoggedInProfile(id, user_type, key, after);
  }

  render() {
    const {
      profile,
      awards,
      jobs,
      reviews,
      editProfile,
      editAward,
      addAward
    } = this.props;

    return (
      <Container>
        <NavBar />
        <Modal
          height="80%"
          width="50%"
          profile_id={profile.id}
          token={profile.key}
          openButton={props => (
            <PostButton onClick={props.onClose}>Post a Job</PostButton>
          )}
          render={props => CreateJobForm(props)}
        />
        <Tabs>
          <div label="Projects">
            <Projects jobs={jobs} />
          </div>
          <div label="Profile">
            <Profile
              editProfile={editProfile}
              editAward={editAward}
              addAward={addAward}
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
  jobs: state.employer.jobs.jobs,
  user: state.auth.user
});

const mapDispatchToProps = dispatch => ({
  fetchLoggedInProfile: (user_id, user_type, key, func) =>
    dispatch(fetchLoggedInProfile(user_id, user_type, key, func)),

  editProfile: (profile_id, key, profile_edits) =>
    dispatch(editProfile(profile_id, key, profile_edits)),

  addAward: (profile_id, key, award) =>
    dispatch(addAward(profile_id, key, award)),

  addJob: (profile_id, key, award) =>
    dispatch(editAward(profile_id, key, award)),

  fetchReviews: (profile_id, key) => dispatch(fetchReviews(profile_id, key)),
  fetchAwards: (profile_id, key) => dispatch(fetchAwards(profile_id, key)),
  fetchJobs: profile_id => dispatch(fetchJobs(profile_id)),
  editAward: (key, awardEdits) => dispatch(editAward(key, awardEdits))
});

export default connect(mapStateToProps, mapDispatchToProps)(EmployerDashboard);
