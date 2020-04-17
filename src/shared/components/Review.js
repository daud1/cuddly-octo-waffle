import { Avatar, Container, SubTitle } from "../../employer/components/Common";

import BeautyStars from "beauty-stars";
import PropTypes from "prop-types";
import React from "react";
import samplePic from "../images/bubalus.png";

const Review = props => {
  const { title, author, rating, description, date_posted } = props.review;
  return (
    <Container mb="30px">
      <Container>
        <Avatar src={samplePic} alt="profile" rounded border width="80px" height="80px" />
      </Container>
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
        <span>"{description}"</span>
        <span>By: {`${author.first_name} ${author.last_name} `}</span>
        <span>{date_posted}</span>
      </Container>
    </Container>
  );
};

Review.propTypes = {
  review: PropTypes.shape({
    title: PropTypes.string.isRequired,
    description: PropTypes.string,
    rating: PropTypes.number.isRequired,
    author: PropTypes.shape({
      first_name: PropTypes.string.isRequired,
      last_name: PropTypes.string.isRequired,
    }),
    date_posted: PropTypes.string.isRequired, //check data type
  }),
};

export default Review;
