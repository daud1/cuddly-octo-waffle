import {
  Absolute,
  BriefcaseIcon,
  Button,
  Container,
  DynamicField,
  EditIcon,
  Ellipsis,
  GrayTxt,
  Input,
  InputLabel,
  LabelledInput,
  LabelledTextArea,
  Relative,
  RightAlign,
  SocialIcon,
  SubTitle,
  RoundButton
} from "./Common";
import { Form, Formik } from "formik";

import ProfileBanner from "./ProfileBanner";
import PropTypes from "prop-types";
import React from "react";
import Award from "../../common/components/Award";
import Review from "../../common/components/Review";
import { fetchProfile } from "../reducers";

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
    showEditDescriptionForm: false,
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

  toggleEditDescriptionForm = () => {
    this.setState({
      showEditDescriptionForm: !this.state.showEditDescriptionForm
    });
  };

  render() {
    const social = {
      facebook: "",
      twitter: "",
      linkedin: "",
      behance: "",
      dribbble: "",
      github: "",
      website: ""
    };
    const { profile, reviews, awards, editAward, editProfile } = this.props;
    const {
      showEditAwardsForm,
      showEditDescriptionForm,
      showEditNameForm,
      showEditSocialForm
    } = this.state;

    return (
      <>
        <ProfileBanner
          editProfile={editProfile}
          profile_id={profile.id}
          key={profile.key}
        />
        <Container bb columns>
          {/*Company Name */}
          <Container mt="100px" xCenter>
            {showEditNameForm ? (
              <Formik
                initialValues={{
                  company_name: profile.company_name,
                  number_of_employees: profile.number_of_employees,
                  phone_number: profile.phone_number
                }}
                onSubmit={values => {
                  this.toggleEditNameForm();
                  editProfile(profile.id, profile.key, values);
                }}
              >
                <Container columns mt="5px" width="20%">
                  <Form>
                    <LabelledInput
                      label="Company Name"
                      type="text"
                      name="company_name"
                    />
                    <LabelledInput
                      label="Number of Employees"
                      type="text"
                      name="number_of_employees"
                    />
                    <LabelledInput
                      label="Tel. No"
                      type="text"
                      name="phone_number"
                    />
                    <RightAlign mt="0px" mb="10px">
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
                <SubTitle bold blue>
                  {profile.company_name}
                </SubTitle>
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
                <BriefcaseIcon className="fa fa-briefcase"></BriefcaseIcon>
                {profile.number_of_employees} employees
              </>
            ) : null}
          </Container>
          {/*Social Links & Contact Info */}
          <Container xCenter mt="20px" mb="50px">
            {showEditSocialForm ? (
              <Formik
                initialValues={{ social: profile.social }}
                onSubmit={values =>
                  editProfile(profile.id, profile.key, values)
                }
              >
                <Container width="20%">
                  <Form>
                    <InputLabel>Edit Social Links</InputLabel>
                    <br />
                    {Object.keys(social).map(key => (
                      <Input
                        name={`social[${key}]`}
                        placeholder={key}
                        mb="8px"
                        width="100%"
                      />
                    ))}
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
                {profile.social &&
                  Object.keys(profile.social).map((key, index) => (
                    // TODO: check and don't render icons for fields with no links/empty string
                    <a
                      href={social[key]}
                      target="_blank"
                      rel="noopener noreferrer"
                      key={index}
                    >
                      <SocialIcon className={`fa fa-${key}`}></SocialIcon>
                    </a>
                  ))}
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
                      location: profile.location
                    }}
                    onSubmit={values => {
                      this.toggleEditDescriptionForm();
                      return editProfile(profile.id, profile.key, values);
                    }}
                  >
                    <Form>
                      <Container columns mr="50px">
                        <LabelledTextArea
                          label="Description"
                          name="description"
                        />
                        <LabelledInput
                          label="Field / Industry"
                          type="text"
                          name="industry"
                        />
                        <LabelledInput
                          label="Location"
                          type="text"
                          name="location"
                        />
                        <RightAlign mt="0px" mb="10px">
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
                      heading="Moontheme Studio Inc."
                      fieldValue={profile.description}
                    />
                    <CompanyIntroSec
                      fieldLabel="FIELD / INDUSTRY"
                      fieldValue={profile.industry}
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
                <Relative mt="30px" mb="30px">
                  <Container>
                    <SubTitle bold blue>
                      AWARDS
                    </SubTitle>
                  </Container>
                  <Absolute right="30px">
                    <RoundButton
                      blue
                      type="button"
                      // onClick={() => arrayHelpers.push({})}
                    >
                      +
                    </RoundButton>
                  </Absolute>
                </Relative>
                <Container width="100%" flexWrap>
                  {awards.map((award, _) => (
                    <Award
                      key={award.id}
                      title={award.title}
                      year={award.year}
                      giver={award.awarded_by}
                      editProfile={editProfile}
                    />
                  ))}
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
