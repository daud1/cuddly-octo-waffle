import React from "react";
import PropTypes from "prop-types";
import samplePic from "../images/bubalus.png";

import { Avatar, Container } from "./employer_dashboard/Common";

const Review = props => {
  const { title, author, rating, description, date_posted } = props.review;
  return (
    <Container mb="30px">
      <Container>
        <Avatar
          src={samplePic}
          alt="profile"
          rounded
          border
          width="80px"
          height="80px"
        />
      </Container>
      <Container ml="20px" columns>
        <span>{title}</span>
        <span>{rating}</span>
        {/* The rating is supposed to be a series of star icons */}
        <span>"{description}"</span>
        <span>By: {author.name}</span>
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
      name: PropTypes.string.isRequired // add remaining properties
    }),
    date_posted: PropTypes.string.isRequired //check data type
  })
};

export default Review;
