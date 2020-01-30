import React from "react";

const JobItem = ({ props }) => {
  const { title, company, salary_range, location } = props;
  return (
    <div className="job-item">
      <div className="avatar-logo"></div>
      <div className="job-details">
        <span>{title}</span>
        <span>{company}</span>
        <span>{salary_range}</span>
        <span>{location}</span>
      </div>
      <hr />
    </div>
  );
};

export default JobItem;
