import * as yup from "yup";

import {
  Absolute,
  Button,
  Container,
  EditIcon,
  GrayTxt,
  InputLabel,
  IntroSec,
  LabelledInput,
  LabelledTextArea,
  NothingToDisplay,
  Relative,
  RightAlign,
  RoundButton,
  SectionHeading,
  SocialIcon,
  SubTitle,
} from "../../shared/components/StyledComponents";
import { Field, Form, Formik } from "formik";
import { Qualification, QualificationForm } from "./Qualification";

import EditSocialForm from "../../shared/components/EditSocialForm";
import ProfileBanner from "../../shared/components/ProfileBanner";
import React from "react";
import { Review } from "./Review";

const EXP_CHOICES = ["0 - 2 years", "2 - 4 years", "4 - 8 years", "8+ years"];
export default class Profile extends React.Component {
  state = {
    showEditSocialForm: false, // website, github, linked_in
    showEditBioForm: false, // intro, profession(s), years_of_experience
    showAddQualificationForm: false, //certificates et al.
    showEditNameForm: false, // name and phone_number
  };

  toggleEditSocialForm = () => {
    this.setState({ showEditSocialForm: !this.state.showEditSocialForm });
  };
  toggleEditBioForm = () => {
    this.setState({ showEditBioForm: !this.state.showEditBioForm });
  };
  toggleAddQualificationForm = () => {
    this.setState({ showAddQualificationForm: !this.state.showAddQualificationForm });
  };
  toggleEditNameForm = () => {
    this.setState({ showEditNameForm: !this.state.showEditNameForm });
  };

  render() {
    const {
      profile,
      reviews,
      qualifications,
      editProfile,
      editReview,
      addQualification,
      editQualification,
    } = this.props;
    const {
      showEditSocialForm,
      showEditBioForm,
      showAddQualificationForm,
      showEditNameForm,
    } = this.state;
    const social = { linkedin: "", behance: "", dribbble: "", github: "", website: "" },
      keys = Object.keys(social);

    return (
      <>
        <ProfileBanner
          editProfile={editProfile}
          profileId={profile.id}
          token={profile.key}
        />

        <Container bb columns>
          {/*Name*/}
          <Container mt="100px" mb="20px" xCenter>
            {showEditNameForm ? (
              <Formik
                initialValues={{
                  name: profile.name,
                }}
                validationSchema={yup.object().shape({
                  name: yup.string().required("Required!"),
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
                        Edit your details
                      </SubTitle>
                    </Container>

                    <LabelledInput label="Name" type="text" name="name" mb="10px" gray />

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
                {profile.name ? (
                  <SubTitle bold blue>
                    {profile.name}
                  </SubTitle>
                ) : (
                  <GrayTxt>Add your name</GrayTxt>
                )}
                <EditIcon
                  className="fa fa-pencil"
                  ml="20px"
                  onClick={this.toggleEditNameForm}
                ></EditIcon>
              </>
            )}
          </Container>

          {/* Social Links */}
          <Container mt="10px" mb="20px" xCenter>
            {showEditSocialForm ? (
              <EditSocialForm
                initialValues={{ social: profile.social }}
                toggleForm={this.toggleEditSocialForm}
                onSubmit={values => {
                  Object.keys(values.social).forEach(key => {
                    if (!values.social[key].trim()) delete values.social[key];
                  });
                  editProfile(profile.id, profile.key, values);
                  this.toggleEditSocialForm();
                }}
              />
            ) : keys.length ? (
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
              <GrayTxt>Add links</GrayTxt>
            )}
            <EditIcon
              ml="10px"
              className="fa fa-pencil"
              onClick={this.toggleEditSocialForm}
            ></EditIcon>
          </Container>
        </Container>

        <Container mb="30px" bb>
          <Container className="container">
            <Container columns br width="75%" pb="30px">
              {/*Bio/Resume */}
              <Container columns bb pb="10px">
                <SectionHeading
                  label="ABOUT ME"
                  editOption
                  onClick={this.toggleEditBioForm}
                />
                {showEditBioForm ? (
                  <Formik
                    initialValues={{
                      intro: profile.intro,
                      industry: profile.industry,
                      years_of_experience: profile.location,
                      phone_number: profile.phone_number,
                    }}
                    validationSchema={yup.object().shape({
                      intro: yup.string().nullable(),
                      industry: yup.string().nullable(),
                      years_of_experience: yup.string().nullable(),
                      phone_number: yup
                        .string()
                        .length(13)
                        .matches(/^\+[0-9]{12}$/g, { message: "e.g. +256770123456" })
                        .nullable(),
                    })}
                    onSubmit={values => {
                      this.toggleEditBioForm();
                      return editProfile(profile.id, profile.key, values);
                    }}
                  >
                    <Form>
                      <Container columns mr="50px">
                        <LabelledTextArea label="About Me" name="intro" gray />

                        <LabelledInput
                          label="Field / Industry"
                          type="text"
                          name="industry"
                          mb="10px"
                          gray
                        />

                        <InputLabel gray>Experience</InputLabel>
                        <Field as="select" name="years_of_experience">
                          {EXP_CHOICES.map((exp, idx) => (
                            <option value={exp} key={idx}>
                              {exp}
                            </option>
                          ))}
                        </Field>

                        <RightAlign mt="25px" mb="30px">
                          <Button
                            white
                            width="60px"
                            mr="15px"
                            onClick={this.toggleEditBioForm}
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
                      heading={profile.name || "NAME"}
                      fieldValue={profile.intro || "--"}
                    />
                    <IntroSec
                      fieldLabel="FIELD / INDUSTRY"
                      fieldValue={profile.industry || "--"}
                    />
                    <IntroSec
                      fieldLabel="EXPERIENCE"
                      fieldValue={profile.years_of_experience || "--"}
                    />
                    <IntroSec
                      fieldLabel="PHONE NUMBER"
                      fieldValue={profile.phone_number || "--"}
                    />
                  </>
                )}
              </Container>

              {/** Qualifications */}
              <Container columns bb pb="20px">
                <Relative mt="30px" mb="30px">
                  <Container>
                    <SubTitle bold blue>
                      QUALIFICATIONS
                    </SubTitle>
                  </Container>

                  <Absolute right="30px">
                    <RoundButton
                      blue
                      type="button"
                      onClick={this.toggleAddQualificationForm}
                    >
                      +
                    </RoundButton>
                  </Absolute>
                </Relative>

                <Container width="100%" flexWrap>
                  {qualifications.length > 0 ? (
                    qualifications.map((qualification, idx) => (
                      <Qualification
                        qualification={qualification}
                        key={idx}
                        editQualification={editQualification}
                        token={profile.key}
                      />
                    ))
                  ) : (
                    <NothingToDisplay />
                  )}

                  {showAddQualificationForm ? (
                    <QualificationForm
                      toggleForm={this.toggleAddQualificationForm}
                      args={[profile.id, profile.key]}
                      handleSubmit={addQualification}
                      initialValues={{ title: "", year: 2020, awarded_by: "" }}
                    />
                  ) : null}
                </Container>
              </Container>

              {/** Reviews */}
              <Container columns bb pb="20px">
                <SectionHeading label="RECENT REVIEWS" />
                <Container columns>
                  {reviews.length > 0 ? (
                    reviews.map((review, idx) => (
                      <Review
                        review={review}
                        key={idx}
                        editReview={editReview}
                        token={profile.key}
                      />
                    ))
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
