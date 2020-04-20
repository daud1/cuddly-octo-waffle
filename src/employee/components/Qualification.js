import * as yup from "yup";

import {
  AwardIcon,
  Button,
  Container,
  EditIcon,
  GrayTxt,
  InputLabel,
  LabelledInput,
  RightAlign,
  SubTitle,
} from "../../shared/components/StyledComponents";
import { Field, Form, Formik } from "formik";
import React, { useState } from "react";

import PropTypes from "prop-types";
import _ from "lodash";

export const currentYear = new Date().getFullYear(),
  YEAR_CHOICES = _.range(1980, currentYear + 1);

export function QualificationForm(props) {
  const { handleSubmit, initialValues, showForm, args, qualificationId } = props;
  return (
    <Formik
      initialValues={{ ...initialValues }}
      validationSchema={yup.object().shape({
        title: yup.string().required("Required"),
        awarded_by: yup.string().required("Required"),
        year: yup.number().required("Required"),
      })}
      onSubmit={values => {
        if (qualificationId) values.id = qualificationId;
        showForm(false);
        handleSubmit(...args, values);
      }}
    >
      <Form className="form">
        <Container columns width="85%">
          <LabelledInput label="Title" type="text" name="title" mb="10px" gray />
          <LabelledInput
            label="Awarded by"
            type="text"
            name="awarded_by"
            mb="10px"
            gray
          />
          <InputLabel gray>Year</InputLabel>
          <Field as="select" name="year">
            {YEAR_CHOICES.map((year, index) => (
              <option value={year} key={index}>
                {year}
              </option>
            ))}
          </Field>
          <RightAlign mt="20px">
            <Button white width="60px" mr="15px" onClick={() => showForm(false)}>
              Cancel
            </Button>
            <Button width="60px" type="submit">
              Save
            </Button>
          </RightAlign>
        </Container>
      </Form>
    </Formik>
  );
}

export function Qualification(props) {
  const [display, setDisplay] = useState(false);
  const [qualificationForm, setFormVisibility] = useState(false);

  const {
    editQualification,
    qualification: { title, awarded_by, year, id: qualificationId },
    token,
  } = props;

  return (
    <>
      <Container
        width="calc(95% / 2)"
        mb="30px"
        onMouseEnter={() => setDisplay(true)}
        onMouseLeave={() => setDisplay(false)}
      >
        {qualificationForm ? (
          <QualificationForm
            showForm={setFormVisibility}
            handleSubmit={editQualification}
            qualificationId={qualificationId}
            initialValues={{ year, awarded_by, title }}
            args={[token]}
          />
        ) : (
          <>
            <Container width="10%" pt="3px">
              <AwardIcon className="fa fa-empire"></AwardIcon>
            </Container>
            <Container columns width="75%">
              <SubTitle>{title}</SubTitle>
              <GrayTxt>{awarded_by}</GrayTxt>
              <GrayTxt>{year}</GrayTxt>
            </Container>
            <Container width="10%">
              {display ? (
                <EditIcon
                  className="fa fa-pencil"
                  onClick={() => setFormVisibility(true)}
                ></EditIcon>
              ) : (
                ""
              )}
            </Container>
          </>
        )}
      </Container>
    </>
  );
}

Qualification.propTypes = {
  qualification: PropTypes.shape({
    id: PropTypes.number.isRequired,
    title: PropTypes.string.isRequired,
    awarded_by: PropTypes.string.isRequired,
    year: PropTypes.number.isRequired,
  }),
  token: PropTypes.string.isRequired,
  editQualification: PropTypes.func.isRequired,
};
