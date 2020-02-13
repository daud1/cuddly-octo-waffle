import React from "react";
import axios from "axios";
import { connect } from "react-redux";
import JobItem from "./JobItem";
import PropTypes from "prop-types";
import { API_URL } from "../../utils/constants";
import ACTIONS from "../../redux/action";
import styled from "styled-components";
import BriefProfile from "./BriefProfile";
import { Container, Ellipsis, GrayTxt } from "./Common";

const Sticker = styled.div`
  background-color: #a476f5;
  color: #fff;
  text-transform: uppercase;
  width: 90px;
  height: 18px;
  display: flex;
  align-items: center;
  border-radius: 25px 0 0 25px;
  padding-left: 10px;
  font-size: 11px;
  font-weight: 600;
`;

const TrendingContainer = styled(Container)`
  display: flex;
  align-items: center;
  justify-content: flex-end;
  width: 50%;
`;

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
    const { jobs } = this.props;
    return (
      <Container bb>
        <Container className="container">
          {/* left content */}
          <Container columns width="73%" br>
            <Container mt="30px" mb="30px">
              <h4>Connect with people you may know</h4>
            </Container>
            <Container>
              <Container width="50%">
                <BriefProfile />
              </Container>
              <Container width="50%">
                <BriefProfile />
              </Container>
            </Container>
            <Container xCenter yCenter bb height="100px">
              View more
            </Container>
            <Container columns className="listContainer">
              <Container mt="30px">
                <Container width="50%">
                  <h4>Trending Jobs</h4>
                </Container>
                <TrendingContainer>
                  <Sticker> trending</Sticker>
                </TrendingContainer>
              </Container>
              {jobs.map((job, index) => (
                <JobItem
                  title={job.title}
                  company={job.employer.company_name}
                  salary_range={job.salary_range}
                  location={job.location}
                  key={index}
                />
              ))}
            </Container>
            <Container xCenter mt="70px" mb="30px">
              <Ellipsis className="fa fa-ellipsis-h" />
                <GrayTxt bigger>View more</GrayTxt>
            </Container>
          </Container>
          {/* Right content */}
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
  jobs: state.jobs,
  user: state.user
});

const mapDispatchToProps = dispatch => ({
  getJobs: jobs => dispatch(ACTIONS.getJobs(jobs))
});

export default connect(mapStateToProps, mapDispatchToProps)(JobList);
