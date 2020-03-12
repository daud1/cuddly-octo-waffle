import React from "react";

import { Container, Avatar, SubTitle, GrayTxt, Button } from "./Common";
import profileImage from "../../common/images/sample_profile_pic.jpg";

export const BriefProfile = props => {
  return (
    <Container width="95%">
      <Container>
        <Avatar src={profileImage} rounded />
      </Container>
      <Container columns ml="20px">
        <Container>
          <SubTitle blue pointer>Steve Munich</SubTitle>
        </Container>
        <Container mb="7px" mt="7px">
          <GrayTxt>Tokyo, Japan . Worked @Samsung</GrayTxt>
        </Container>
        <Container>Product Design ( Web, Mobile App)</Container>
        <Container>7 Years of Experience</Container>
        <Container>48 Number of hours per week</Container>
        <Container mt="15px">
          <Button>Connect</Button>
          <Button white ml="15px">
            Not Now
          </Button>
        </Container>
      </Container>
    </Container>
  );
};

export default BriefProfile;
