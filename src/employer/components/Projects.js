import React from "react";
import axios from "axios";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { API_URL } from "../../common/utils/constants";
import ACTIONS from "../../common/redux/action";
import JobList from "./JobList";
import { Container } from "./Common";
import BriefProfile from "./BriefProfile";

class Projects extends React.Component {
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
    const { getJobs } = this.props;
    const url = `${API_URL}/jobs/`;
    const headers = {
      "content-type": "application/json"
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
    return (
        <Container bb columns>
      <Container className="container">
        <Container columns br width="73%">
          <Container mt="30px" mb="30px">
            <h4>Connect with people you may know</h4>
          </Container>
          <Container bb pb="50px">
            <Container width="50%">
              <BriefProfile />
            </Container>
            <Container width="50%">
              <BriefProfile />
            </Container>
          </Container>
          <JobList
            title="Available Jobs"
            stickerLabel="Available"
            jobs={this.props.jobs}
          />
        </Container>
        <Container columns width="27%">
          <Container height="30vh" pd="25px">
            Welcome back
          </Container>
          <Container height="30vh" pd="25px" bt bb>
            Connections
          </Container>
          <Container height="30vh" pd="25px">
            Who viewed me
          </Container>
        </Container>
      </Container>
       </Container>
    );
  }
}

const mapStateToProps = state => ({
  jobs: state.employer.jobs.jobs,
  user: state.user
});

const mapDispatchToProps = dispatch => ({
  getJobs: jobs => dispatch(ACTIONS.getJobs(jobs))
});

export default connect(mapStateToProps, mapDispatchToProps)(Projects);
