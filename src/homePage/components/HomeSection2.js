import React from "react";
import laptop from "../../common/images/laptop.png";
import browser from "../../common/images/browser.png";
import screenEdit from "../../common/images/screen_edit.png";
import targetUp from "../../common/images/target_up.png";
import tablet from "../../common/images/tablet.png";
import applePencil from "../../common/images/apple_pencil.png";
import bangAndOlufsenEarbuds from "../../common/images/bang_and_olufsen_earbuds.png";

function HomeSection2() {
  return (
    <div className="center word-banner gradient">
      <div>
        <img
          className="floating-image"
          style={{ width: "1111px" }}
          src={laptop}
          onError={i => (i.target.style.display = "none")}
          alt="Laptop"
        />
        <img
          style={{ transform: "rotate(6deg)", margin: "-6em 0 auto -19em" }}
          className="besides-floating-image shadowed"
          src={applePencil}
          onError={i => (i.target.style.display = "none")}
          alt="Pencil"
        />
      </div>
      <div style={{ margin: "-7em 0 0 0" }}>
        <table className="container center">
          <tbody>
            <tr>
              <td className="padding-1em">
                <div className="icon-circle">
                  <img
                    className="center-cropped-small"
                    src={browser}
                    onError={i => (i.target.style.display = "none")}
                    alt="Icon"
                  />
                </div>
                <span className="white-and-thin-text">Website Development</span>
                <span className="white-small-and-thin-text">
                  Pellentesque vesibulum orci, id eleifend ante cursus vitae
                </span>
              </td>
              <td className="padding-1em">
                <div className="icon-circle">
                  <img
                    className="center-cropped-small"
                    src={screenEdit}
                    onError={i => (i.target.style.display = "none")}
                    alt="Icon"
                  />
                </div>
                <span className="white-and-thin-text">Graphic Design</span>
                <span className="white-small-and-thin-text">
                  Pellentesque vesibulum orci, id eleifend ante cursus vitae
                </span>
              </td>
              <td className="padding-1em">
                <div className="icon-circle">
                  <img
                    className="center-cropped-small"
                    src={targetUp}
                    onError={i => (i.target.style.display = "none")}
                    alt="Icon"
                  />
                </div>
                <span className="white-and-thin-text">Internet Marketing</span>
                <span className="white-small-and-thin-text">
                  Pellentesque vesibulum orci, id eleifend ante cursus vitae
                </span>
              </td>
              <td className="padding-1em">
                <div className="icon-circle">
                  <img
                    className="center-cropped-small"
                    src={tablet}
                    onError={i => (i.target.style.display = "none")}
                    alt="Icon"
                  />
                </div>
                <span className="white-and-thin-text">Mobile App</span>
                <span className="white-small-and-thin-text">
                  Pellentesque vesibulum orci, id eleifend ante cursus vitae
                </span>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
      <img className="bottom-image" src={bangAndOlufsenEarbuds} alt="Earbuds" />
    </div>
  );
}

export default HomeSection2;
