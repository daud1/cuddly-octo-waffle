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
} from "../../shared/components/StyledComponents";
import { Award, AwardForm } from "../../shared/components/Award";
import { Form, Formik, ErrorMessage } from "formik";

import ProfileBanner from "../../shared/components/ProfileBanner";
import PropTypes from "prop-types";
import React from "react";
import Review from "./Review";
import { SectionHeading, IntroSec } from "../../shared/components/StyledComponents";

export default class Profile extends React.Component {
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
                    .length(13)
                    .matches(/^\+[0-9]{12}$/g, { message: "e.g. +256770123456" })
                    .nullable(),
                })}
                onSubmit={values => {
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
                      .matches(/^(?:http(s)?:\/\/github.com\/[\w.-/]+)$/g, {
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
                onSubmit={values => {
                  Object.keys(values.social).forEach(key => {
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
              {/* Company-Intro */}
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
                    onSubmit={values => {
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
                    <IntroSec
                      heading={profile.company_name}
                      fieldValue={profile.description || "--"}
                    />
                    <IntroSec
                      fieldLabel="FIELD / INDUSTRY"
                      fieldValue={profile.industry || "--"}
                    />
                    <IntroSec
                      fieldLabel="LOCATION"
                      fieldValue={profile.location || "--"}
                    />
                  </>
                )}
              </Container>
              {/* Awards */}
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
                    awards.map((award, idx) => (
                      <Award
                        key={idx}
                        award={award}
                        token={profile.key}
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
              {/* Reviews */}
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
            <Container pd="30px">Who Viewed Me</Container>
          </Container>
        </Container>
      </>
    );
  }
}
