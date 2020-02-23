import React, { Component } from "react";
import { connect } from "react-redux";
import $ from "jquery";
import Select from "react-select";
import ACTIONS from "../redux/action";
import Navbar from "./Navbar";
import AccountSideBar from "./AccountSideBar";
import Footer from "./Footer";
import AccountDropDown from "../components/auth/AccountDropDown";
import LocationSelector from "../components/LocationSelector";
import {
  dismissOverlay,
  clearInputError,
  setInputError,
  handleHTTPRequest
} from "../utils/helpers";
import { API_URL, GOOGLE_API_KEY } from "../utils/constants";

const skillOptions = [
  { value: "uiUxDesign", label: "UI/UX Design" },
  { value: "webDesign", label: "Web Design" },
  { value: "mobileAppDesign", label: "Mobile App Design" },
  { value: "branding", label: "Branding" }
];

const primaryRoleOptions = [
  { value: "associate", label: "Associate" },
  { value: "intermediate", label: "Intermediate" },
  { value: "senior", label: "Senior" },
  { value: "principle", label: "Principle" }
];

const otherRoleOptions = [
  { value: "intern", label: "Intern" },
  { value: "manager", label: "Manager" }
];

const workingTimeOptions = [
  { value: "fulltime", label: "Fulltime" },
  { value: "parttime", label: "Parttime" }
];

const currencyOptions = [
  { value: "ugx", label: "UGX" },
  { value: "usd", label: "USD" }
];

class PostJob extends Component {
  constructor(props) {
    super(props);
    this.state = {
      jobTitle: "",
      description: "",
      primaryRole: null,
      otherRoles: null,
      workingTime: "",
      lowestSalary: "",
      highestSalary: "",
      currency: currencyOptions[0],
      location: null,
      skillsRequired: null,
      showOtherRoles: false,
      placesOptions: [
        { value: "location", label: "Location" },
      ]
    };
  }

  componentDidMount() {
    $("body").on("click", event => {
      event.preventDefault();
      dismissOverlay(null, [
        "notification-tray",
        "account-dropdown",
        "job-feed-dropdown",
        "message-dropdown",
        "portfolio-upload-modal",
        "portfolio-view-modal",
        "hire-me-modal",
        "freelancers-dropdown",
        "connections-dropdown"
      ]);
    });
  }

  handleInputChange = event => {
    const target = event.target;
    const value = target.value;
    const name = target.name;
    this.setState({ [name]: value });
    clearInputError(name);
    switch (name) {
      case "jobTitle":
        !value
          ? setInputError(name, "Job title required")
          : clearInputError(name);
        break;

      default:
        break;
    }
  };

  handleSelectChange = (name, selectedOption) => {
    this.setState({ [name]: selectedOption });
  };

  handleGoogleLocationAutocompleteChange = location => {
    console.log("LOCATION REQUEST VALUE ===========> ", location);
    const callbacks = {
      success: res => {
        console.log("GOOGLE RES ========> ", res);
        if (res.status === 'OK') {
          const placesOptions = [];
          const { predictions } = res;
          for (let i = 0; i < predictions.length; i++) {
            placesOptions.push({ value: predictions[i].description, label: predictions[i].description })
          }
          this.setState({ placesOptions });
        } else {
          this.setState({ value: location, label: location });
        }
      },
      failure: error => {
        console.log("GOOGLE ERROR ========> ", error);
        this.setState({ value: location, label: location });
      }
    };
    handleHTTPRequest(
      `https://maps.googleapis.com/maps/api/place/autocomplete/json?input=${location}&key=${GOOGLE_API_KEY}`,
      "get",
      callbacks
    );
  };

  submit = event => {
    event.preventDefault();
    const { jobTitle, description, location } = this.state;
    const { setLoading, user } = this.props;
    const data = {
      title: jobTitle,
      description,
      location
    };

    setLoading({ isLoading: true, loadingText: "Submitting job..." });
    const headers = {
      Authorization: `Token ${user.key}`
    };
    const callbacks = {
      success: res => {
        setLoading({ isLoading: false });
        console.log("RESPONSE ===========> ", res);
      },
      failure: error => {
        setLoading({ isLoading: false });
        console.log("ERROR ===========> ", error);
      }
    };

    handleHTTPRequest(`${API_URL}/jobs/`, "post", callbacks, data, headers);
  };

  toggleOtherRoles = event => {
    event.preventDefault();
    const { showOtherRoles, otherRoles } = this.state;
    this.setState({
      showOtherRoles: !showOtherRoles,
      otherRoles: showOtherRoles ? null : otherRoles
    });
  };

