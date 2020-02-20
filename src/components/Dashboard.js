import React, { Component } from "react";
import { connect } from "react-redux";
import ACTIONS from "../redux/action";
import Footer from "./Footer";
import AccountSideBar from "./AccountSideBar";
import { connectToPerson, hideElement } from "../utils/helpers";
import sampleProfilePic from "../images/sample_profile_pic.jpg";

const peopleYouMayKnow = [
  {
    id: 1,
    image: sampleProfilePic,
    name: "Steve Munich",
    title: "Hanoi, Vietnam · Worked at @Dell...",
    category: "Product Design ( Web, Mobile App)",
    experience: "7 Years of Experience",
    availability: "48 Number of hours per week"
  },
  {
    id: 2,
    image: sampleProfilePic,
    name: "Fujihoshoto",
    title: "Tokyo, Japan · Worked at @Samsung...",
    category: "Product Design ( Web, Mobile App)",
    experience: "7 Years of Experience",
    availability: "48 Number of hours per week"
  }
];

const trendingJobs = [
  {
    id: 1,
    image: sampleProfilePic,
    title: "AI Technology That Takes Notes During Your Conversations",
    owner: "David churst",
    category: "Frontend Software Engineer, Graphic Design",
    salary: "$85k - $140k",
    type: "Full Time",
    location: "Hanoi, Vietnam"
  },
  {
    id: 2,
    image: sampleProfilePic,
    title: "Design identity for Townsville Affordable Bathroom Renovations",
    owner: "In Vectra company",
    category: "Graphic Design, Illustrator, Logo Design",
    salary: "$85k - $140k",
    type: "Full Time",
    location: "Hanoi, Vietnam"
  },
  {
    id: 3,
    image: sampleProfilePic,
    title: "Design identity for Townsville Affordable Bathroom Renovations",
    owner: "In Vectra company",
    category: "Graphic Design, Illustrator, Logo Design",
    salary: "$85k - $140k",
    type: "Full Time",
    location: "Hanoi, Vietnam"
  },
  {
    id: 4,
    image: sampleProfilePic,
    title: "Design identity for Townsville Affordable Bathroom Renovations",
    owner: "In Vectra company",
    category: "Graphic Design, Illustrator, Logo Design",
    salary: "$85k - $140k",
    type: "Full Time",
    location: "Hanoi, Vietnam"
  },
  {
    id: 5,
    image: sampleProfilePic,
    title: "Design identity for Townsville Affordable Bathroom Renovations",
    owner: "In Vectra company",
    category: "Graphic Design, Illustrator, Logo Design",
    salary: "$85k - $140k",
    type: "Full Time",
    location: "Hanoi, Vietnam"
  },
  {
    id: 6,
    image: sampleProfilePic,
    title: "Design identity for Townsville Affordable Bathroom Renovations",
    owner: "In Vectra company",
    category: "Graphic Design, Illustrator, Logo Design",
    salary: "$85k - $140k",
    type: "Full Time",
    location: "Hanoi, Vietnam"
  }
];

