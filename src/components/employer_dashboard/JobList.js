import React from "react";
import styled from "styled-components";

import JobItem from "./JobItem";
import BriefProfile from "./BriefProfile";

import { Container } from "./CommonStyles";

const Sticker = styled.div`
  background-color: #a476f5;
  color: #fff;
  text-transform: uppercase;
  width: 90px;
  height: 18px;
  display: flex;
  align-items: center;
  border-radius: 25px 0 0 25px;
  padding-left: 10px;
  font-size: 11px;
  font-weight: 600;
`;

const TrendingContainer = styled(Container)`
  display: flex;
  align-items: center;
  justify-content: flex-end;
  width: 50%;
`;

const JobList = props => {
  const { data } = props;
  return (
    <Container bb>
      <Container className="container">
        {/* left content */}
        <Container columns width="73%" br>
          <Container mt="30px" mb="30px">
            <h4>Connect with people you may know</h4>
          </Container>
          <Container>
            <Container width="50%">
              <BriefProfile />
            </Container>
            <Container width="50%">
              <BriefProfile />
            </Container>
          </Container>
          <Container xCenter yCenter bb height="100px">
            View more
          </Container>
          <Container columns className="listContainer">
            <Container mt="30px">
              <Container width="50%">
                <h4>Trending Jobs</h4>
              </Container>
              <TrendingContainer>
                <Sticker> trending</Sticker>
              </TrendingContainer>
            </Container>
            {data.map((job, index) => (
              <JobItem
                title={job.title}
                company={job.company}
                salary_range={job.salary_range}
                location={job.location}
                key={index}
              />
            ))}
          </Container>
          <Container xCenter mt="70px" mb="30px">
            View more
          </Container>
        </Container>
        {/* Right content */}
        <Container columns width="27%">
          <Container height="30vh" pd="25px">
            Welcome back
          </Container>
          <Container height="30vh" pd="25px" bt bb>
            Connections
          </Container>
          <Container height="30vh" pd="25px">
            Who viewed me
          </Container>
        </Container>
      </Container>
    </Container>
  );
};

export default JobList;
