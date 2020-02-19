import * as yup from "yup";
import styled from "styled-components";

import {
  Field,
  FieldArray,
  Form,
  Formik,
  useField,
  useFormikContext
} from "formik";
import React, { Component } from "react";

import { API_URL } from "../../utils/constants";
import axios from "axios";

import { TextBox, Container, Input, Button } from "./Common";

const Label = styled.label`
  font-size: 16px;
  font-weight: normal;
`;

const Error = styled.span`
  color: red;
`;

const Select = styled(Field)`
  // border-radius: 60px;
  height: 3rem;
  // padding: 3rem;
  margin-top: ${props => props.mt};
  margin-bottom: ${props => props.mb};
  border: solid 1px #f1f1f1;
  background-color: #fff;

  &:focus {
    outline: none;
    border: 1px solid #708bf1;
    -moz-box-shadow: 0 0 30px rgb(191, 190, 202);
    -webkit-box-shadow: 0 0 30px rgb(191, 190, 202);
    box-shadow: 0 0 30px rgb(191, 190, 202);
  }
`;

const TextInput = ({ label, ...props }) => {
  const [field, meta] = useField(props);
  return (
    <Container columns mb="2rem">
      <Label htmlFor={props.id || props.name}>{label}</Label>
      <Input {...field} {...props} mt="8px" mb="10px" width="100%" />
      {meta.touched && meta.error ? <Error>{meta.error}</Error> : null}
    </Container>
  );
};

const TextArea = ({ label, ...props }) => {
  const [field, meta] = useField(props);
  return (
    <Container columns mb="2rem">
      <Label htmlFor={props.id || props.name}>{label}</Label>
      <TextBox {...field} {...props} />
      {meta.touched && meta.error ? <Error>{meta.error}</Error> : null}
    </Container>
  );
};

const DynamicListField = ({ name, ...props }) => {
  const { values } = useFormikContext();
  return (
    <FieldArray
      name={name}
      render={arrayHelpers => (
        <div>
          {values[name].map((item, index) => (
            <div key={index}>
              <Field name={`${name}[${index}]`} />
              <button type="button" onClick={() => arrayHelpers.remove(index)}>
                x
              </button>
            </div>
          ))}
          <button type="button" onClick={() => arrayHelpers.push()}>
            +
          </button>
        </div>
      )}
    />
  );
};
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
                <TextInput
                  label="Job Title"
                  type="text"
                  name="title"
                  placeholder="e.g Software Engineer"
                />

                <TextArea
                  label="Description"
                  name="description"
                  placeholder="Enter a job description"
                />
                
                <Label htmlFor="skills_required">Skills Required</Label>
                <DynamicListField name="skills_required" />

                <TextInput
                  label="Primary Role"
                  type="text"
                  name="primary_role"
                  placeholder="e.g Create, advise on and maintain software projects.."
                />

                <Label htmlFor="other_roles">Other Roles</Label>
                <DynamicListField name="other_roles" />

                <Container>
                  <Container columns width="40%" pr="3rem">
                    <Label htmlFor="work_time">Type of Working Time</Label>
                    <Select
                      as="select"
                      name="work_time"
                      placeholder="Full-Time"
                      mt="10px"
                      pl="3rem"
                    >
                      <option value="Full-Time">Full-Time</option>
                      <option value="Part-Time">Part-Time</option>
                    </Select>
                  </Container>
                  <Container columns width="40%" pr="3rem">
                    <TextInput
                      label="Salary Range"
                      type="text"
                      name="salary_range"
                      placeholder="1,000,000 - 2,500,000"
                    />
                  </Container>
                  <Container columns width="20%">
                    <Select as="select" name="currency" placeholder="full-time" mt="35px">
                      <option value="USD">USD</option>
                      <option value="UGX">UGX</option>
                    </Select>
                  </Container>
                </Container>

                <TextInput
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
