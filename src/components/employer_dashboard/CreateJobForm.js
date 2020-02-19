import * as yup from "yup";

import { DynamicListField, TextArea, TextInput } from "./Common";
import { Field, Form, Formik } from "formik";
import React, { Component } from "react";

import { API_URL } from "../../utils/constants";
import axios from "axios";

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
      <div className="container">
        <h3 className="section-titles">Post a Job to Athena</h3>
        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={this.createJob}
        >
          <Form>
            <TextInput
              label="Title"
              type="text"
              name="title"
              placeholder="e.g Software Engineer"
            />

            <TextArea
              label="Description"
              name="description"
              placeholder="Enter a job description"
            />

            <label htmlFor="skills_required">Skills Required</label>
            <DynamicListField name="skills_required" />

            <TextInput
              label="Primary Role"
              type="text"
              name="primary_role"
              placeholder="e.g Create, advise on and maintain software projects.."
            />

            <label htmlFor="other_roles">Other Roles</label>
            <DynamicListField name="other_roles" />

            <label htmlFor="work_time">Type of Working Time</label>
            <Field as="select" name="work_time" placeholder="Full-Time">
              <option value="Full-Time">Full-Time</option>
              <option value="Part-Time">Part-Time</option>
            </Field>

            <TextInput
              label="Salary Range"
              type="text"
              name="salary_range"
              placeholder="1,000,000 - 2,500,000"
            />

            <Field as="select" name="currency" placeholder="full-time">
              <option value="USD">USD</option>
              <option value="UGX">UGX</option>
            </Field>

            <TextInput
              label="Location"
              type="text"
              name="location"
              placeholder="e.g Kampala"
            />

            <button type="submit">Post Job</button>
          </Form>
        </Formik>
      </div>
    );
  }
}

export default CreateForm;
