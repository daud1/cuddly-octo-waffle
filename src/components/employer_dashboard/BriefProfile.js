import React from "react";

import { Container, Avatar, BlueSubTitle, GrayTxt, Button } from "./Common";
import profileImage from "../../images/sample_profile_pic.jpg";

export const BriefProfile = props => {
  return (
    <Container width="95%">
      <Container>
        <Avatar src={profileImage} rounded />
      </Container>
      <Container columns ml="20px">
        <Container>
          <BlueSubTitle>Steve Munich</BlueSubTitle>
        </Container>
        <Container mb="7px" mt="7px">
          <GrayTxt>Tokyo, Japan . Worked @Samsung</GrayTxt>
        </Container>
        <Container>Product Design ( Web, Mobile App)</Container>
        <Container>7 Years of Experience</Container>
        <Container>48 Number of hours per week</Container>
        <Container mt="15px">
          <Container>
            <Button>Connect</Button>
          </Container>
          <Container ml="15px">
            <Button white>Not Now</Button>
          </Container>
        </Container>
      </Container>
    </Container>
  );
};

export default BriefProfile;