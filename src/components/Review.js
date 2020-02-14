import React from "react";
import ReactStars from "react-stars";
// import BeautyStars from "beauty-stars";
import PropTypes from "prop-types";

import samplePic from "../images/bubalus.png";
import { Avatar, Container, BlueSubTitle } from "./employer_dashboard/Common";

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
      <Container ml="30px" ml="20px" columns>
        <BlueSubTitle hoverEffect>{title}</BlueSubTitle>
        <Container mt="10px" mb="10px">
          <ReactStars
            count={5}
            value={rating}
            size={14}
            color1={"#989898"}
            color2={"#3d6de9"}
          />
          {/* <BeautyStars
            value={rating}
            size={14}
            inactiveColor="#989898"
            activeColor="3d6de9"
          /> */}
        </Container>
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
