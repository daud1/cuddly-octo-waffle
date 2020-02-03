import React, { Component } from "react";

import CreateJobForm from "../components/employer_dashboard/CreateJobForm";
import JobList from "../components/employer_dashboard/JobList";
import Modal from "../components/generic/Modal";
import Tabs from "../components/Tabs";
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
        <Tabs>
          <div label="Dashboard">
            <JobList data={seed} />
          </div>
          <div label="My Projects">
            <JobList data={seed} />
            <Modal>
              <CreateJobForm />
            </Modal>
          </div>
          <div label="Profile"></div>
          <div label="Inbox"></div>
          <div label="Feedback"></div>
        </Tabs>
        <Footer />
      </div>
    );
  }1
}

export default EmployerDashboard;
