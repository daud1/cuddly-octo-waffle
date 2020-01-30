import React, { Component } from "react";
import CreateJobForm from "../components/CreateJobForm";

class EmployerDashboard extends Component {
  render() {
    const { data } = this.props;
    return (
      <div>
        <Modal>
          <CreateJobForm />
        </Modal>
        <JobList data={data} />
      </div>
    );
  }
}
export default EmployerDashboard;
