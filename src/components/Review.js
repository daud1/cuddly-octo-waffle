import React from "react";
import PropTypes from "prop-types";
import athenaLogo from "../images/sample_profile_pic.jpg";

const Review = props => {
  const { title, author, rating, description, date_posted } = props;
  return (
    <div className="review">
      <img src={athenaLogo} alt="profile" />
      <span>{title}</span>
      <span>{rating}</span>
      {/** The rating is supposed to be a series of star icons */}
      <span>{description}</span>
      <span>By: {author.name}</span>
      <span>{date_posted}</span>
    </div>
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
    date_posted: PropTypes.string.isRequired //fix data type
  })
};

export default Review;
