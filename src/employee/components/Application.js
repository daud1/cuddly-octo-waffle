import {
  Avatar,
  Container,
  GrayTxt,
  SubTitle,
} from "../../shared/components/StyledComponents";

import PropTypes from "prop-types";
import React from "react";
import profilePic from "../../shared/images/sample_profile_pic.jpg";

const Application = props => {
  const {
    job: {
      title,
      employer: { company_name },
    },
  } = props;
  return (
    <Container bt pt="30px">
      <Container>
        <Avatar src={profilePic} alt="logo" />
      </Container>
      <Container columns ml="15px" mb="25px">
        <Container>
          <SubTitle hoverEffect blue>
            {title}
          </SubTitle>
        </Container>
        <Container mb="5px">
          <GrayTxt>At {company_name}</GrayTxt>
        </Container>
      </Container>
    </Container>
  );
};

Application.propTypes = {
  job: PropTypes.object.isRequired,
  applicant: PropTypes.object.isRequired,
  resume: PropTypes.string.isRequired,
};

export default Application;
