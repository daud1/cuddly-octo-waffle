import { Container, NothingToDisplay } from "../../shared/components/StyledComponents";

import JobItem from "./JobItem";
import React from "react";
import styled from "styled-components";

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

const Title = styled.span`
  font-size: 20px;
`;

export function JobList(props) {
  const { title, stickerLabel, jobs } = props;
  return (
    <Container columns width="100%">
      <Container columns className="listContainer">
        <Container mt="30px" mb="5px">
          <Container width="50%">
            <Title>{title}</Title>
          </Container>
          <TrendingContainer>
            <Sticker>{stickerLabel}</Sticker>
          </TrendingContainer>
        </Container>
        {jobs.length > 0 ? (
          <Container scrollable columns>
            {jobs.map((job, index) => (
              <JobItem
                title={job.title}
                company={job.employer.company_name}
                salary_range={job.salary_range}
                location={job.location}
                key={index}
              />
            ))}
          </Container>
        ) : (
          <NothingToDisplay mt="10px" />
        )}
      </Container>
    </Container>
  );
}

export default JobList;
