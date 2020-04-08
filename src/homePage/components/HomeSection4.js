import React from "react";
import cover from "../../shared/images/sample_cover_pic.jpg";

function HomeSection4() {
  return (
    <div className="picture-banner">
      <img
        className="picture-banner-image"
        src={cover}
        onError={i => (i.target.style.display = "none")}
        alt="Banner"
      />
      <div className="second-banner-overlay">
        <div>
          <h1 className="whiteish">Benefits for freelancer</h1>
        </div>
        <div className="white-small-and-thin-text font-size-12">
          Pellentesque vehicula fermentum tupis eu cursus. Cras convallis tellus
          et elit aliquet, vitae dignissim ligula sodales
        </div>
        <div>
          <table>
            <tbody>
              <tr>
                <td>
                  <i className="fa fa-circle small-bullet"></i>
                </td>
                <td className="white-small-and-bold-text">
                  Cras convallis tellus et elit alliquet 20%
                </td>
              </tr>
              <tr>
                <td>
                  <i className="fa fa-circle small-bullet"></i>
                </td>
                <td className="white-small-and-bold-text">
                  Suspendisse tincidunt vulputate leo in sollicutudin
                </td>
              </tr>
              <tr>
                <td>
                  <i className="fa fa-circle small-bullet"></i>
                </td>
                <td className="white-small-and-bold-text">
                  Mobi sodales risus quis orci hendrerit semper
                </td>
              </tr>
            </tbody>
          </table>
        </div>
        <div>
          <button className="full-rounded-input-button normal">
            Learn more
          </button>
        </div>
      </div>
    </div>
  );
}

export default HomeSection4;
