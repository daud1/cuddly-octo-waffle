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

import { TextBox, Container, Input, Button, RightAlign } from "./Common";

const Label = styled.label`
  font-size: 16px;
  font-weight: normal;
`;

const Error = styled.span`
  color: red;
`;

const SelectField = styled(Field)`
  border-radius: 25px;
  padding: 0 3rem;
  height: 3rem;
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

const RoundButton = styled.button`
  border-radius: 50%;
  border: 0;
`;

const AddButton = styled(RoundButton)`
  color: white;
  background-color: #5355f0;
  font-size: 30px;
  width: 40px;
  height: 40px;
`;

const CancelButton = styled(RoundButton)`
  box-shadow: 0px 0px 20px 8px #e8e7fb;
  color: #989898;
  width: 30px;
  height: 30px;
  margin-right: 6px;
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
        <Container columns mb="20px">
          <Container mb="10px">
            <Container mt="8px" width="80%">
              <Label htmlFor={props.htmlFor}>{props.label}</Label>
            </Container>
            <RightAlign width="20%">
              <AddButton type="button" onClick={() => arrayHelpers.push()}>
                +
              </AddButton>
            </RightAlign>
          </Container>
          {values[name].map((item, index) => (
            <Container key={index} width="100%">
              <Input
                name={`${name}[${index}]`}
                width="90%"
                placeholder="e.g Create, advise on and maintain software projects.."
                mb="10px"
                mr="10px"
              />
              <RightAlign width="10%">
                <CancelButton type="button" onClick={() => arrayHelpers.remove(index)}>
                  x
                </CancelButton>
              </RightAlign>
            </Container>
          ))}
        </Container>
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

                <TextInput
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
                    <Label htmlFor="work_time">Type of Working Time</Label>
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
                    <TextInput
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
