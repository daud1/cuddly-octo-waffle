import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";

import athenaLogo from "../../images/sample_profile_pic.jpg";

const Container = styled.div`
  display: flex;
  height: 140px;
  border-bottom: solid 1px #f1f1f1;
  margin: 10px 0;
  padding: 15px 0;
`;

const ImageContainer = styled.div`
  width: 90px;
`;

const Avatar = styled.img`
  width: 60px;
  height: 60px;
  object-fit: cover;
  border-radius: 5px;
`;

const DetailsContainer = styled.div`
  width: 70%;
  display: flex;
  flex-direction: column;
`;

const DetailsRow = styled.div`
  width: 100%;
  margin-bottom: 5px;
`;

const GrayTxt = styled.span`
  color: #aeafae;
`;

const Title = styled.span`
  color: #5847f9;
  font-size: 16px;
`;

const JobItem = props => {
  const { title, company, salary_range, location } = props;
  return (
    <Container>
      <ImageContainer>
        <Avatar src={athenaLogo} alt="logo" />
      </ImageContainer>
      <DetailsContainer>
        <DetailsRow>
          <Title>{title}</Title>
        </DetailsRow>
        <DetailsRow>
          <GrayTxt>In {company}</GrayTxt>
        </DetailsRow>
        <DetailsRow>
          <span>{salary_range}</span>
        </DetailsRow>
        <DetailsRow>
          <GrayTxt>
            <i className="fa fa-map-marker"></i>&nbsp;&nbsp;
            {location}
          </GrayTxt>
        </DetailsRow>
      </DetailsContainer>
    </Container>
  );
};

JobItem.propTypes = {
  title: PropTypes.string.isRequired,
  company: PropTypes.string.isRequired,
  salary_range: PropTypes.string.isRequired,
  location: PropTypes.string.isRequired
};

export default JobItem;
