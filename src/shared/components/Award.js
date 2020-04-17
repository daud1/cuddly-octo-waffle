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
} from "../../employer/components/Common";
import { Field, Form, Formik } from "formik";
import React, { useState } from "react";

import _ from "lodash";

export const currentYear = new Date().getFullYear(),
  YEAR_CHOICES = _.range(1980, currentYear + 1);

export function AwardForm(props) {
  const { handleSubmit, initialValues, showForm, args, awardId } = props;
  return (
    <Formik
      initialValues={{ ...initialValues }}
      validationSchema={yup.object().shape({
        title: yup.string().required("Required"),
        awarded_by: yup.string().required("Required"),
        year: yup.number().required("Required"),
      })}
      onSubmit={(values) => {
        if (awardId) values.id = awardId;
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

export function Award(props) {
  const [display, setDisplay] = useState(false);
  const [awardForm, setAwardFormVisibility] = useState(false);

  const { editAward, title, awarded_by, year, awardId, token } = props;

  return (
    <>
      <Container
        width="calc(95% / 2)"
        mb="30px"
        onMouseEnter={() => setDisplay(true)}
        onMouseLeave={() => setDisplay(false)}
      >
        {awardForm ? (
          <AwardForm
            showForm={setAwardFormVisibility}
            handleSubmit={editAward}
            awardId={awardId}
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
                  onClick={() => setAwardFormVisibility(true)}
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
