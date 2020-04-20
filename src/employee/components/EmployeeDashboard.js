import AccountDropDown from "../../auth/components/AccountDropDown";
import { Container } from "../../shared/components/StyledComponents";
import Navbar from "../../shared/components/Navbar";
import Tabs from "../../shared/components/Tabs";
import Profile from "./Profile";
import Applications from "./Applications";
import React from "react";

export default function EmployeeDashboard(props) {
  const {
    profile,
    reviews,
    applications,
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
