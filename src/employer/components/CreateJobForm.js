import * as yup from "yup";

import {
  Button,
  Container,
  DynamicField,
  InputLabel,
  LabelledInput,
  LabelledTextArea,
  ListField,
  SelectField
} from "./Common";
import { Form, Formik } from "formik";

import { API_URL } from "../../common/utils/constants";
import PropTypes from "prop-types";
import React from "react";
import axios from "axios";

const CreateJobForm = props => {
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
    primary_role: yup.string().required("Required"),
    work_time: yup
      .string()
      .required("Required")
      .oneOf(["full-time", "part-time"]),
    salary_range: yup.string(),
    location: yup.string().required("Required")
  });

  return (
    <Container columns width="100%">
      <h3 className="section-titles">Post a Job to Athena</h3>
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={values => {
          const { loggedInProfileId } = this.props;
          const url = `${API_URL}/jobs/`;
          const headers = {
            Authorization: `Token ${localStorage.getItem("key")}`
          };
          values["employer_id"] = loggedInProfileId;

          axios
            .post(url, values, { headers })
            .then(response => {
              console.log(response);
            })
            .catch(error => {
              console.error(error);
            });
        }}
      >
        <Form>
          <LabelledInput
            label="Job Title"
            type="text"
            name="title"
            placeholder="e.g Software Engineer"
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

          <Container>
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
                <option value="USD">USD</option>
                <option value="UGX">UGX</option>
              </SelectField>
            </Container>
          </Container>

          <LabelledInput
            label="Location"
            type="text"
            name="location"
            placeholder="e.g Kampala"
          />
          <Container mt="5rem" mb="10rem">
            <Button type="submit" width="120px" mr="30px" height="30px">
              Post Job Now
            </Button>
            <Button
              white
              width="120px"
              height="30px"
              type="button"
              onClick={props.onClose}
            >
              Cancel
            </Button>
          </Container>
        </Form>
      </Formik>
    </Container>
  );
};

CreateJobForm.propTypes = {
  onClose: PropTypes.func
};
export default CreateJobForm;
