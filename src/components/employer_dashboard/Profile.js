import {
  Absolute,
  AwardIcon,
  BlueSubTitle,
  BriefcaseIcon,
  Button,
  Container,
  EditIcon,
  Ellipsis,
  GrayTxt,
  Relative,
  RightAlign,
  SocialIcon,
  TextArea,
  TextInput,
  TwitterIcon
} from "./Common";
import { Form, Formik } from "formik";

import ProfileBanner from "./ProfileBanner";
import PropTypes from "prop-types";
import React from "react";
import Review from "../Review.js";

function Award(props) {
  return (
    <Container width="calc(100% / 3)" pb="20px">
      <Container width="50px" pt="10px">
        <AwardIcon className="fa fa-empire"></AwardIcon>
      </Container>
      <Container columns>
        <h4>{props.title}</h4>
        <GrayTxt>{props.Giver}</GrayTxt>
        <GrayTxt>{props.Year}</GrayTxt>
      </Container>
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
    showEditSocialForm: false,
    showEditAwardsForm: false,
    showEditIntroForm: false,
    showEditNameForm: false,
    showEditReviewsForm: false
  };

  static propTypes = {
    profile: PropTypes.shape({})
  };

  toggleEditSocialForm = () => {
    this.setState({ showEditSocialForm: !this.state.showEditSocialForm });
  };

  toggleEditNameForm = () => {
    this.setState({ showEditNameForm: !this.state.showEditNameForm });
  };

  toggleEditAwardsForm = () => {
    this.setState({ showEditAwardsForm: !this.state.showEditAwardsForm });
  };

  toggleEditDescriptionForm = () => {
    this.setState({
      showEditDescriptionForm: !this.state.showEditDescriptionForm
    });
  };

  toggleEditReviewsForm = () => {
    this.setState({ showEditReviewsForm: !this.state.showEditReviewsForm });
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
    const {
      profile,
      reviews,
      awards,
      editAwards,
      editProfile,
      editReviews
    } = this.props;

    const {
      showEditAwardsForm,
      showEditIntroForm,
      showEditNameForm,
      showEditReviewsForm,
      showEditSocialForm
    } = this.state;

    return (
      <>
        <ProfileBanner />
        <Container bb columns>
          {/*Company Name */}
          <Container mt="100px" xCenter>
            {showEditNameForm ? (
              <>
                <BlueSubTitle bold>{profile.company_name}</BlueSubTitle>
                <EditIcon
                  className="fa fa-pencil"
                  ml="20px"
                  onClick={this.toggleEditNameForm}
                ></EditIcon>
              </>
            ) : (
              <Formik
                initialValues={{ company_name: "" }}
                onSubmit={editProfile}
              >
                <Form>
                  <TextInput
                    label="Edit Company Name"
                    type="text"
                    name="company_name"
                    placeholder="e.g Software Engineer"
                  />
                  <button type="submit">Save</button>
                  <button onClick={this.toggleEditNameForm}>Cancel</button>
                </Form>
              </Formik>
            )}
          </Container>
          {/*Profile Summary */}
          <Container mt="10px" xCenter>
            <BriefcaseIcon className="fa fa-briefcase"></BriefcaseIcon>
            {profile.number_of_employees} employees
          </Container>
          {/*Social Links & Contact Info */}
          <Container xCenter mt="20px" mb="50px">
            {showEditSocialForm ? (
              <Container columns>
                <Formik initialValues={{}} onSubmit={editProfile}>
                  <Form>
                    {social.map(item => (
                      <TextInput placeholder={item} />
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
                  </Form>
                </Formik>
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
              {/* Company-Intro section */}
              <Container columns bb pb="10px">
                <SectionHeading label="COMPANY INTRODUCTION" editOption />
                {showEditIntroForm ? (
                  <>
                    <Formik
                      initialValues={{ description: "" }}
                      onSubmit={editProfile}
                    >
                      <Form>
                        <TextArea
                          label="Edit Company Introduction"
                          name="description"
                          placeholder="e.g Software Engineer"
                        />
                        <button type="submit">Save</button>
                        <button onClick={this.toggleEditDescriptionForm}>
                          Cancel
                        </button>
                      </Form>
                    </Formik>
                  </>
                ) : (
                  <>
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
                      fieldValue={profile.industry}
                    />
                    <CompanyIntroSec
                      fieldLabel="EMPLOYEES"
                      fieldValue={profile.number_of_employees}
                    />
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
                      fieldValue={profile.phone_number}
                    />
                    <CompanyIntroSec
                      fieldLabel="LOCATION"
                      fieldValue={profile.location}
                    />
                  </>
                )}
              </Container>
              {/* Awards section */}
              <Container columns bb pb="20px">
                <SectionHeading label="AWARDS" editOption />
                {showEditAwardsForm ? (
                  <Formik initialValues={awards} onSubmit={editAwards}>
                    <Form>
                      <TextInput
                        label="Title"
                        type="text"
                        name="title"
                        placeholder="Fastest Growing SME"
                      />
                      <TextInput
                        label="Awarding Body"
                        type="text"
                        name="awarded_by"
                        placeholder="URA"
                      />
                      <TextInput
                        label="Year"
                        type="number"
                        name="year"
                        placeholder="2009"
                      />
                      <button type="submit">Save</button>
                      <button onClick={this.toggleEditAwardsForm}>
                        Cancel
                      </button>
                    </Form>
                  </Formik>
                ) : (
                  <Container width="100%" wrap>
                    {awards.map((award, index) => (
                      <Award
                        title={award.title}
                        Giver={award.awarded_by}
                        Year={award.year}
                      />
                    ))}
                  </Container>
                )}
              </Container>
              {/* Reviews section */}
              <Container columns>
                <SectionHeading label="RECENT REVIEWS" />
                {showEditReviewsForm ? (
                  <Formik initialValues={reviews} onSubmit={editReviews}>
                    <Form>
                      <TextInput
                        label="Title"
                        type="text"
                        name="title"
                        placeholder="Fastest Growing SME"
                      />
                      <TextInput
                        label="Awarding Body"
                        type="text"
                        name="awarded_by"
                        placeholder="URA"
                      />
                      <TextInput
                        label="Year"
                        type="number"
                        name="year"
                        placeholder="2009"
                      />
                      <button type="submit">Save</button>
                      <button onClick={this.toggleEditReviewsForm}>
                        Cancel
                      </button>
                    </Form>
                  </Formik>
                ) : (
                  <Container columns>
                    {reviews.map((review, index) => {
                      return <Review review={review} key={index} />;
                    })}
                  </Container>
                )}
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
