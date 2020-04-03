import React, { Component } from "react";
import {
  addAward,
  addJob,
  editAward,
  fetchAwards,
  fetchJobs,
  fetchReviews
} from "../reducers";
import { editLoggedInProfile, fetchLoggedInProfile } from "../../auth/reducers";

import AccountDropDown from "../../auth/components/AccountDropDown";
import CreateJobForm from "./CreateJobForm";
import Footer from "../../common/components/Footer";
import Modal from "../../common/components/Modal";
import NavBar from "../../common/components/Navbar";
import { PostButton } from "./Common";
import Profile from "./Profile";
import Projects from "./Projects";
import Tabs from "../../common/components/Tabs";
import { clearNotification } from "../../auth/reducers";
import { connect } from "react-redux";
import { isEmpty } from "../../common/utils/helpers";
import styled from "styled-components";
import toast from "toasted-notes";

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
      fetchJobs(profile_id);
      fetchAwards(profile_id, key);
      fetchReviews(profile_id, key);
    }
    fetchLoggedInProfile(id, user_type, key, after);
  }

  componentDidUpdate(prevProps, prevState, snapshot) {
    const { notification, clearNotifications } = this.props;

    if (prevProps.notification !== notification && !isEmpty(notification)) {
      const { message, options } = notification;
      toast.notify(message, options);
      clearNotifications();
    }
  }

  render() {
    const {
      profile,
      awards,
      jobs,
      reviews,
      editLoggedInProfile,
      editAward,
      addAward,
      addJob
    } = this.props;

    return (
      <Container>
        <NavBar />
        <AccountDropDown />

        <Modal
          height="80%"
          width="50%"
          profile_id={profile.id}
          token={profile.key}
          addJob={addJob}
          render={props => CreateJobForm(props)}
          openButton={props => (
            <PostButton onClick={props.onClose}>Post a Job</PostButton>
          )}
        />
        <Tabs>
          <div label="Profile">
            <Profile
              editProfile={editLoggedInProfile}
              editAward={editAward}
              addAward={addAward}
              profile={profile}
              reviews={reviews}
              awards={awards}
            />
          </div>
          <div label="Projects">
            <Projects jobs={jobs} />
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
  user: state.auth.user,
  notification: state.auth.notification
});

const mapDispatchToProps = dispatch => ({
  fetchLoggedInProfile: (user_id, user_type, key, func) =>
    dispatch(fetchLoggedInProfile(user_id, user_type, key, func)),

  editLoggedInProfile: (profile_id, key, profile_edits, contentType) =>
    dispatch(editLoggedInProfile(profile_id, key, profile_edits, contentType)),

  addAward: (profile_id, key, award) =>
    dispatch(addAward(profile_id, key, award)),

  addJob: (profile_id, key, job) => dispatch(addJob(profile_id, key, job)),
  fetchReviews: (profile_id, key) => dispatch(fetchReviews(profile_id, key)),
  fetchAwards: (profile_id, key) => dispatch(fetchAwards(profile_id, key)),
  fetchJobs: profile_id => dispatch(fetchJobs(profile_id)),
  editAward: (key, awardEdits) => dispatch(editAward(key, awardEdits)),
  clearNotifications: () => dispatch(clearNotification())
});

export default connect(mapStateToProps, mapDispatchToProps)(EmployerDashboard);
