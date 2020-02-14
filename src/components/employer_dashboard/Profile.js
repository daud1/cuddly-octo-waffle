import React from "react";
import PropTypes from "prop-types";
import Review from "../Review.js";

import {
  BlueSubTitle,
  RightAlign,
  Container,
  Absolute,
  Relative,
  GrayTxt,
  EditIcon,
  BriefcaseIcon,
  SocialIcon,
  TwitterIcon,
  Ellipsis,
  AwardIcon,
  Input,
  Button
} from "./Common";

import ProfileBanner from "./ProfileBanner";

function Award(props) {
  return (
    <Container pd="20px" bl columns width="calc(100% / 3)">
      <h4>{props.title}</h4>
      <GrayTxt>{props.Giver}</GrayTxt>
      <GrayTxt>{props.Year}</GrayTxt>
    </Container>
  );
}

function SectionHeading(props) {
  return (
    <Relative mt="30px" mb="30px">
      <Container>
        <BlueSubTitle bold>{props.label}</BlueSubTitle>
      </Container>
      {props.editOption ? (
        <Absolute right="30px">
          <EditIcon className="fa fa-pencil"></EditIcon>
        </Absolute>
      ) : (
        ""
      )}
    </Relative>
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
            <BlueSubTitle bold>{profile.company_name}</BlueSubTitle>
            <EditIcon className="fa fa-pencil" ml="20px"></EditIcon>
          </Container>
          <Container mt="10px" xCenter>
            <BriefcaseIcon className="fa fa-briefcase"></BriefcaseIcon>
            {profile.number_of_employees} employees
          </Container>
          <Container xCenter mt="20px" mb="50px">
            {showEditSocialForm ? (
              <Container columns>
                {social.map(item => (
                  <Input placeholder={item} />
                ))}
                <Container mt="15px">
                  <Button
                    white
                    width="60px"
                    mr="15px"
                    onClick={this.toggleEditSocialForm}
                  >
                    Cancel
                  </Button>
                  <Button width="60px">Save</Button>
                </Container>
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
                <SectionHeading label="COMPANY INTRODUCTION" editOption />
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
                <SectionHeading label="AWARDS" editOption />
                <Container bl bt>
                  <Container width="50px" xCenter pt="30px;" bb>
                    <AwardIcon className="fa fa-empire"></AwardIcon>
                  </Container>
                  <Container wrap bb width="calc(100% - 50px)">
                    <Award title="Excellent staff" Giver="VNP" Year="2015" />
                    <Award title="Excellent staff" Giver="VNP" Year="2016" />
                    <Award title="Excellent staff" Giver="VNP" Year="2017" />
                  </Container>
                </Container>
              </Container>
              {/* Reviews section */}
              <Container columns>
                <SectionHeading label="RECENT REVIEWS" />
                <Container columns>
                  {reviews.map((review, index) => {
                    return <Review review={review} key={index} />;
                  })}
                </Container>
                <Container xCenter mt="40px">
                  <GrayTxt bigger>Load More Reviews</GrayTxt>
                  <Ellipsis className="fa fa-ellipsis-h" />
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
