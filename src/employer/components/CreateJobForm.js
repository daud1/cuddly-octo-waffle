import * as yup from "yup";

import {
  Button,
  Container,
  DynamicField,
  InputLabel,
  LabelledInput,
  LabelledTextArea,
  ListField,
  RightAlign,
  SelectField,
  SubTitle
} from "./Common";
import { Form, Formik } from "formik";

import PropTypes from "prop-types";
import React from "react";

const initialValues = {
  title: "",
  description: "",
  skills_required: [],
  primary_role: "",
  other_roles: [],
  salary_range: "",
  currency: "UGX",
  work_time: "Full-Time",
  location: ""
};

const validationSchema = yup.object().shape({
  title: yup.string().required("Required"),
  description: yup.string().required("Required"),
  skills_required: yup.array().of(yup.string()),
  other_roles: yup.array().of(yup.string()),
  primary_role: yup.string(),
  work_time: yup
    .string()
    .oneOf(["Full-Time", "Part-Time"])
    .required("Required"),
  salary_range: yup.string(),
  currency: yup.string().required("Required"),
  location: yup.string().required("Required")
});

export default function CreateJobForm(props) {
  const { profileId, token, addJob, onClose } = props;

  return (
    <Container columns width="100%">
      <Container mb="20px">
        <SubTitle blue bold>
          Post a Job to Athena
        </SubTitle>
      </Container>

      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={values => {
          addJob(profileId, token, values);
          onClose();
        }}
      >
        <Form>
          <LabelledInput
            label="Job Title"
            type="text"
            name="title"
            placeholder="e.g Software Engineer"
            mb="15px"
          />

          <LabelledTextArea
            label="Description"
            name="description"
            placeholder="Enter a job description"
          />

          <LabelledInput
            label="Primary Role"
            type="text"
            name="primary_role"
            placeholder="e.g Create, advise on and maintain software projects.."
            mb="15px"
          />

          <DynamicField
            name="other_roles"
            label="Add Other Roles"
            htmlFor="other_roles"
            render={ListField}
          />

          <DynamicField
            name="skills_required"
            label="Skills Required"
            htmlFor="skills_required"
            render={ListField}
          />

          <Container mb="20px">
            <Container columns width="40%" pr="3rem">
              <InputLabel htmlFor="work_time">Type of Working Time</InputLabel>
              <SelectField as="select" name="work_time" mt="10px" pl="3rem">
                <option value="Full-Time">Full-Time</option>
                <option value="Part-Time">Part-Time</option>
              </SelectField>
            </Container>
            <Container columns width="45%" pr="3rem">
              <LabelledInput
                label="Salary Range"
                type="text"
                name="salary_range"
                placeholder="1,000,000 - 2,500,000"
              />
            </Container>
            <Container columns width="15%">
              <SelectField as="select" name="currency" mt="35px">
                <option value="UGX">UGX</option>
                <option value="USD">USD</option>
              </SelectField>
            </Container>
          </Container>

          <LabelledInput
            label="Location"
            type="text"
            name="location"
            placeholder="e.g Kampala"
            mb="15px"
          />

          <RightAlign mt="3rem" mb="3rem">
            <Button mr="30px" white width="120px" height="30px" onClick={onClose}>
              Cancel
            </Button>
            <Button width="120px" height="30px" type="submit">
              Post Job Now
            </Button>
          </RightAlign>
        </Form>
      </Formik>
    </Container>
  );
}

CreateJobForm.propTypes = {
  onClose: PropTypes.func.isRequired,
  addJob: PropTypes.func.isRequired,
  profileId: PropTypes.number.isRequired,
  token: PropTypes.string.isRequired
};
