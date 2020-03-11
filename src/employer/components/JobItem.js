import React from "react";
import PropTypes from "prop-types";

import profilePic from "../../common/images/sample_profile_pic.jpg";

import { Avatar, GrayTxt, SubTitle, Container } from "./Common";

const JobItem = props => {
  const { title, company, salary_range, location } = props;
  return (
    <Container bt pt="30px">
      <Container>
        <Avatar src={profilePic} alt="logo" />
      </Container>
      <Container columns ml="15px" mb="25px">
        <Container>
          <SubTitle hoverEffect blue>{title}</SubTitle>
        </Container>
        <Container mb="5px">
          <GrayTxt>In {company}</GrayTxt>
        </Container>
        <Container mb="5px">
          <span>{salary_range}</span>
        </Container>
        <Container>
          <GrayTxt>
            <i className="fa fa-map-marker"></i>&nbsp;&nbsp;
            {location}
          </GrayTxt>
        </Container>
      </Container>
    </Container>
  );
};

JobItem.propTypes = {
  title: PropTypes.string.isRequired,
  company: PropTypes.string.isRequired,
  salary_range: PropTypes.string,
  location: PropTypes.string.isRequired
};

export default JobItem;
