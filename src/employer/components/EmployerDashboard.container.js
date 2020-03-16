import React, { Component } from "react";
import { editAward, editProfile, fetchAwards, fetchReviews } from "../reducers";

import Footer from "../../common/components/Footer";
import Projects from "./Projects";
import NavBar from "../../common/components/Navbar";
import Profile from "./Profile";
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
      user: { id, key, user_type }
    } = this.props;

    fetchLoggedInProfile(id, user_type, key, (profile_id, key) => {
      fetchAwards(profile_id, key);
      fetchReviews(profile_id, key);
    });
  }

  render() {
    const { profile, awards, reviews, editProfile, editAward } = this.props;

    return (
      <Container>
        <NavBar />
        <Tabs>
          <div label="Projects">
            <Projects />
          </div>
          <div label="Profile">
            <Profile
              editProfile={editProfile}
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
  fetchLoggedInProfile: (user_id, user_type, key) =>
    dispatch(fetchLoggedInProfile(user_id, user_type, key)),
  editProfile: (profile_id, key, profile_edits) =>
    dispatch(editProfile(profile_id, key, profile_edits)),
  fetchReviews: (profile_id, key) => dispatch(fetchReviews(profile_id, key)),
  fetchAwards: (profile_id, key) => dispatch(fetchAwards(profile_id, key)),
  editAward: (key, awardEdits) => dispatch(editAward(key, awardEdits))
});

export default connect(mapStateToProps, mapDispatchToProps)(EmployerDashboard);