  renderOtherRoles = customMultiSelectStyles => {
    const { showOtherRoles, otherRoles } = this.state;
    if (showOtherRoles) {
      return (
        <div>
          <span className="section-sub-titles font-weight-300 margin-top-1em">
            Other Roles
          </span>

          <Select
            styles={customMultiSelectStyles}
            isMulti={true}
            value={otherRoles}
            onChange={selectedOption =>
              this.handleSelectChange("otherRoles", selectedOption)
            }
            options={otherRoleOptions}
            placeholder="Select other roles..."
          />
        </div>
      );
    }
  };

  render() {
    const {
      skillsRequired,
      primaryRole,
      workingTime,
      currency,
      showOtherRoles,
      placesOptions
    } = this.state;

    const customMultiSelectStyles = {
      multiValue: (provided, state) => ({
        ...provided,
        borderRadius: "2em",
        background: "#E7EFF1",
        color: "black",
        fontSize: "11px",
        fontWeight: "600",
        marginRight: ".6em",
        padding: "0.2em 0 0.2em 1.38em"
      }),
      control: (provided, state) => ({
        ...provided,
        border: "none",
        borderRadius: "2em",
        padding: "0 12px"
      }),
      container: (provided, state) => ({
        ...provided,
        border: "1px solid #EBECEC",
        borderRadius: "2em",
        fontSize: "11px",
        padding: "0"
      }),
      multiValueRemove: (provided, state) => ({
        top: "-6px",
        height: "fit-content",
        border: "1px solid #A0A1A2",
        borderRadius: "50%",
        color: "#A0A1A2",
        position: "relative",
        padding: 0,
        lineHeight: 0,
        cursor: "pointer"
      })
    };

    const customSingleSelectStyles = {
      control: (provided, state) => ({
        ...customMultiSelectStyles.control(provided, state)
      }),
      container: (provided, state) => ({
        ...customMultiSelectStyles.container(provided, state),
        flex: 5
      })
    };

    const customCurrencySelectStyles = {
      control: (provided, state) => ({
        ...customMultiSelectStyles.control(provided, state)
      }),
      container: (provided, state) => ({
        ...customMultiSelectStyles.container(provided, state),
        flex: 2,
        margin: "0 0 0 3em"
      })
    };

    return (
      <div>
        <AccountDropDown />
        <Navbar />
        <div
          id="post-a-job"
          className="main-tabcontent gray-top-border"
          style={{ display: "block" }}
        >
          <div className="profile-info-area container__div--dashbord">
            <div className="container">
              <table>
                <tbody>
                  <tr>
                    <td
                      className="profile-info-left vertical-align-top"
                      style={{ paddingRight: "5em" }}
                    >
                      <div style={{ margin: "1em 0 -1em 0", fontSize: "29px" }}>
                        <span className="section-titles">
                          Post a Job to Athena
                        </span>
                      </div>
                      <span className="section-sub-titles font-weight-300">
                        Job Title
                      </span>
                      <input
                        placeholder="e.g Senior Product Designer"
                        className="full-rounded-input narrow active"
                        name="jobTitle"
                        onChange={this.handleInputChange}
                        style={{ fontSize: "11px" }}
                      />
                      <span className="section-sub-titles font-weight-300 margin-top-2em">
                        Description
                      </span>
                      <textarea
                        className="input__text-area--rouded-border"
                        rows="8"
                        placeholder="Enter your description here"
                        name="description"
                        onChange={this.handleInputChange}
                        style={{
                          display: "block",
                          position: "relative",
                          lineHeight: "14.2857px",
                          fontSize: "11px",
                          margin: "0",
                          width: "100%",
                          padding: "1em"
                        }}
                      ></textarea>
                      <span
                        className="italic light-grey font-weight-600 display-block"
                        style={{ margin: "1em", fontSize: "9px" }}
                      >
                        4700 characters remaining
                      </span>
                      <span className="section-sub-titles font-weight-300 margin-top-1em">
                        Primary Role
                      </span>
                      <div
                        className="display-flex"
                        style={{
                          flexDirection: "row",
                          justifyContent: "space-between"
                        }}
                      >
                        <Select
                          styles={customSingleSelectStyles}
                          value={primaryRole}
                          onChange={selectedOption =>
                            this.handleSelectChange(
                              "primaryRole",
                              selectedOption
                            )
                          }
                          options={primaryRoleOptions}
                          placeholder="Select primary role..."
                        />
                        <span
                          style={{
                            flex: 2,
                            display: "flex",
                            flexDirection: "column",
                            justifyContent: "center"
                          }}
                        >
                          <span>
                            <span className="profile-user-info float-right">
                              {showOtherRoles ? "Remove" : "Add"} Other Roles
                            </span>
                            <span
                              onClick={this.toggleOtherRoles}
                              className={`circle-button${
                                showOtherRoles ? " negative" : ""
                                } float-right`}
                            >
                              {showOtherRoles ? "–" : "+"}
                            </span>
                          </span>
                        </span>
                      </div>

                      {this.renderOtherRoles(customMultiSelectStyles)}

                      <span className="section-sub-titles font-weight-300 margin-top-1em">
                        Skills Required
                      </span>

                      <Select
                        styles={customMultiSelectStyles}
                        isMulti={true}
                        value={skillsRequired}
                        onChange={selectedOption =>
                          this.handleSelectChange(
                            "skillsRequired",
                            selectedOption
                          )
                        }
                        options={skillOptions}
                        placeholder="Select skills..."
                      />

                      <table>
                        <tbody>
                          <tr>
                            <td style={{ padding: "0 2em 0 0", width: "30%" }}>
                              <span className="section-sub-titles font-weight-300 margin-top-1em">
                                Type of working time
                              </span>
                              <Select
                                styles={customSingleSelectStyles}
                                value={workingTime}
                                onChange={selectedOption =>
                                  this.handleSelectChange(
                                    "workingTime",
                                    selectedOption
                                  )
                                }
                                options={workingTimeOptions}
                                placeholder="Select working time..."
                              />
                            </td>
                            <td>
                              <span className="section-sub-titles font-weight-300 margin-top-1em">
                                Salary Range
                              </span>
                              <span className="display-flex flex-direction-row justify-content-space-between">
                                <input
                                  placeholder="Lowest"
                                  name="lowestSalary"
                                  type="number"
                                  onChange={this.handleInputChange}
                                  className="full-rounded-input narrow"
                                  style={{
                                    fontSize: "11px",
                                    width: "12em",
                                    flex: 2
                                  }}
                                />
                                <span
                                  style={{
                                    display: "flex",
                                    flexDirection: "column",
                                    justifyContent: "center",
                                    flex: 1,
                                    textAlign: "center"
                                  }}
                                >
                                  —
                                </span>
                                <input
                                  placeholder="Highest"
                                  name="highestSalary"
                                  type="number"
                                  onChange={this.handleInputChange}
                                  className="full-rounded-input narrow"
                                  style={{
                                    fontSize: "11px",
                                    width: "12em",
                                    flex: 2
                                  }}
                                />
                                <Select
                                  styles={customCurrencySelectStyles}
                                  value={currency}
                                  onChange={selectedOption =>
                                    this.handleSelectChange(
                                      "currency",
                                      selectedOption
                                    )
                                  }
                                  options={currencyOptions}
                                  placeholder="Select currency..."
                                />
                              </span>
                            </td>
                          </tr>
                        </tbody>
                      </table>
                      <span className="section-sub-titles font-weight-300 margin-top-1em">
                        Add Location
                      </span>
                      {/* <input
                        placeholder="e.g Hanoi"
                        name="location"
                        onChange={this.handleInputChange}
                        className="full-rounded-input narrow"
                        style={{ fontSize: "11px" }}
                      /> */}
                      {/* <Select
                        styles={customSingleSelectStyles}
                        value={location}
                        onChange={this.handleGoogleLocationAutocompleteChange}
                        options={placesOptions}
                        placeholder="Search for location..."
                      /> */}
                      <LocationSelector
                        styles={customSingleSelectStyles}
                        options={placesOptions}
                        handleGoogleLocationAutocompleteChange={this.handleGoogleLocationAutocompleteChange}
                      />
                      <div style={{ margin: "2.5em 0 6em 0" }}>
                        <button
                          className="full-rounded-button gradient"
                          style={{ padding: "0.8em 2.5em", marginLeft: "0" }}
                          onClick={this.submit}
                        >
                          Post Job Now
                        </button>
                        <button
                          className="full-rounded-button button-shadow"
                          style={{ color: "black", padding: "0.8em 4em" }}
                        >
                          Cancel
                        </button>
                      </div>
                    </td>
                    <AccountSideBar />
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
          <Footer />
        </div>
      </div>
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

export default connect(mapStateToProps, mapDispatchToProps)(PostJob);
