import React from "react";
import PropTypes from "prop-types";
import sample_cover_pic from "../images/sample_cover_pic.jpg";
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
    return (
      <div className="employer-profile">
        <div className="cover-image">
          <img src={sample_cover_pic} />
          <span>Edit Cover Picture</span>
        </div>
        <div className="profile-image">
          <img src={athenaLogo} />
          <i></i>
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
        </div>
      </div>
    );
  }
}

export default Profile;
