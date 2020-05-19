import * as yup from "yup";

import { Button, Container, Error } from "../../shared/components/StyledComponents";
import { ErrorMessage, Field, Form, Formik } from "formik";

import JobList from "../../shared/components/JobList";
import React from "react";
import { connect } from "react-redux";

export function SearchBar(props) {
  return (
    <>
      <Formik
        initialValues={{ keyword: "" }}
        onSubmit={values => console.log(values)}
        validationSchema={yup.object().shape({
          keyword: yup.string().required("Required!"),
        })}
      >
        <Form>
          <Field type="text" name="keyword" />
          <ErrorMessage component={Error} />

          <Button type="submit">Search</Button>
        </Form>
      </Formik>
    </>
  );
}

class JobSearch extends React.Component {
  render() {
    const { jobs } = this.props;
    return (
      <>
        <Container column>
          <SearchBar />
          <JobList jobs={jobs} />
        </Container>
      </>
    );
  }
}

const mapStateToProps = state => ({
  jobs: state.employer.jobs.jobs,
});

export default connect(mapStateToProps)(JobSearch);
