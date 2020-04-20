import * as yup from "yup";

import {
  Container,
  EditIcon,
  LabelledInput,
  SubTitle,
  RightAlign,
  Button,
} from "../../shared/components/StyledComponents";
import React, { useState } from "react";

import BeautyStars from "beauty-stars";
import { Formik, Form } from "formik";
import { LabelledTextArea } from "../../shared/components/StyledComponents";
import PropTypes from "prop-types";

export function ReviewForm(props) {
  const { handleSubmit, initialValues, args, showForm, reviewId } = props;

  return (
    <Formik
      initialValues={{ ...initialValues }}
      validationSchema={yup.object().shape({
        title: yup.string().required("Required"),
        description: yup.string().required("Required"),
        rating: yup.number().required("Required"),
      })}
      onSubmit={values => {
        if (reviewId) values.id = reviewId;
        // handle author_name, date_posted
        showForm(false);
        handleSubmit(...args, values);
      }}
    >
      <Form className="form">
        <Container columns width="85%">
          <LabelledInput label="Title" type="text" name="title" mb="10px" gray />
          <LabelledTextArea
            label="Description"
            name="description"
            placeholder={"Enter your review"}
          />
          <Container mt="10px" mb="10px">
            <BeautyStars // TODO: integrate to work with Formik
              // value={rating}
              size={14}
              inactiveColor="#989898"
              activeColor="3d6de9"
              gap="3px"
            />
          </Container>
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

export function Review(props) {
  const [display, setDisplay] = useState(false);
  const [reviewForm, setReviewFormVisibility] = useState(false);

  const {
    review: { id: reviewId, title, company_name, rating, description, date_posted },
    editReview,
    token,
  } = props;
  return (
    <>
      <Container
        width="calc(95%/2)"
        mb="30px"
        onMouseenter={() => setDisplay(true)}
        onMouseLeave={() => setDisplay(false)}
      >
        {reviewForm ? (
          <ReviewForm
            showForm={setReviewFormVisibility}
            handleSubmit={editReview}
            reviewId={reviewId}
            initialValues={{ title, rating, description, date_posted }}
            args={[token]}
          />
        ) : (
          <Container mb="30px">
            <Container ml="30px" columns>
              <SubTitle blue>{title}</SubTitle>
              <Container mt="10px" mb="10px">
                <BeautyStars
                  value={rating}
                  size={14}
                  inactiveColor="#989898"
                  activeColor="3d6de9"
                  gap="3px"
                />
              </Container>
              <span>{`${company_name}`}</span>
              <span>"{description}"</span>
              <span>{date_posted}</span>
            </Container>
            <Container width="10%">
              {display ? (
                <EditIcon
                  className="fa fa-pencil"
                  onClick={() => setReviewFormVisibility(true)}
                ></EditIcon>
              ) : (
                ""
              )}
            </Container>
          </Container>
        )}
      </Container>
    </>
  );
}

Review.propTypes = {
  review: PropTypes.shape({
    id: PropTypes.number.isRequired,
    title: PropTypes.string.isRequired,
    description: PropTypes.string,
    rating: PropTypes.number.isRequired,
    company_name: PropTypes.string.isRequired,
    date_posted: PropTypes.string.isRequired, //TODO: check data type
  }),
  token: PropTypes.string.isRequired,
  editReview: PropTypes.func.isRequired,
};

export default Review;
