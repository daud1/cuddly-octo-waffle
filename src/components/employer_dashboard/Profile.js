import React from "react";
import PropTypes from "prop-types";
import Review from "../Review.js";

import {
  Title,
  RightAlign,
  Container,
  GrayTxt,
  EditIcon,
  BriefcaseIcon,
  SocialIcon,
  TwitterIcon
} from "./Common";

import ProfileBanner from "./ProfileBanner";

function Award(props) {
  return (
    <Container bb height="120px" pt="20px">
      <Container width="50px">
        <SocialIcon className="fa fa-ellipsis-h"></SocialIcon>
      </Container>
      <Container columns>
        <h5>{props.title}</h5>
        <GrayTxt>{props.Giver}</GrayTxt>
        <GrayTxt>{props.Year}</GrayTxt>
      </Container>
    </Container>
  );
}

function SectionTitle(props) {
  return (
    <Container mt="30px" mb="30px">
      <Title bold>{props.label}</Title>
    </Container>
  );
}

function CompanyIntroSec(props) {
  return (
    <Container mb="20px" width="95%">
      <RightAlign width="35%">
        {props.heading ? (
          <h4>{props.heading}</h4>
        ) : (
          <GrayTxt>{props.fieldLabel}</GrayTxt>
        )}
      </RightAlign>
      <Container width="65%" ml="40px">
        <GrayTxt>{props.fieldValue}</GrayTxt>
      </Container>
    </Container>
  );
}

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
    let social = [
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
        <Container bb columns>
          <Container mt="100px" xCenter>
            <Title bold>{profile.company_name}</Title>
            <EditIcon className="fa fa-pencil" ml="20px"></EditIcon>
          </Container>
          <Container mt="10px" xCenter>
            <BriefcaseIcon className="fa fa-briefcase"></BriefcaseIcon>
            {profile.number_of_employees} employees
          </Container>
          <Container xCenter mt="20px" mb="50px">
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
                <SocialIcon className="fa fa-facebook"></SocialIcon>
                <TwitterIcon className="fa fa-twitter"></TwitterIcon>
                <SocialIcon className="fa fa-linkedin"></SocialIcon>
                <SocialIcon className="fa fa-behance"></SocialIcon>
                <SocialIcon className="fa fa-dribbble"></SocialIcon>
                <SocialIcon className="fa fa-github"></SocialIcon>
                <EditIcon
                  mg="10px"
                  className="fa fa-pencil"
                  onClick={this.toggleEditSocialForm}
                ></EditIcon>
              </Container>
            )}
          </Container>
        </Container>
        <Container mb="30px" bb>
          <Container className="container">
            <Container columns br width="75%" pb="30px">
              <Container columns bb pb="10px">
                <SectionTitle label="COMPANY INTRODUCTION" />
                <CompanyIntroSec
                  heading="Moontheme Studio Inc."
                  fieldValue="We have been catering to the software development needs
                      across the globe. For all possible technology platforms,
                      we have qualified resources to work with. We are armed
                      with a team of professional, experienced and expert
                      developers, offers end-to-end mobile/web/game applications
                      development services for various platforms including
                      Android, iOS and Windows platform."
                />
                <CompanyIntroSec
                  fieldLabel="FIELDS"
                  fieldValue="web Services, Design Services"
                />
                <CompanyIntroSec fieldLabel="EMPLOYEES" fieldValue="30" />
                <CompanyIntroSec
                  fieldLabel="INTERESTED IN CANDIDATES FOR"
                  fieldValue="UI/UX Design Web Design Mobile App Design"
                />
                <CompanyIntroSec
                  fieldLabel="SALARY RANGE"
                  fieldValue="$1000 - $1700 USD/month"
                />
                <CompanyIntroSec
                  fieldLabel="WEBSITE"
                  fieldValue="www.moontheme.net"
                />
                <CompanyIntroSec
                  fieldLabel="PHONE NUMBER"
                  fieldValue="084 52315 3445 Vietnam"
                />
                <CompanyIntroSec
                  fieldLabel="LOCATION"
                  fieldValue="Hanoi, Vietnam"
                />
              </Container>
              {/* Awards section */}
              <Container columns>
                <SectionTitle label="AWARDS" />
                <Award title="Excellent staff" Giver="VNP" Year="2015" />
                <Award title="Excellent staff" Giver="VNP" Year="2015" />
                <Award title="Excellent staff" Giver="VNP" Year="2015" />
              </Container>
              <Container columns>
                <SectionTitle label="RECENT REVIEWS" />
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
