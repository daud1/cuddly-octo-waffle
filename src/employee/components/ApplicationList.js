import { Container, NothingToDisplay } from "../../shared/components/StyledComponents";

import Application from "./Application";
import React from "react";

export function ApplicationList(props) {
  const { applications } = props;
  return (
    <Container columns width="100%">
      <Container columns className="listContainer">
        {applications.length > 0 ? (
          <Container scrollable columns>
            {applications.map(appl => (
              <Application
                job={appl.job}
                applicant={appl.applicant}
                resume={appl.resume}
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

export default ApplicationList;
