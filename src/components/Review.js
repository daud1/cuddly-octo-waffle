import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";

import samplePic from "../images/bubalus.png";
import { Avatar, Container, BlueSubTitle } from "./employer_dashboard/Common";

const Star = styled.i`
  color: ${props => (props.full ? "#3d6de9" : "#989898")};
  margin-right: 5px;
`;

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
        {/* to be replaced */}
        <Container mt="10px" mb="10px">
          <Star className="fa fa-star" full />
          <Star className="fa fa-star" full />
          <Star className="fa fa-star" full />
          <Star className="fa fa-star" />
          <Star className="fa fa-star" />
        </Container>
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
