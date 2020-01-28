import React from "react";

const EmployerProfile = props => {
  const { profile } = props;
  return (
    <div>
      <h3>{profile.company_name}</h3>
      <div className="contact-info">
        <span>{profile.user.phone_number}</span>
        <span>{profile.user.email}</span>
      </div>
      <div className="company-info">
        <span>{profile.industry}</span>
        <span>{profile.description}</span>
        <span>{profile.number_of_employees}</span>
      </div>
      <div></div>
    </div>
  );
};

export default EmployerProfile;
