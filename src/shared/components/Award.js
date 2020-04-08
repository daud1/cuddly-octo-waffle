import {
  AwardIcon,
  Button,
  Container,
  EditIcon,
  GrayTxt,
  InputLabel,
  LabelledInput,
  RightAlign,
  SubTitle
} from "../../employer/components/Common";
import { Field, Form, Formik } from "formik";
import React, { useState } from "react";

import _ from "lodash";

export const YEAR_CHOICES = _.range(1980, new Date().getFullYear() + 1);

export function AwardForm(props) {
  const { onClose } = props;
  return (
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
          <Button white width="60px" mr="15px" onClick={onClose}>
            Cancel
          </Button>
          <Button width="60px" type="submit">
            Save
          </Button>
        </RightAlign>
      </Container>
    </Form>
  );
}

export function Award(props) {
  const [display, setDisplay] = useState(false);
  const [awardForm, setAwardsFormVisibility] = useState(false);

  const { editAward, title, awarded_by, year, id, token } = props;

  return (
    <>
      <Container
        width="calc(95% / 2)"
        mb="30px"
        onMouseEnter={() => setDisplay(true)}
        onMouseLeave={() => setDisplay(false)}
      >
        {awardForm ? (
          <Formik
            initialValues={{
              title: title,
              awarded_by: awarded_by,
              year: year
            }}
            onSubmit={values => {
              values.id = id;
              setAwardsFormVisibility(false);
              editAward(token, values);
            }}
          >
            <AwardForm onClose={() => setAwardsFormVisibility(false)} />
          </Formik>
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
                  onClick={() => setAwardsFormVisibility(true)}
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