class Dashboard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      peopleYouMayKnow: [],
      trendingJobs: []
    };
  }

  componentDidMount() {
    this.fetchPeopleYouMayKnow(1);
    this.fetchTrendingJobs(1);
  }

  fetchPeopleYouMayKnow(page) {
    if (peopleYouMayKnow) {
      this.setState({ peopleYouMayKnow });
    }
  }

  fetchTrendingJobs(page) {
    if (trendingJobs) {
      this.setState({ trendingJobs });
    }
  }

  renderPeopleYouMayKnow() {
    const { peopleYouMayKnow } = this.state;
    if (peopleYouMayKnow) {
      return peopleYouMayKnow.map((item, index) => {
        return (
          <td id={`person${item.id}`} key={index}>
            <table>
              <tbody>
                <tr>
                  <td className="vertical-align-top">
                    <div className="avatar-medium">
                      <img
                        className="center-cropped-medium-no-padding"
                        src={item.image}
                        onError={i => (i.target.style.display = "none")}
                        alt="Profile"
                      />
                    </div>
                  </td>
                  <td className="vertical-align-top">
                    <span className="display-block smallish-and-blue">
                      {item.name}
                    </span>
                    <span className="display-block light-grey font-size-10px line-height-3">
                      {item.title}
                    </span>
                    <span className="display-block font-size-10px">
                      {item.category}
                    </span>
                    <span className="display-block font-size-10px">
                      {item.experience}
                    </span>
                    <span className="display-block font-size-10px">
                      {item.availability}
                    </span>
                    <div className="margin-top-1em">
                      <span
                        className="btn--rounded--tiny"
                        onClick={event => connectToPerson(event, item.id)}
                      >
                        Connect
                      </span>
                      <span
                        className="btn--rounded--tiny plain button-shadow"
                        onClick={event =>
                          hideElement(event, `person${item.id}`)
                        }
                      >
                        Not Now
                      </span>
                    </div>
                  </td>
                </tr>
              </tbody>
            </table>
          </td>
        );
      });
    }
  }

  renderCaretsAndBadges(index) {
    switch (index) {
      case 0:
        return (
          <div>
            <span className="section-titles font-weight-300">
              Trending Jobs
            </span>
            <span className="float-right">
              <span className="tag--purple">TRENDING</span>
            </span>
          </div>
        );
      case 1:
        return (
          <span className="light-grey float-right">
            <i className="fa fa-caret-down"></i>
          </span>
        );
      default:
        break;
    }
  }

  renderTrendingJobs() {
    const { trendingJobs } = this.state;
    const total = trendingJobs.length;
    if (trendingJobs) {
      return trendingJobs.map((item, index) => {
        const className1 = index > 0 ? " small" : "";
        const className2 = total === index + 1 ? " last" : "";
        return (
          <div
            className={`profile-info-item${className1}${className2}`}
            key={index}
          >
            {this.renderCaretsAndBadges(index)}
            <table>
              <tbody>
                <tr>
                  <td className="vertical-align-top width-4-point-5-em">
                    <div className="avatar-medium--square">
                      <img
                        className="center-cropped-medium-no-padding"
                        src={item.image}
                        onError={i => (i.target.style.display = "none")}
                        alt="Profile"
                      />
                    </div>
                  </td>
                  <td className="vertical-align-top">
                    <span className="display-block smallish-and-blue">
                      {item.title}
                    </span>
                    <span className="display-block light-grey font-size-10px line-height-3">
                      {item.owner}
                    </span>
                    <span className="display-block font-size-10px">
                      {item.category}
                      &#160;&#160;&#160;&#160;
                      <span className="light-grey">
                        {item.salary} - {item.type}
                      </span>
                    </span>
                    <span className="display-block light-grey font-size-10px line-height-3">
                      <i className="fa fa-map-marker"></i>&#160;&#160;
                      {item.location}
                    </span>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        );
      });
    }
  }

  render() {
    return (
      <div id="Dashboard" className="tabcontent" style={{ display: "block" }}>
        <div className="profile-info-area container__div--dashbord">
          <div className="container">
            <table>
              <tbody>
                <tr>
                  <td className="profile-info-left">
                    <div className="profile-info-item ">
                      <span className="section-titles font-weight-300">
                        Connect with people you may know
                      </span>
                      <table>
                        <tbody>
                          <tr>{this.renderPeopleYouMayKnow()}</tr>
                        </tbody>
                      </table>
                      <div className="center display-flex flex-direction-row justify-content-center margin-top-2em">
                        <span className="display-inline-block light-grey font-size-30px display-flex flex-direction-column justify-content-center">
                          &#xb7;&#xb7;&#xb7;&#160;
                        </span>
                        <span className="display-inline-block light-grey font-size-12 display-flex flex-direction-column justify-content-center">
                          View more
                        </span>
                      </div>
                    </div>

                    {this.renderTrendingJobs()}

                    <div className="center display-flex flex-direction-row justify-content-center margin-top-2em">
                      <span className="display-inline-block light-grey font-size-30px display-flex flex-direction-column justify-content-center">
                        &#xb7;&#xb7;&#xb7;&#160;
                      </span>
                      <span className="display-inline-block light-grey font-size-12 display-flex flex-direction-column justify-content-center">
                        View more
                      </span>
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

export default connect(mapStateToProps, mapDispatchToProps)(Dashboard);
