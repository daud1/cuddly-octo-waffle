import React from "react";
import { JobItem } from "./JobItem";

class JobList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    const { data } = this.props;
    return (
      <div>
        {data.map((job, index) => {
          <JobItem
            title={job.title}
            company={job.company}
            salary_range={job.salary_range}
            location={job.location}
            key={index}
          />;
        })}
      </div>
    );
  }
}

export default JobItem