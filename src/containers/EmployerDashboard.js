import React, { Component } from "react";

import CreateJobForm from "../components/employer_dashboard/CreateJobForm";
import JobList from "../components/employer_dashboard/JobList";
import Modal from "../components/generic/Modal";
import Footer from "../components/Footer";

class EmployerDashboard extends Component {
  render() {
    const seed = [
      {
        title: "Software Engineer",
        company: "KanzuCode",
        salary_range: "1,200,000 - 2,300,000",
        location: "Kampala"
      },
      {
        title: "Personal Assistant",
        company: "ADU Limited",
        salary_range: "600,000 - 1,300,000",
        location: "Mbale"
      },
      {
        title: "Lab Assistant",
        company: "Lancet Laboratories Inc. ",
        salary_range: "1,600,000 - 2,600,000",
        location: "Jinja, Uganda"
      },
      {
        title: "Teaching Assistant",
        company: "International School of Uganda",
        salary_range: "1,800,000 - 2,900,000",
        location: "Lubowa, Entebbe"
      }
    ];
    // const { data } = this.props;
    return (
      <div>
        <Modal>
          <CreateJobForm />
        </Modal>
        <JobList data={seed} />
        <Footer />
      </div>
    );
  }
}

export default EmployerDashboard;
