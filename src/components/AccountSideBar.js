import React, { Component } from "react";
import { connect } from "react-redux";
import ACTIONS from "../redux/action";
import {
  getNameFromUser,
  getUserImage,
  setAccountProgress
} from "../utils/helpers";
import sampleProfilePic from "../images/sample_profile_pic.jpg";

class AccountSideBar extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentDidMount() {
    const { user } = this.props;
    setAccountProgress(user);
  }

  render() {
    const { user } = this.props;

    return (
      <td className="profile-info-right">
        <div className="gray-bottom-border wrapper-profile-right--bordered">
          <table className="margin-top-and-bottom-2em margin-top-3em">
            <tbody>
              <tr>
                <td className="vertical-align-top width-5-point-5-em">
                  <div className="avatar-medium-2">
                    <img
                      className="center-cropped-medium-2"
                      src={getUserImage(user)}
                      onError={i => (i.target.style.display = "none")}
                      alt="Profile"
                    />
                  </div>
                </td>
                <td className="vertical-align-top">
                  <span className="display-block font-size-10px line-height-3">
                    Welcome Back
                  </span>
                  <span className="display-block smallish-and-blue">
                    {getNameFromUser(user)}
                  </span>
                  <span className="display-block light-grey font-size-10px line-height-3">
                    View your profile&nbsp;&nbsp;
                    <i className="fa fa-caret-right"></i>
                  </span>
                </td>
              </tr>
            </tbody>
          </table>

          <p>Setup your account </p>
          <div id="progressbar">
            <div id="progressIndicator"></div>
            <span>65% </span>
          </div>
          <p id="progressMessage" className="profile-info-right-item">Add your address ( +5% )</p>
        </div>
        <div className="gray-bottom-border wrapper-profile-right--bordered connections">
          <p className="profile-info-right-titles">Connections</p>
          <div className="profile-user-info connections-summary">
            <table>
              <tbody>
                <tr>
                  <td>
                    <div className="connections-summary-inner images-div">
                      <span className="connection-images-outer first">
                        <div className="connection-images-inner">
                          <img
                            src={sampleProfilePic}
                            onError={i => (i.target.style.display = "none")}
                            alt="Profile"
                          />
                        </div>
                      </span>
                      <span className="connection-images-outer">
                        <div className="connection-images-inner">
                          <img
                            src={sampleProfilePic}
                            onError={i => (i.target.style.display = "none")}
                            alt="Profile"
                          />
                        </div>
                      </span>
                      <span className="connection-images-outer">
                        <div className="connection-images-inner">
                          <img
                            src={sampleProfilePic}
                            onError={i => (i.target.style.display = "none")}
                            alt="Profile"
                          />
                        </div>
                      </span>
                      <span className="connection-images-outer">
                        <div className="connection-images-inner">
                          <img
                            src=""
                            onError={i => (i.target.style.display = "none")}
                            alt="Profile"
                          />
                        </div>
                      </span>
                    </div>
                  </td>
                  <td>
                    <div className="connections-summary-inner light-grey font-size-12">
                      <span className="display-block">163 Connections</span>
                      <span className="display-block">290 Followers</span>
                      <span className="display-block">Following 36</span>
                    </div>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
          <div className="light-grey font-size-10px">To see more people</div>
          <div className="margin-top-and-bottom-2em">
            <span className="btn--rounded--tiny">Add Connections</span>
          </div>
        </div>

        <div>
          <span className="profile-info-right-titles">Who Viewed me</span>
          <span className="glyphicon glyphicon-option-horizontal profile-info-right-dots"></span>
        </div>
        <div className="light-grey font-size-12 margin-bottom-1em">
          <span className="bold font-size-14px">19</span> People viewed your
          profile
        </div>
        <div>
          <span className="profile-social-links images profile-info-right-circle overflow-hidden">
            <img
              className="center-cropped-small-no-margin"
              src={sampleProfilePic}
              onError={i => (i.target.style.display = "none")}
              alt="Profile"
            />
          </span>
          <span className="profile-social-links images profile-info-right-circle overflow-hidden">
            <img
              className="center-cropped-small-no-margin"
              src={sampleProfilePic}
              onError={i => (i.target.style.display = "none")}
              alt="Profile"
            />
          </span>
          <span className="profile-social-links images profile-info-right-circle overflow-hidden">
            <img
              className="center-cropped-small-no-margin"
              src={sampleProfilePic}
              onError={i => (i.target.style.display = "none")}
              alt="Profile"
            />
          </span>
          <span className="profile-social-links images profile-info-right-circle overflow-hidden">
            <img
              className="center-cropped-small-no-margin"
              src={sampleProfilePic}
              onError={i => (i.target.style.display = "none")}
              alt="Profile"
            />
          </span>
          <span className="profile-social-links images profile-info-right-circle overflow-hidden">
            <img
              className="center-cropped-small-no-margin"
              src={sampleProfilePic}
              onError={i => (i.target.style.display = "none")}
              alt="Profile"
            />
          </span>
          <span className="profile-social-links images profile-info-right-circle overflow-hidden">
            <img
              className="center-cropped-small-no-margin"
              src={sampleProfilePic}
              onError={i => (i.target.style.display = "none")}
              alt="Profile"
            />
          </span>
          <span className="profile-social-links images profile-info-right-circle overflow-hidden">
            <img
              className="center-cropped-small-no-margin"
              src={sampleProfilePic}
              onError={i => (i.target.style.display = "none")}
              alt="Profile"
            />
          </span>
          <span className="profile-social-links profile-info-right-circle last">
            <p>+12</p>
          </span>
        </div>
      </td>
    );
  }
}

const mapStateToProps = state => ({
  user: state.user
});

const mapDispatchToProps = dispatch => ({
  removeUser: () => dispatch(ACTIONS.removeUser()),
  setLoading: loading => dispatch(ACTIONS.setLoading(loading)),
  setNotification: notification =>
    dispatch(ACTIONS.setNotification(notification))
});

export default connect(mapStateToProps, mapDispatchToProps)(AccountSideBar);
