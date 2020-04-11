import React from "react";

import AccountDropDown from "../../auth/components/AccountDropDown";
import CreateJobForm from "./CreateJobForm";
import Footer from "../../shared/components/Footer";
import Modal from "../../shared/components/Modal";
import NavBar from "../../shared/components/Navbar";
import { PostButton } from "./Common";
import Profile from "./Profile";
import Projects from "./Projects";
import Tabs from "../../shared/components/Tabs";
import styled from "styled-components";

const Container = styled.div`
  font-size: 13px;
`;

export default function EmployerDashboard(props) {
  const {
    profile,
    awards,
    jobs,
    reviews,
    editLoggedInProfile,
    editAward,
    addAward,
    addJob
  } = props;

  return (
    <Container>
      <NavBar />
      <AccountDropDown />

      <Modal
        height="80%"
        width="50%"
        profileId={profile.id}
        token={profile.key}
        addJob={addJob}
        render={props => CreateJobForm(props)}
        openButton={props => <PostButton onClick={props.onClose}>Post a Job</PostButton>}
      />
      <Tabs>
        <div label="Profile">
          <Profile
            editProfile={editLoggedInProfile}
            editAward={editAward}
            addAward={addAward}
            profile={profile}
            reviews={reviews}
            awards={awards}
          />
        </div>
        <div label="Projects">
          <Projects jobs={jobs} />
        </div>
        <div label="Inbox"></div>
        <div label="Feedback"></div>
      </Tabs>
      <Footer />
    </Container>
  );
}
