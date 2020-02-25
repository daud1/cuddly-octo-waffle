import * as yup from "yup";

import { Form, Formik } from "formik";
import React, { Component } from "react";

import { API_URL } from "../../utils/constants";
import axios from "axios";

import {
  Container,
  Button,
  SelectField,
  InputLabel,
  LabelledInput,
  LabelledTextArea,
  DynamicListField
} from "./Common";

class CreateForm extends Component {
  createJob = values => {
    const { loggedInProfileId } = this.props;
    const url = `${API_URL}/jobs/`;
    const headers = { Authorization: `Token ${localStorage.getItem("key")}` };
    values["employer_id"] = loggedInProfileId;

    axios
      .post(url, values, { headers })
      .then(response => {
        console.log(response);
      })
      .catch(error => {
        console.error(error);
      });
  };

  render() {
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
      skills_required: yup.string(),
      primary_role: yup.string().required("Required"),
      work_time: yup
        .string()
        .required("Required")
        .oneOf(["full-time", "part-time"]),
      salary_range: yup.string(),
      location: yup.string().required("Required")
    });

    return (
      <Container bb>
        <Container className="container">
          <Container width="70%" br columns pr="7rem">
            <h3 className="section-titles">Post a Job to Athena</h3>
            <Formik
              initialValues={initialValues}
              validationSchema={validationSchema}
              onSubmit={this.createJob}
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

                <DynamicListField
                  name="other_roles"
                  label="Add other Roles"
                  htmlFor="other_roles"
                />

                <DynamicListField
                  name="skills_required"
                  label="Skills Required"
                  htmlFor="skills_required"
                />

                <Container>
                  <Container columns width="40%" pr="3rem">
                    <InputLabel htmlFor="work_time">
                      Type of Working Time
                    </InputLabel>
                    <SelectField
                      as="select"
                      name="work_time"
                      mt="10px"
                      pl="3rem"
                    >
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
                  <Button white width="120px" height="30px" type="button">
                    Cancel
                  </Button>
                </Container>
              </Form>
            </Formik>
          </Container>
          <Container width="30%">Who viewed me</Container>
        </Container>
      </Container>
    );
  }
}

export default CreateForm;
