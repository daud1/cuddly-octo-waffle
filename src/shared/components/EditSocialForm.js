import * as yup from "yup";

import {
  Button,
  Container,
  Error,
  Input,
  RightAlign,
  SubTitle,
} from "./StyledComponents";
import { ErrorMessage, Form, Formik } from "formik";

import React from "react";

export default function EditSocialForm(props) {
  const { initialValues, onSubmit, toggleForm } = props;
  const social = {
    facebook: "",
    twitter: "",
    linkedin: "",
    behance: "",
    dribbble: "",
    github: "",
    website: "",
  };
  return (
    <Formik
      initialValues={initialValues}
      validationSchema={yup.object().shape({
        social: yup.object().shape({
          facebook: yup.string().matches(/^(?:http(s)?:\/\/facebook.com\/[\w.-/]+)$/g, {
            message: "eg. https://facebook.com/myProfile",
          }),
          twitter: yup.string().matches(/^(?:http(s)?:\/\/twitter.com\/[\w.-/]+)$/g, {
            message: "eg. https://twitter.com/myProfile",
          }),
          linkedin: yup
            .string()
            .matches(/^(?:http(s)?:\/\/linkedin.com\/in\/[\w.-/]+)$/g, {
              message: "eg. https://linkedin.com/in/myProfile",
            }),
          behance: yup.string().matches(/^(?:http(s)?:\/\/behance.com\/[\w.-/]+)$/g, {
            message: "eg. https://behance.com/myProfile",
          }),
          dribbble: yup.string().matches(/^(?:http(s)?:\/\/dribbble.com\/[\w.-/]+)$/g, {
            message: "eg. https://dribbble.com/myProfile",
          }),
          github: yup.string().matches(/^(?:http(s)?:\/\/github.com\/[\w.-/]+)$/g, {
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
      onSubmit={values => onSubmit(values)}
    >
      <Container width="20%" mt="5px">
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
            <Button white width="60px" mr="15px" onClick={toggleForm}>
              Cancel
            </Button>
            <Button width="60px">Save</Button>
          </RightAlign>
        </Form>
      </Container>
    </Formik>
  );
}
