import React from "react";
import pencilRuler from "../../shared/images/pencil_ruler.svg";
import binderIcon from "../../shared/images/binder_icon.png";

function HomeSection1() {
  return (
    <div className="center word-banner">
      <h1 className="blueish">Get it to your job</h1>
      <span className="profile-user-info home-paragraph">
        Vestibulum imperdiet nibh vel magna lacinia ultrices. Sed id interdum
        urna. Nam ac elit a ante commodo tristique. Duis lacus urna condimentum
        a vehicula.
      </span>
      <div>
        <button className="full-rounded-button gradient">
          <img
            className="button-icon"
            src={pencilRuler}
            onError={i => (i.target.style.display = "none")}
            alt="Icon"
          />
          Post a job
        </button>
        <button className="full-rounded-button button-shadow blue">
          <img
            className="button-icon"
            src={binderIcon}
            onError={i => (i.target.style.display = "none")}
            alt="Icon"
          />
          Job list
        </button>
      </div>
    </div>
  );
}

export default HomeSection1;
