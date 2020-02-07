import React from "react";
import axios from "axios";
import { connect } from "react-redux";
import JobItem from "./JobItem";
import PropTypes from "prop-types";
import { API_URL } from "../../utils/constants";
import ACTIONS from "../../redux/action";

class JobList extends React.Component {
  static propTypes = {
    user: PropTypes.shape({
      key: PropTypes.string,
      loggedIn: PropTypes.bool,
      email: PropTypes.string
    }),
    jobs: PropTypes.arrayOf(
      PropTypes.shape({
        title: PropTypes.string,
        company: PropTypes.string,
        salary_range: PropTypes.string,
        location: PropTypes.string
      })
    )
  };

  componentDidMount() {
    const { user, getJobs } = this.props;
    const url = `${API_URL}/jobs/`;
    const headers = {
      "content-type": "application/json",
      Authorization: `Token ${user.key}`
    };

    axios
      .get(url, headers)
      .then(response => {
        getJobs(response.data);
      })
      .catch(error => {
        console.log(error);
      });
  }

  render() {
    const { jobs } = this.props;
    console.log(this.props);
    return (
      <div className="container">
        <h3>Trending Jobs</h3>
        {jobs.map((job, index) => (
          <JobItem
            title={job.title}
            company={job.company}
            salary_range={job.salary_range}
            location={job.location}
            key={index}
          />
        ))}
      </div>
    );
  }
}

const mapStateToProps = state => ({
  jobs: state.jobs,
  user: state.user
});

const mapDispatchToProps = dispatch => ({
  getJobs: jobs => dispatch(ACTIONS.getJobs(jobs))
});

export default connect(mapStateToProps, mapDispatchToProps)(JobList);
