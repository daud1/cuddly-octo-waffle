import React from "react";
import robot from "../images/robot.png";
import spaceStation from "../images/space_station.png";

function HomeSection5() {
  return (
    <div className="picture-banner">
      <div>
        <div className="half-banner blue-background center padding-left-and-right-12-em">
          <img
            className="medium-image"
            src={robot}
            onError={i => (i.target.style.display = "none")}
            alt="Icon"
          />
          <h1 className="whiteish">Smarter. Faster. Better</h1>
          <div className="white-small-and-thin-text font-size-12">
            Pellentesque vehicula fermentum tupis eu cursus. Cras convallis
            tellus et elit aliquet, vitae dignissim ligula sodales
          </div>
        </div>
        <div className="half-banner purple-background center padding-left-and-right-12-em">
          <img
            className="medium-image"
            src={spaceStation}
            onError={i => (i.target.style.display = "none")}
            alt="Icon"
          />
          <h1 className="whiteish">Full - time, freelance, or consulting</h1>
          <div className="white-small-and-thin-text font-size-12">
            Pellentesque vehicula fermentum tupis eu cursus. Cras convallis
            tellus et elit aliquet, vitae dignissim ligula sodales
          </div>
        </div>
      </div>
    </div>
  );
}

export default HomeSection5;
