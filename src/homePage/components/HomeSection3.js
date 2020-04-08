import React from "react";
import arrowBackground from "../../shared/images/arrow_background.png";
import spaceStation from "../../shared/images/space_station.png";
import marsRover from "../../shared/images/mars_rover.png";
import rocket from "../../shared/images/rocket.png";

function HomeSection3() {
  return (
    <div
      className="center medium-word-banner dark-dotted-background"
      style={{ zIndex: 0, position: "relative" }}
    >
      <img
        className="back-image"
        src={arrowBackground}
        onError={i => (i.target.style.display = "none")}
        alt="Backgound"
      />
      <h1 className="whiteish">Process to get started</h1>
      <table className="container center">
        <tbody>
          <tr>
            <td
              className="width-25-percent padding-3em"
              style={{ padding: "4em 0em 3em 4em" }}
            >
              <img
                className="center-cropped-5-em"
                src={spaceStation}
                onError={i => (i.target.style.display = "none")}
                alt="Icon"
              />
              <div className="margin-top-and-bottom-2em">
                <span className="purple-bubble">1</span>
                <span className="white-medium-and-bold">
                  Sign up for an account
                </span>
              </div>
            </td>
            <td
              className="width-25-percent padding-3em"
              style={{ padding: "4em 3em 3em 3em" }}
            >
              <img
                className="center-cropped-5-em"
                src={marsRover}
                onError={i => (i.target.style.display = "none")}
                alt="Icon"
              />
              <div className="margin-top-and-bottom-2em">
                <span className="purple-bubble">2</span>
                <span className="white-medium-and-bold">
                  Confirm your email address and add profile
                </span>
              </div>
            </td>
            <td
              className="width-25-percent padding-3em"
              style={{ padding: "4em 3em 3em 0em" }}
            >
              <img
                className="center-cropped-5-em"
                src={rocket}
                onError={i => (i.target.style.display = "none")}
                alt="Icon"
              />
              <div className="margin-top-and-bottom-2em">
                <span className="purple-bubble">3</span>
                <span className="white-medium-and-bold">
                  Choice of solutions and post jobs
                </span>
              </div>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}

export default HomeSection3;
