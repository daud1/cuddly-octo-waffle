import AccountDropDown from "../../auth/components/AccountDropDown";
import Applications from "./Applications";
// import { Container } from "../../shared/components/StyledComponents";
import Navbar from "../../shared/components/Navbar";
import Profile from "./Profile";
import React from "react";
import Tabs from "../../shared/components/Tabs";
import styled from "styled-components";

const Container = styled.div`
  font-size: 13px;
`;

export default function EmployeeDashboard(props) {
  const {
    profile,
    reviews,
    applications,
    qualifications,
    applyForJob,
    editReview,
    addReview,
    editLoggedInProfile,
  } = props;

  return (
    <Container>
      <Navbar />
      <AccountDropDown />

      <Tabs>
        <div label="Profile">
          <Profile
            addReview={addReview}
            editReview={editReview}
            reviews={reviews}
            editProfile={editLoggedInProfile}
            qualifications={qualifications}
            profile={profile}
          />
        </div>
        <div label="Applications">
          <Applications applyForJob={applyForJob} applications={applications} />
        </div>
      </Tabs>
    </Container>
  );
}
