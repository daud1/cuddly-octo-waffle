import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import Review from "../Review.js";

import { Title, Container } from "./Common";

import ProfileBanner from "./ProfileBanner";

class Profile extends React.Component {
  state = {
    isOpen: false,
    showEditSocialForm: false
  };

  static propTypes = {
    profile: PropTypes.shape({})
  };

  toggleModal = () => {
    this.setState({ isOpen: !this.state.isOpen });
  };

  toggleEditSocialForm = () => {
    this.setState({ showEditSocialForm: !this.state.showEditSocialForm });
  };

  static propTypes = {};
  render() {
    const social = [
      "Facebook",
      "Twitter",
      "LinkedIn",
      "Behance",
      "Dribble",
      "Github",
      "Twitter",
      "Website",
      "Location"
    ];
    const { showEditSocialForm } = this.state;
    const { profile, reviews } = this.props;

    return (
      // skipped some sections pending discussion and feedback from client
      <>
        <ProfileBanner />
        <Container bb>
          <Container columns className="container" mt="100px" mb="50px">
            <Container columns className="center">
              <Title>{profile.company_name}</Title>
              {/* <i className="fa fa-pencil"></i> */}
              <br />
              {profile.number_of_employees} employees
              {showEditSocialForm ? (
                <Container className="edit-social-links">
                  {social.map(item => (
                    <input placeholder={item} />
                  ))}
                  <span>Cancel</span>
                  <span>Save</span>
                </Container>
              ) : (
                <Container xCenter>
                  <i className="fa fa-facebook"></i>
                  <i className="fa fa-twitter"></i>
                  <i className="fa fa-linkedin"></i>
                  <i className="fa fa-behance"></i>
                  <i className="fa fa-dribbble"></i>
                  <i className="fa fa-github"></i>
                  <i
                    className="fa fa-pencil"
                    onClick={this.toggleEditSocialForm}
                  ></i>
                </Container>
              )}
            </Container>
          </Container>
        </Container>
        <Container mb="50px" bb>
          <Container className="container">
            <Container columns br width="75%" pb="30px">
              <Container mt="30px" mb="30px">
                <Title>About</Title>
              </Container>
              <Container mb="20px">
                <Container width="30%">Moontheme Studio Inc.</Container>
                <Container width="70%" ml="20px" mr="30px">
                  We have been catering to the software development needs across
                  the globe. For all possible technology platforms, we have
                  qualified resources to work with. We are armed with a team of
                  professional, experienced and expert developers, offers
                  end-to-end mobile/web/game applications development services
                  for various platforms including Android, iOS and Windows
                  platform.
                </Container>
              </Container>
              <Container mb="20px">
                <Container width="30%">FIELDS</Container>
                <Container ml="20px" mr="30px" width="70%">
                  {profile.industry}
                </Container>
              </Container>
              <Container mb="20px">
                <Container width="30%">EMPLOYEES</Container>
                <Container width="70%" ml="20px" mr="30px">
                  {profile.number_of_employees} employees
                </Container>
              </Container>
              <Container mb="20px">
                <Container width="30%">INTERESTED IN CANDIDATES FOR</Container>
                <Container width="70%" ml="20px" mr="30px">
                  UI/UX Design Web Design Mobile App Design
                </Container>
              </Container>
              <Container mb="20px">
                <Container width="30%">SALARY RANGE</Container>
                <Container width="70%" ml="20px" mr="30px">
                  $1000 - $1700 USD/month
                </Container>
              </Container>
              <Container mb="20px">
                <Container width="30%">WEBSITE</Container>
                <Container width="70%" ml="20px" mr="30px">
                  www.moontheme.net
                </Container>
              </Container>
              <Container mb="20px">
                <Container width="30%">PHONE NUMBER</Container>
                <Container width="70%" ml="20px" mr="30px">
                  084 52315 3445
                </Container>
              </Container>
              <Container pb="20px" bb>
                <Container width="30%">LOCATION </Container>
                <Container width="70%" ml="20px" mr="30px">
                  {profile.location}
                </Container>
              </Container>
              <Container columns mt="30px">
                <Container mb="30px">
                  <Title>Recent reviews</Title>
                </Container>
                <Container columns>
                  {reviews.map((review, index) => {
                    return <Review review={review} key={index} />;
                  })}
                </Container>
              </Container>
            </Container>
            <Container pd="30px">Who viewed me</Container>
          </Container>
        </Container>
      </>
    );
  }
}

export default Profile;
