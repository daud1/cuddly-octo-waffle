import { Container, NothingToDisplay } from "./StyledComponents";

import JobItem from "./JobItem";
import React from "react";
import styled from "styled-components";

const Title = styled.span`
  font-size: 20px;
`;

export function JobList(props) {
  const { title, jobs } = props;
  return (
    <Container columns width="100%">
      <Container columns className="listContainer">
        <Container width="50%" mt="30px" mb="5px">
          <Title>{title}</Title>
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
