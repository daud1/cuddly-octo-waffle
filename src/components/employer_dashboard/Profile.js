import React from "react";
import PropTypes from "prop-types";
import sample_cover_pic from "../../images/sample_cover_pic.jpg";
import athenaLogo from "../../images/sample_profile_pic.jpg";

class Profile extends React.Component {
  state = {
    isOpen: false,
    showEditSocialForm: false
  };

  toggleModal = () => {
    this.setState({ isOpen: !this.state.isOpen });
  };

  toggleEditSocialForm = () => {
    this.setState({ showEditSocialForm: !this.state.showEditSocialForm });
  };

  static propTypes = {};
  render() {
    let social = [
      "Facebook",
      "Twitter",
      "LinkedIn",
      "Behance",
      "Dribble",
      "Github",
      "Twitter",
      "Website",
      "Location"
    ];
    const { showEditSocialForm } = this.state;
    const { profile, reviews } = this.props;

    return (
      // skipped some sections pending discussion and feedback from client
      <div className="employer-profile">
        <div className="cover-image">
          <img src={sample_cover_pic} />
          <span>Edit Cover Picture</span>
          {/* Consider using an icon instead of the text for editing cover image*/}
        </div>
        <div className="profile-image">
          <img src={athenaLogo} />
          <i></i> {/* Icon for editing profile picture*/}
        </div>
        <div className="profile-summary">
          {showEditSocialForm ? (
            <div className="edit-social-links">
              {social.map(item => (
                <input placeholder={item} />
              ))}
              <span>Cancel</span>
              <span>Save</span>
            </div>
          ) : (
            <div className="social-links">
              <i className="fa fa-facebook"></i>
              <i className="fa fa-twitter"></i>
              <i className="fa fa-linkedin"></i>
              <i className="fa fa-behance"></i>
              <i className="fa fa-dribbble"></i>
              <i className="fa fa-github"></i>
              <i
                className="fa fa-pencil"
                onClick={this.toggleEditSocialForm}
              ></i>
            </div>
          )}
          <div>
            <span>{profile.company_name}</span>
            <span>{profile.number_of_employees}</span>
          </div>
        </div>
        <div className="about/company-introduction">
          <pre>
            Moontheme Studio Inc. We have been catering to the software
            development needs across the globe. For all possible technology
            platforms, we have qualified resources to work with. We are armed
            with a team of professional, experienced and expert developers,
            offers end-to-end mobile/web/game applications development services
            for various platforms including Android, iOS and Windows platform.
            FIELDS web Services, Design Services
            EMPLOYEES 25
            INTERESTED IN CANDIDATES FOR UI/UX Design Web Design Mobile App Design
            SALARY RANGE $1000 - $1700 USD/month
            WEBSITE www.moontheme.net
            PHONE NUMBER 084 52315 3445 LOCATION Hanoi, Vietnam
          </pre>
        </div>
        <div className="awards"></div>
        <div className="recent-reviews">
          {reviews.map((review, index) => {
            return <Review review={review} key={index} />;
          })}
        </div>
      </div>
    );
  }
}

export default Profile;
