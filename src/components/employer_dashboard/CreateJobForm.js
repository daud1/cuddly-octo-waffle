import React, { Component } from "react";
import axios from "axios";
import * as yup from "yup";
import { Formik, Form, Field, useField } from "formik";
import { API_URL } from "../../utils/constants";

const TextInput = ({ label, ...props }) => {
  const [field, meta] = useField(props);
  return (
    <>
      <label htmlFor={props.id || props.name}>{label}</label>
      <input {...field} {...props} />
      {meta.touched && meta.error ? <div>{meta.error}</div> : null}
    </>
  );
};

const TextArea = ({ label, ...props }) => {
  const [field, meta] = useField(props);
  return (
    <>
      <label htmlFor={props.id || props.name}>{label}</label>
      <textarea {...field} {...props} />
      {meta.touched && meta.error ? <div>{meta.error}</div> : null}
    </>
  );
};

class CreateForm extends Component {
  render() {
    return (
      <div>
        <h3 className="section-titles">Post a Job to Athena</h3>
        <Formik
          initialValues={{
            title: "",
            description: "",
            skills_required: "",
            primary_role: "",
            salary_range: "",
            currency: "UGX",
            work_time: "full-time",
            location: ""
          }}
          validationSchema={yup.object().shape({
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
          })}
          onSubmit={values => {
            let url = `${API_URL}/jobs/`;
            // massage values to insert employer_id and format array fields
            values["employer_id"] = 2;

            // implement error handling and implementation for success-case
            axios
              .post(url, values, {
                headers: {
                  Authorization: `Token ${localStorage.getItem("key")}`,
                  "content-type": "application/json"
                }
              })
              .then(response => {})
              .catch(error => {});
          }}
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

            <TextArea
              label="Skills Required"
              name="skills_required"
              placeholder="Enter the pre-requisite skills and qualifications"
            />

            <TextInput
              label="Primary Role"
              type="text"
              name="primary_role"
              placeholder="e.g Create, advise on and maintain software projects.."
            />

            <label htmlFor="work_time">Type of Working Time</label>
            <Field as="select" name="work_time" placeholder="full-time">
              <option value="full-time">Full-Time</option>
              <option value="part-time">Part-Time</option>
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
