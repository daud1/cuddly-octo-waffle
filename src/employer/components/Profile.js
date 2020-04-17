import * as yup from "yup";

import {
  Absolute,
  BriefcaseIcon,
  Button,
  Container,
  EditIcon,
  GrayTxt,
  Input,
  Error,
  LabelledInput,
  LabelledTextArea,
  NothingToDisplay,
  Relative,
  RightAlign,
  RoundButton,
  SocialIcon,
  SubTitle,
} from "./Common";
import { Award, AwardForm } from "../../shared/components/Award";
import { Form, Formik, ErrorMessage } from "formik";

import ProfileBanner from "./ProfileBanner";
import PropTypes from "prop-types";
import React from "react";
import Review from "../../shared/components/Review";

function SectionHeading(props) {
  const { onClick, editOption } = props;
  return (
    <Relative mt="30px" mb="30px">
      <Container>
        <SubTitle bold blue>
          {props.label}
        </SubTitle>
      </Container>
      {editOption ? (
        <Absolute right="30px">
          <EditIcon onClick={onClick} className="fa fa-pencil"></EditIcon>
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
        {props.heading ? <h4>{props.heading}</h4> : <GrayTxt>{props.fieldLabel}</GrayTxt>}
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
    showAddAwardForm: false,
    showEditDescriptionForm: false,
    showEditNameForm: false,
    showEditReviewsForm: false,
  };

  static propTypes = {
    profile: PropTypes.shape({}),
  };

  toggleEditSocialForm = () => {
    this.setState({ showEditSocialForm: !this.state.showEditSocialForm });
  };

  toggleEditNameForm = () => {
    this.setState({ showEditNameForm: !this.state.showEditNameForm });
  };

  toggleEditDescriptionForm = () => {
    this.setState({
      showEditDescriptionForm: !this.state.showEditDescriptionForm,
    });
  };

  toggleAddAwardForm = () => {
    this.setState({ showAddAwardForm: !this.state.showAddAwardForm });
  };

  render() {
    const social = {
      facebook: "",
      twitter: "",
      linkedin: "",
      behance: "",
      dribbble: "",
      github: "",
      website: "",
    };
    const { profile, reviews, awards, addAward, editProfile, editAward } = this.props;
    const {
      showAddAwardForm,
      showEditDescriptionForm,
      showEditNameForm,
      showEditSocialForm,
    } = this.state;
    const keys = Object.keys(profile.social);

    return (
      <>
        <ProfileBanner
          editProfile={editProfile}
          profileId={profile.id}
          token={profile.key}
        />
        <Container bb columns>
          {/*Company Name */}
          <Container mt="100px" xCenter>
            {showEditNameForm ? (
              <Formik
                initialValues={{
                  company_name: profile.company_name,
                  number_of_employees: profile.number_of_employees,
                  phone_number: profile.phone_number,
                }}
                validationSchema={yup.object().shape({
                  company_name: yup.string().nullable(),
                  number_of_employees: yup.string().nullable(),
                  phone_number: yup
                    .string()
                    .matches(/^[+][0-9]{12}$/g, { message: "e.g. +256770123456" })
                    .nullable(),
                })}
                onSubmit={(values) => {
                  this.toggleEditNameForm();
                  editProfile(profile.id, profile.key, values);
                }}
              >
                <Container columns mt="5px" width="20%">
                  <Form>
                    <Container mb="15px">
                      <SubTitle blue bold>
                        Edit Company details
                      </SubTitle>
                    </Container>

                    <LabelledInput
                      label="Company Name"
                      type="text"
                      name="company_name"
                      mb="10px"
                      gray
                    />

                    <LabelledInput
                      label="Number of Employees"
                      type="text"
                      name="number_of_employees"
                      mb="10px"
                      gray
                    />

                    <LabelledInput
                      label="Tel. No"
                      type="text"
                      name="phone_number"
                      mb="10px"
                      placeholder="+256770123456"
                      gray
                    />

                    <RightAlign mt="10px" mb="10px">
                      <Button
                        white
                        width="60px"
                        mr="15px"
                        onClick={this.toggleEditNameForm}
                      >
                        Cancel
                      </Button>

                      <Button width="60px" type="submit">
                        Save
                      </Button>
                    </RightAlign>
                  </Form>
                </Container>
              </Formik>
            ) : (
              <>
                {profile.company_name ? (
                  <SubTitle bold blue>
                    {profile.company_name}
                  </SubTitle>
                ) : (
                  <GrayTxt>Edit company details</GrayTxt>
                )}
                <EditIcon
                  className="fa fa-pencil"
                  ml="20px"
                  onClick={this.toggleEditNameForm}
                ></EditIcon>
              </>
            )}
          </Container>
          {/*Profile Summary */}
          <Container mt="10px" xCenter>
            {!showEditNameForm ? (
              <>
                {profile.number_of_employees ? (
                  <>
                    <BriefcaseIcon className="fa fa-briefcase"></BriefcaseIcon>
                    {profile.number_of_employees} employees
                    <br />
                    {profile.phone_number}
                  </>
                ) : (
                  ""
                )}
              </>
            ) : null}
          </Container>
          {/*Social Links & Contact Info */}
          <Container xCenter mt="20px" mb="50px">
            {showEditSocialForm ? (
              <Formik
                initialValues={{ social: profile.social }}
                validationSchema={yup.object().shape({
                  social: yup.object().shape({
                    facebook: yup
                      .string()
                      .matches(/^(?:http(s)?:\/\/facebook.com\/[\w.-/]+)$/g, {
                        message: "eg. https://facebook.com/myProfile",
                      }),
                    twitter: yup
                      .string()
                      .matches(/^(?:http(s)?:\/\/twitter.com\/[\w.-/]+)$/g, {
                        message: "eg. https://twitter.com/myProfile",
                      }),
                    linkedin: yup
                      .string()
                      .matches(/^(?:http(s)?:\/\/linkedin.com\/in\/[\w.-/]+)$/g, {
                        message: "eg. https://linkedin.com/in/myProfile",
                      }),
                    behance: yup
                      .string()
                      .matches(/^(?:http(s)?:\/\/behance.com\/[\w.-/]+)$/g, {
                        message: "eg. https://behance.com/myProfile",
                      }),
                    dribbble: yup
                      .string()
                      .matches(/^(?:http(s)?:\/\/dribbble.com\/[\w.-/]+)$/g, {
                        message: "eg. https://dribbble.com/myProfile",
                      }),
                    github: yup
                      .string()
                      .matches(/^(?:http(s)?:\/\/linkedin.com\/in\/[\w.-/]+)$/g, {
                        message: "eg. https://github.com/myProfile",
                      }),
                    website: yup
                      .string()
                      .matches(
                        /^(?:http(s)?:\/\/)[\w.-]+(?:\.[\w.-]+)+[\w\-._~:/?#[\]@!$&'()*+,;=.]+$/g,
                        { message: "eg. https://www.mywebsite.com/ or www.website.com" }
                      ),
                  }),
                })}
                onSubmit={(values) => {
                  Object.keys(values.social).forEach((key) => {
                    if (!values.social[key].trim()) delete values.social[key];
                  });
                  editProfile(profile.id, profile.key, values);
                  this.toggleEditSocialForm();
                }}
              >
                <Container width="30%" xCenter>
                  <Form>
                    <Container mb="10px" xCenter>
                      <SubTitle blue bold>
                        Edit Social Links
                      </SubTitle>
                    </Container>
                    {Object.keys(social).map((key, idx) => {
                      const field = `social.${key}`;
                      return (
                        <>
                          <Input
                            name={field}
                            placeholder={key}
                            mb="8px"
                            mt="8px"
                            width="270px"
                            key={idx}
                          />
                          <div>
                            <ErrorMessage component={Error} name={field} />
                          </div>
                        </>
                      );
                    })}
                    <RightAlign mt="15px">
                      <Button
                        white
                        width="60px"
                        mr="15px"
                        onClick={this.toggleEditSocialForm}
                      >
                        Cancel
                      </Button>
                      <Button width="60px">Save</Button>
                    </RightAlign>
                  </Form>
                </Container>
              </Formik>
            ) : (
              <Container xCenter>
                {keys.length ? (
                  keys.map((key, idx) => (
                    <a
                      href={profile.social[key]}
                      target="_blank"
                      rel="noreferrer noopener"
                      key={idx}
                    >
                      <SocialIcon className={`fa fa-${key}`}></SocialIcon>
                    </a>
                  ))
                ) : (
                  <GrayTxt>Add social links</GrayTxt>
                )}
                <EditIcon
                  ml="10px"
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
                <SectionHeading
                  label="COMPANY INTRODUCTION"
                  editOption
                  onClick={this.toggleEditDescriptionForm}
                />
                {showEditDescriptionForm ? (
                  <Formik
                    initialValues={{
                      description: profile.description,
                      industry: profile.industry,
                      location: profile.location,
                    }}
                    validationSchema={yup.object().shape({
                      description: yup.string().nullable(),
                      industry: yup.string().nullable(),
                      location: yup.string().nullable(),
                    })}
                    onSubmit={(values) => {
                      this.toggleEditDescriptionForm();
                      return editProfile(profile.id, profile.key, values);
                    }}
                  >
                    <Form>
                      <Container columns mr="50px">
                        <LabelledTextArea label="Description" name="description" gray />

                        <LabelledInput
                          label="Field / Industry"
                          type="text"
                          name="industry"
                          mb="10px"
                          gray
                        />

                        <LabelledInput
                          label="Location"
                          type="text"
                          name="location"
                          gray
                        />

                        <RightAlign mt="25px" mb="30px">
                          <Button
                            white
                            width="60px"
                            mr="15px"
                            onClick={this.toggleEditDescriptionForm}
                          >
                            Cancel
                          </Button>

                          <Button width="60px" type="submit">
                            Save
                          </Button>
                        </RightAlign>
                      </Container>
                    </Form>
                  </Formik>
                ) : (
                  <>
                    <CompanyIntroSec
                      heading={profile.company_name}
                      fieldValue={profile.description || "--"}
                    />
                    <CompanyIntroSec
                      fieldLabel="FIELD / INDUSTRY"
                      fieldValue={profile.industry || "--"}
                    />
                    <CompanyIntroSec
                      fieldLabel="LOCATION"
                      fieldValue={profile.location || "--"}
                    />
                  </>
                )}
              </Container>
              {/* Awards section */}
              <Container columns bb pb="20px">
                <Relative mt="30px" mb="30px">
                  <Container>
                    <SubTitle bold blue>
                      AWARDS
                    </SubTitle>
                  </Container>
                  <Absolute right="30px">
                    <RoundButton blue type="button" onClick={this.toggleAddAwardForm}>
                      +
                    </RoundButton>
                  </Absolute>
                </Relative>
                <Container width="100%" flexWrap>
                  {awards.length > 0 ? (
                    awards.map((award, _) => (
                      <Award
                        key={award.id}
                        awardId={award.id}
                        token={profile.key}
                        title={award.title}
                        year={award.year}
                        awarded_by={award.awarded_by}
                        editAward={editAward}
                      />
                    ))
                  ) : (
                    <NothingToDisplay />
                  )}

                  {showAddAwardForm ? (
                    <AwardForm
                      showForm={this.toggleAddAwardForm}
                      args={[profile.id, profile.key]}
                      handleSubmit={addAward}
                      initialValues={{ title: "", year: 2020, awarded_by: "" }}
                    />
                  ) : null}
                </Container>
              </Container>
              {/* Reviews section */}
              <Container columns>
                <SectionHeading label="RECENT REVIEWS" />
                <Container columns>
                  {reviews.length > 0 ? (
                    reviews.map((review, index) => {
                      return <Review review={review} key={index} />;
                    })
                  ) : (
                    <NothingToDisplay />
                  )}
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
