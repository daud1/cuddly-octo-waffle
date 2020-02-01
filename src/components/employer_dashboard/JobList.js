import React from "react";
import JobItem from "./JobItem";

const JobList = props => {
  const { data } = props;
  return (
    <div>
      {data.map((job, index) => (
        <JobItem
          title={job.title}
          company={job.company}
          salary_range={job.salary_range}
          location={job.location}
          key={index}
        />
      ))}
    </div>
  );
};

export default JobList;
