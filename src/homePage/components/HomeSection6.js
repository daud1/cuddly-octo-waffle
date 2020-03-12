import React from "react";
import talkingDogLogo from "../../common/images/talking_dog_logo.png";
import followLogo from "../../common/images/follow_logo.jpg";
import bubalusLogo from "../../common/images/bubalus.png";
import elefontLogo from "../../common/images/elefont.jpg";
import fiveTwentyLogo from "../../common/images/five-twenty-logo.jpg";
import americanStoriesLogo from "../../common/images/american-stories-logo.jpg";

function HomeSection6() {
  return (
    <div className="center word-banner light-blue-background">
      <div className="container">
        <h1 className="blueish">Browse top job</h1>
        <br />
        <br />
        <span className="thin medium-paragraph float-left">
          Browse top jobs by member
        </span>
        <p />
        <table>
          <tbody>
            <tr>
              <td className="center width-16-percent">
                <a
                  href="/"
                  className="badge-with-tiny-text orange-background"
                  data-badge="HOT"
                >
                  <div className="member-circle">
                    <img
                      className="center-cropped-medium"
                      style={{ padding: 0 }}
                      src={talkingDogLogo}
                      onError={i => (i.target.style.display = "none")}
                      alt="Logo"
                    />
                  </div>
                </a>
                <div>
                  <span className="small-and-bold">Moontheme studio</span>
                  <br />
                  <span className="small-and-blue">Member Athena</span>
                </div>
              </td>
              <td className="center width-16-percent">
                <a href="/">
                  <div className="member-circle">
                    <img
                      className="center-cropped-medium"
                      style={{ padding: 0 }}
                      src={followLogo}
                      onError={i => (i.target.style.display = "none")}
                      alt="Logo"
                    />
                  </div>
                </a>
                <div>
                  <span className="small-and-bold">Zebra</span>
                  <br />
                  <span className="small-and-blue">Member Athena</span>
                </div>
              </td>
              <td className="center width-16-percent">
                <a href="/">
                  <div className="member-circle">
                    <img
                      className="center-cropped-medium"
                      style={{ padding: 0 }}
                      src={bubalusLogo}
                      onError={i => (i.target.style.display = "none")}
                      alt="Logo"
                    />
                  </div>
                </a>
                <div>
                  <span className="small-and-bold">La Carolina</span>
                  <br />
                  <span className="small-and-blue">Member Athena</span>
                </div>
              </td>
              <td className="center width-16-percent">
                <a href="/">
                  <div className="member-circle">
                    <img
                      className="center-cropped-medium"
                      style={{ padding: 0 }}
                      src={elefontLogo}
                      onError={i => (i.target.style.display = "none")}
                      alt="Logo"
                    />
                  </div>
                </a>
                <div>
                  <span className="small-and-bold">Mberak</span>
                  <br />
                  <span className="small-and-blue">Member Athena</span>
                </div>
              </td>
              <td className="center width-16-percent">
                <a
                  href="/"
                  className="badge-with-tiny-text orange-background"
                  data-badge="HOT"
                >
                  <div className="member-circle">
                    <img
                      className="center-cropped-medium"
                      style={{ padding: 0 }}
                      src={fiveTwentyLogo}
                      onError={i => (i.target.style.display = "none")}
                      alt="Logo"
                    />
                  </div>
                </a>
                <div>
                  <span className="small-and-bold">Logotext</span>
                  <br />
                  <span className="small-and-blue">Member Athena</span>
                </div>
              </td>
              <td className="center width-16-percent">
                <a href="/" className="badge-with-tiny-text" data-badge="NEW">
                  <div className="member-circle">
                    <img
                      className="center-cropped-medium grayscale"
                      style={{ padding: 0 }}
                      src={americanStoriesLogo}
                      onError={i => (i.target.style.display = "none")}
                      alt="Logo"
                    />
                  </div>
                </a>
                <div>
                  <span className="small-and-bold">Invectra</span>
                  <br />
                  <span className="small-and-blue">Member Athena</span>
                </div>
              </td>
            </tr>
          </tbody>
        </table>
        <br />
        <br />
        <span className="thin medium-paragraph float-left">
          Browse top jobs in category
        </span>
        <p />
        <table>
          <tbody>
            <tr>
              <td className="width-25-percent">
                <p className="profile-user-info">
                  Graphic design
                  <br /> Designer jobs
                  <br /> Frontend Developer jobs
                  <br /> Developer jobs
                </p>
              </td>
              <td className="width-25-percent">
                <p className="profile-user-info">
                  Resources jobs
                  <br /> Marketing online jobs
                  <br /> Mobile Developer jobs
                  <br /> App Developer jobs
                </p>
              </td>
              <td className="width-25-percent">
                <p className="profile-user-info">
                  Product Manager jobs
                  <br /> Sales jobs
                  <br /> Logo Desgn jobs
                  <br /> SEO jobs
                </p>
              </td>
              <td className="width-25-percent">
                <p className="profile-user-info">
                  Articles jobs
                  <br /> Android jobs
                  <br /> Logo Desgn jobs
                  <br /> SEO jobs
                </p>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default HomeSection6;
