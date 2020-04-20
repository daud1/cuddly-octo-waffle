import BriefProfile from "./BriefProfile";
import { Container } from "../../shared/components/StyledComponents";
import JobList from "./JobList";
import PropTypes from "prop-types";
import React from "react";

export default function Projects(props) {
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
          <JobList title="Available Jobs" stickerLabel="Available" jobs={props.jobs} />
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

Projects.propTypes = {
  jobs: PropTypes.arrayOf(
    PropTypes.shape({
      title: PropTypes.string,
      company: PropTypes.string,
      salary_range: PropTypes.string,
      location: PropTypes.string,
    })
  ),
};
