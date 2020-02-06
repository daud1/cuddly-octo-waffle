import React from "react";

import { Avatar, GrayTxt, Title, Container } from "./CommonStyles";

import ProfileBanner from "./ProfileBanner";

function TestProfile() {
  return (
    <>
      <ProfileBanner />
      <Container className="container" height="150px" mt="100px">
        <Container width="35%">
            social icons go here
        </Container>
        <Container bl br width="30%" columns>
          <Container mb="20px" xCenter>
            <Title className="bold">John Henry</Title>
          </Container>
          <Container xCenter className="center">
            CEO of moontheme <br />
            Moontheme Studio Design Inc. <br />
            25 employees
          </Container>
        </Container>
        <Container width="35%" br className="justify-content-flex-end">
          Salary of the company<br />
          $ 1000 - $ 5000
        </Container>
      </Container>
    </>
  );
}

export default TestProfile;
