import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";

import athenaLogo from "../../images/athena_logo.png";

const Container = styled.div`
  display: flex;
  flex-direction: row;
`;

const JobDetails = styled.div`
  display: flex;
  flex-direction: column;
`;

const Avatar = styled.img`
  width: 3.5em;
  height: 3.5em;
  object-fit: cover;
`;

const JobItem = props => {
  const { title, company, salary_range, location } = props;
  return (
    <Container>
      <Avatar src={athenaLogo} alt="logo" />
      <JobDetails>
        <span>{title}</span>
        <span>{company}</span>
        <span>{salary_range}</span>
        <span>{location}</span>
      </JobDetails>
      <hr />
    </Container>
  );
};

JobItem.propTypes = {
  title: PropTypes.string.isRequired,
  company: PropTypes.string.isRequired,
  salary_range: PropTypes.string.isRequired,
  location: PropTypes.string.isRequired
};

export default JobItem;
