import {
  addAward,
  addJob,
  editAward,
  fetchAwards,
  fetchJobs,
  fetchReviews,
} from "../../employer/reducers";
import {
  applyForJob,
  editApplication,
  editReview,
  fetchApplications,
  fetchQualifications,
  getReviews,
} from "../../employee/reducers";
import { editLoggedInProfile, fetchLoggedInProfile } from "../../auth/reducers";

import EmployeeDashboard from "../../employee/components/EmployeeDashboard";
import EmployerDashboard from "../../employer/components/EmployerDashboard";
import React from "react";
import { clearNotification } from "../../auth/reducers";
import { connect } from "react-redux";
import { isEmpty } from "../../shared/utils/helpers";
import toast from "toasted-notes";

class Dashboard extends React.Component {
  componentDidUpdate(prevProps, prevState, snapshot) {
    const { notification, clearNotifications } = this.props;

    if (prevProps.notification !== notification && !isEmpty(notification)) {
      const { message, options } = notification;

      toast.notify(message, options);
      clearNotifications();
    }
  }

  componentDidMount() {
    const {
      fetchAwards,
      fetchJobs,
      fetchReviews,
      profile: { id: profileId },
      user: { key, user_type },
    } = this.props;

    function fetchEmpData(profileId, key) {
      fetchJobs(profileId);
      fetchAwards(profileId, key);
      fetchReviews(profileId, key);
    }

    function fetchFreData(profileId, key) {
      fetchApplications(profileId, key);
      fetchQualifications(profileId, key);
      getReviews(profileId, key);
    }

    switch (user_type) {
      case "EMP":
        fetchEmpData(profileId, key);
        break;
      case "FRE":
        fetchFreData(profileId, key);
        break;

      default:
        return;
    }
  }

  render() {
    const {
      addAward,
      addJob,
      awards,
      editAward,
      editLoggedInProfile,
      jobs,
      profile,
      reviews,
      user,
      qualifications,
      applications,
      fReviews,
      addReview,
      editReview,
      editApplication,
      applyForJob,
    } = this.props;

    return user.user_type === "EMP" ? (
      <EmployerDashboard
        editLoggedInProfile={editLoggedInProfile}
        addAward={addAward}
        addJob={addJob}
        editAward={editAward}
        profile={profile}
        reviews={reviews}
        awards={awards}
        jobs={jobs}
        user={user}
      />
    ) : (
      <EmployeeDashboard
        qualifications={qualifications}
        applications={applications}
        reviews={fReviews}
        editLoggedInProfile={editLoggedInProfile}
        addReview={addReview}
        editReview={editReview}
        editApplication={editApplication}
        applyForJob={applyForJob}
      />
    );
  }
}

const mapStateToProps = state => ({
  profile: state.auth.loggedInProfile,
  reviews: state.employer.reviews.reviews,
  fReviews: state.employee.reviews.reviews,
  qualifications: state.employee.qualifications.qualifications,
  applications: state.employee.applications.applications,
  awards: state.employer.awards.awards,
  jobs: state.employer.jobs.jobs,
  user: state.auth.user,
  notification: state.auth.notification,
});

const mapDispatchToProps = dispatch => ({
  fetchLoggedInProfile: (userId, user_type, key) =>
    dispatch(fetchLoggedInProfile(userId, user_type, key)),
  editLoggedInProfile: (profileId, key, changes, contentType) =>
    dispatch(editLoggedInProfile(profileId, key, changes, contentType)),
  addAward: (profileId, key, award) => dispatch(addAward(profileId, key, award)),
  addJob: (profileId, key, job) => dispatch(addJob(profileId, key, job)),
  fetchReviews: (profileId, key) => dispatch(fetchReviews(profileId, key)),
  fetchAwards: (profileId, key) => dispatch(fetchAwards(profileId, key)),
  fetchJobs: profileId => dispatch(fetchJobs(profileId)),
  getReviews: (profileId, key) => dispatch(getReviews(profileId, key)),
  editReview: (profileId, key) => dispatch(editReview(profileId, key)),
  fetchQualifications: (profileId, key) => dispatch(fetchQualifications(profileId, key)),
  fetchApplications: (profileId, key) => dispatch(fetchApplications(profileId, key)),
  editApplication: (profileId, key) => dispatch(editApplication(profileId, key)),
  applyForJob: (profileId, key) => dispatch(applyForJob(profileId, key)),
  editAward: (key, awardEdits) => dispatch(editAward(key, awardEdits)),
  clearNotifications: () => dispatch(clearNotification()),
});

export default connect(mapStateToProps, mapDispatchToProps)(Dashboard);
