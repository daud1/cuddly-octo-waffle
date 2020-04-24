import ApplicationList from "./ApplicationList";
import { Container } from "../../shared/components/StyledComponents";
import React from "react";

export default function Applications(props) {
  const { applications, applyForJob } = props;
  return (
    <Container>
      <ApplicationList applications={applications} applyForJob={applyForJob} />
    </Container>
  );
}
