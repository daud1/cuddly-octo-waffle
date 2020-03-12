import React, { useState } from "react";

import {
  AwardIcon,
  Button,
  Container,
  EditIcon,
  GrayTxt,
  Input,
  RightAlign,
  SubTitle,
  SelectField,
  YEAR_CHOICES
} from "../../employer/components/Common";
import { Form, Formik } from "formik";

export function Award(props) {
  const [display, setDisplay] = useState(false);
  const [awardForm, setAwardsFormVisibility] = useState(false);

  const { editProfile, title, giver, year } = props;

  return (
    <>
      <Container
        width="calc(95% / 2)"
        mb="20px"
        onMouseEnter={() => setDisplay(true)}
        onMouseLeave={() => setDisplay(false)}
      >
        {awardForm ? (
          <>
            <Formik
              initialValues={{
                title: title,
                giver: giver,
                year: year
              }}
              onSubmit={values => {
                awardForm();
                // return editProfile(values);
              }}
            >
              <Form>
                <Input mb="8px" width="85%" name="title" />
                <Input mb="8px" width="85%" name="giver" />
                <SelectField name="year" as="select" width="85%">
                  {YEAR_CHOICES.map((year, _) => (
                    <option value={year}>{year}</option>
                  ))}
                </SelectField>
                <RightAlign mt="20px" width="85%">
                  <Button
                    white
                    width="60px"
                    mr="15px"
                    onClick={() => setAwardsFormVisibility(false)}
                  >
                    Cancel
                  </Button>
                  <Button width="60px" type="submit">
                    Save
                  </Button>
                </RightAlign>
              </Form>
            </Formik>
          </>
        ) : (
          <>
            <Container width="10%" pt="3px">
              <AwardIcon className="fa fa-empire"></AwardIcon>
            </Container>
            <Container columns width="75%">
              <SubTitle>{props.title}</SubTitle>
              <GrayTxt>{props.giver}</GrayTxt>
              <GrayTxt>{props.year}</GrayTxt>
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

export default Award;
