import * as yup from "yup";

import {
  Button,
  Container,
  Error,
  Input,
} from "../../shared/components/StyledComponents";
import { ErrorMessage, Form, Formik } from "formik";

import AccountDropDown from "../../auth/components/AccountDropDown";
import JobList from "../../shared/components/JobList";
import NavBar from "../../shared/components/Navbar";
import React from "react";
import { connect } from "react-redux";

class JobSearch extends React.Component {
  render() {
    function SearchBar(props) {
      return (
        <Formik
          initialValues={{ title: "", industry: "", location: "" }}
          onSubmit={values => console.log(values)}
          validationSchema={yup.object().shape({
            title: yup.string().required("Required!"),
          })}
        >
          <Form>
            <Container row xCenter>
              <>
                <Input
                  type="text"
                  name="title"
                  width="65%"
                  placeholder="e.g. Software Engineer"
                />
                <ErrorMessage component={Error} name="title" />
              </>

              <Button type="submit">Search</Button>
            </Container>

            <Container column xCenter>
              <p>Filter by:</p>
              <Input as="select" name="location" placeholder="Location" width="12.5%">
                <option value="">Location</option>
                <option value="Uganda">Uganda</option>
                <option value="Kenya">Kenya</option>
                <option value="Tanzania">Tanzania</option>
              </Input>

              <Input as="select" name="industry" width="12.5%">
                <option value="">Industry</option>
                <option value="Finance">Finance</option>
                <option value="IT/Software Engineering">IT/Software Engineering</option>
                <option value="Public Health">Public Health</option>
              </Input>
            </Container>
            {/* using span tags as links */}
          </Form>
        </Formik>
      );
    }

    const { jobs } = this.props;
    return (
      <Container xCenter columns>
        <NavBar />
        <AccountDropDown />
        <SearchBar />
        <JobList jobs={jobs} />
      </Container>
    );
  }
}

const mapStateToProps = state => ({
  jobs: state.employer.jobs.jobs,
});

export default connect(mapStateToProps)(JobSearch);
