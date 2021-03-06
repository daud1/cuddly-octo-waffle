import $ from "jquery";
import _ from "lodash";
import axios from "axios";
import sampleProfilePic from "../images/sample_profile_pic.jpg";

var ACCOUNT_TYPES = ["EMP", "FRE"];
var POPUPS = ["portfolio-upload-modal", "portfolio-view-modal", "hire-me-modal"];

export const insertAndExecute = (domelement, text) => {
  domelement.innerHTML = text;
  var scripts = [];

  var ret = domelement.childNodes;
  for (var i = 0; ret[i]; i++) {
    if (
      scripts &&
      nodeName(ret[i], "script") &&
      (!ret[i].type || ret[i].type.toLowerCase() === "text/javascript")
    ) {
      scripts.push(ret[i].parentNode ? ret[i].parentNode.removeChild(ret[i]) : ret[i]);
    }
  }

  for (var script in scripts) {
    evalScript(scripts[script]);
  }
  return;
};

export const nodeName = (elem, name) =>
  elem.nodeName && elem.nodeName.toUpperCase() === name.toUpperCase();

export const evalScript = elem => {
  var data = elem.text || elem.textContent || elem.innerHTML || "";

  var head = document.getElementsByTagName("head")[0] || document.documentElement,
    script = document.createElement("script");
  script.type = "text/javascript";
  script.appendChild(document.createTextNode(data));
  head.insertBefore(script, head.firstChild);
  head.removeChild(script);

  if (elem.parentNode) {
    elem.parentNode.removeChild(elem);
  }
  return;
};

export const includeHTML = () => {
  var z, i, elmnt, file, xhttp;
  /*loop through a collection of all HTML elements:*/
  z = document.getElementsByTagName("*");
  for (i = 0; i < z.length; i++) {
    elmnt = z[i];
    /*search for elements with a certain atrribute:*/
    file = elmnt.getAttribute("include-html");
    if (file) {
      /*make an HTTP request using the attribute value as the file name:*/
      xhttp = new XMLHttpRequest();
      // eslint-disable-next-line
      xhttp.onreadystatechange = function() {
        if (this.readyState === 4) {
          // if (this.status === 200) { elmnt.innerHTML = this.responseText; }
          // if (this.status === 404) { elmnt.innerHTML = "Page not found."; }
          if (this.status === 200) {
            insertAndExecute(elmnt, this.responseText);
          }
          if (this.status === 404) {
            insertAndExecute(elmnt, "Page not found.");
          }
          /*remove the attribute, and call this export function once more:*/
          elmnt.removeAttribute("include-html");
          includeHTML();
        }
      };
      xhttp.open("GET", file, true);
      xhttp.send();
      /*exit the export function:*/
      return;
    }
  }
  return;
};

export const openPage = (evt, divId, linkClass, contentClass) => {
  var i, tabcontent, tablinks, browseJobsImage, divToShow;

  tabcontent = document.getElementsByClassName(contentClass);
  if (tabcontent) {
    for (i = 0; i < tabcontent.length; i++) {
      tabcontent[i].style.display = "none";
    }
  }

  tablinks = document.getElementsByClassName(linkClass);
  if (tablinks) {
    for (i = 0; i < tablinks.length; i++) {
      tablinks[i].className = tablinks[i].className.replace(" active", "");
    }
  }

  divToShow = document.getElementById(divId);
  if (divToShow) {
    divToShow.style.display = "block";
  }

  if (evt) {
    evt.currentTarget.className += " active";
  } else if (divId === "home") {
    document.getElementById("home-link").className += " active";
  }

  browseJobsImage = document.getElementById("browse-jobs-link-image");
  if (browseJobsImage) {
    if (linkClass === "main-tablinks" && divId === "browse-jobs") {
      browseJobsImage.src = "../images/binder_icon_blue.png";
    } else if (linkClass === "main-tablinks" && divId !== "browse-jobs") {
      browseJobsImage.src = "../images/binder_icon.png";
    }
  }
  return;
};

export const renderRatings = () => {
  var ratingContainers = document.getElementsByClassName("rating-container");
  for (var idx = 0; idx < ratingContainers.length; idx++) {
    var score = ratingContainers[idx].getAttribute("score");
    var scores = score.split(".");
    var wholeNumber = parseInt(scores[0], 10);
    var decimalPoint = parseInt(scores[1], 10);
    var emptyNumber = 5 - (wholeNumber + 1);
    var fullStars = "";
    var halfStars = "";
    var emptyStars = "";

    for (let i = 0; i < wholeNumber; i++) {
      fullStars = fullStars + '<i class="fa fa-star blue margin-right-0-point-2-em"></i>';
    }
    for (let i = 0; i < emptyNumber; i++) {
      emptyStars =
        emptyStars + '<i class="fa fa-star light-grey margin-right-0-point-2-em"></i>';
    }
    if (decimalPoint > 3) {
      halfStars =
        '<i class="fa fa-star light-grey"></i>' +
        '<i class="fa fa-star-half blue" style = "position: absolute; margin-left: -0.94em; margin-top: 0.27em;" ></i > ';
    } else if (decimalPoint >= 0 && decimalPoint <= 3 && wholeNumber < 5) {
      emptyStars =
        emptyStars + '<i class="fa fa-star light-grey margin-right-0-point-2-em"></i>';
    }

    ratingContainers[idx].innerHTML = fullStars + halfStars + emptyStars;
  }
  return;
};

export const selectRadioButton = (event, radioButtonClass, user_type) => {
  var i, radioButtons;
  radioButtons = document.getElementsByClassName(radioButtonClass);
  for (i = 0; i < radioButtons.length; i++) {
    radioButtons[i].className = radioButtons[i].className.replace(" active", "");
  }
  if (event) {
    event.currentTarget.className += " active";
  } else {
    var radioButton =
      document.getElementById("employer_signup-radio-btn") ||
      document.getElementById("employer_signin-radio-btn");
    if (radioButton) {
      radioButton.className += " active";
    }
  }
  if (user_type) {
    localStorage.ACCOUNT_TYPE = user_type;
  }
  return;
};

export const openAccountPage = () => {
  var user_type = localStorage.ACCOUNT_TYPE;
  if (ACCOUNT_TYPES.includes(user_type)) {
    openPage(null, user_type, "tablinks", "tabcontent");
    localStorage.ACCOUNT_TYPE = "";
  } else {
    openPage(null, "home", "tablinks", "tabcontent");
  }
  return;
};

export const selectSingleRadioButton = (event, callback = null) => {
  if (event.currentTarget.className.includes(" active")) {
    event.currentTarget.className = event.currentTarget.className.replace(" active", "");
    if (callback) callback(false);
  } else {
    event.currentTarget.className += " active";
    if (callback) callback(true);
  }
  return;
};

export const renderTooltip = event => {
  if (event) {
    var elementRect = event.currentTarget.getBoundingClientRect(),
      bodyRect = document.body.getBoundingClientRect(),
      top = elementRect.top - bodyRect.top,
      left = elementRect.left - bodyRect.left,
      tooltip = document.getElementById("tooltip");
    tooltip.style.display = "inline";
    tooltip.style.position = "absolute";
    tooltip.style.top = top - 119;
    tooltip.style.left = left - 79;
  }
  return;
};

export const showOverlay = (overlayId, event = null, linkClass = "") => {
  event.preventDefault();
  document.getElementById(overlayId).style.display = "block";
  if (event) {
    if (linkClass) {
      var tablinks = document.getElementsByClassName(linkClass);
      for (var i = 0; i < tablinks.length; i++) {
        tablinks[i].className = tablinks[i].className.replace(" active", "");
      }
    }
    event.currentTarget.className += " active";
  }

  if (POPUPS.includes(overlayId)) {
    $("body").addClass("modal-open");
  }
  return;
};

export const dismissOverlay = (event, overlayIds = null) => {
  if (event) {
    event.currentTarget.style.display = "none";
  }
  if (overlayIds) {
    for (var i = 0; i < overlayIds.length; i++) {
      const overlay = document.getElementById(overlayIds[i]);
      if (overlay) overlay.style.display = "none";
      if (POPUPS.includes(overlayIds[i])) {
        $("body").removeClass("modal-open");
      }
    }
  }
  var tablinks = document.getElementsByClassName("side-tablinks-2");
  for (i = 0; i < tablinks.length; i++) {
    tablinks[i].className = tablinks[i].className.replace(" active", "");
  }
  return;
};

export const stopPropagation = event => {
  if (event) {
    event.stopPropagation();
  }
  return;
};

export const editSection = (sectionToHide, sectionToShow) => {
  const hide = document.getElementById(sectionToHide);
  if (hide) hide.style.display = "none";
  const show = document.getElementById(sectionToShow);
  if (show) show.style.display = "block";
  return;
};

export const editSectionClass = (sectionsToHide, sectionsToShow) => {
  var hideSections = document.getElementsByClassName(sectionsToHide);
  var showSections = document.getElementsByClassName(sectionsToShow);
  for (let i = 0; i < hideSections.length; i++) {
    hideSections[i].style.display = "none";
  }
  for (let i = 0; i < showSections.length; i++) {
    showSections[i].style.display = "block";
  }
  return;
};

export const toggleVideoPlay = (videoId, buttonId) => {
  var video = document.getElementById(videoId);
  if (!video) {
    return;
  }
  if (video.paused) {
    video.play();
    video.setAttribute("controls", "controls");
    $(`#${buttonId}`).fadeOut();
  } else {
    video.pause();
    video.removeAttribute("controls");
    $(`#${buttonId}`).fadeIn();
  }
  return;
};

export const isEmpty = testCollection => _.isEmpty(testCollection);

export const isLoggedIn = user => user && !isEmpty(user) && user.loggedIn;

export const validateEmail = email => {
  // eslint-disable-next-line
  const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return re.test(String(email).toLowerCase());
};

export const setInputError = (name, message) => {
  const inputWithError = $(`[name="${name}"]`);
  const label = inputWithError.prev();
  inputWithError.css("borderColor", "red");
  if ($(`#${name}-error`).length === 0) {
    label.html(
      `${label.html()} <span id="${name}-error" style="color: red; float: right;">${message}</span>`
    );
  }
};

export const clearInputError = name => {
  const inputWithError = $(`[name="${name}"]`);
  const errorLabel = $(`#${name}-error`);
  inputWithError.css({ borderColor: "#ebeced" });
  if (errorLabel.length > 0) {
    errorLabel.remove();
  }
};

export const comparePasswords = () => {
  const password = $(`[name="password"]`).val();
  const passwordConfirmation = $(`[name="passwordConfirmation"]`).val();
  return password === passwordConfirmation;
};

export const inputHasValue = name => {
  const value = $(`[name="${name}"]`).val();
  return value !== "";
};

export const scrollToElement = name => {
  $([document.documentElement, document.body]).animate(
    {
      scrollTop:
        $(`[name="${name}"]`)
          .prev()
          .offset().top - 10,
    },
    "slow"
  );
};

export const showAPIErrors = (error, setNotification) => {
  if (
    !error ||
    !error.response ||
    !error.response.data ||
    typeof error.response.data !== "object"
  ) {
    setNotification({ message: "Something Went Wrong!" });
    return;
  }
  const {
    response: { data },
  } = error;

  for (var key in data) {
    if (data.hasOwnProperty(key)) {
      const errors = data[key];
      if (typeof errors === "string") {
        setNotification({ message: errors });
        return;
      }
      errors.map(resError => setNotification({ message: resError }));
    }
  }
};

export const getNameFromUser = user => {
  const { name } = user;
  if (name) return name;

  const newUser = { ...user };
  let { firstName, lastName, email } = newUser;

  if (!firstName && !lastName && email) {
    const emailSplit = email.match(/^([^@]*)@/);
    const username = emailSplit ? emailSplit[1] : "";
    const names = username ? username.split(/[^A-Za-z]/) : [];

    for (let i = 0; i < names.length; i++) {
      const currentName = _.capitalize(`${names[i] ? names[i] : ""}`);

      if (!firstName) {
        firstName = currentName;
      } else {
        lastName = lastName ? `${lastName} ${currentName}` : ` ${currentName}`;
      }
    }
  }
  return `${firstName ? firstName : ""} ${lastName ? lastName : ""}`;
};

export const getTitleFromUser = user => {
  const newUser = { ...user };
  let { user_type, companyName } = newUser;
  if (user_type === "FRE" || (user_type === "EMP" && !companyName)) {
    return _.capitalize(user_type);
  } else if (user_type && user_type === "EMP" && companyName) {
    return `Member ${_.capitalize(companyName)}`;
  }
  return "";
};

export const openRoute = (event, route) => {
  if (event) event.preventDefault();
  window.location.href = route;
};

export const getUrlParameter = name => {
  // eslint-disable-next-line
  name = name.replace(/[\[]/, "\\[").replace(/[\]]/, "\\]");
  var regex = new RegExp("[\\?&]" + name + "=([^&#]*)");
  var results = regex.exec(document.location.search);
  return results === null ? "" : decodeURIComponent(results[1].replace(/\+/g, " "));
};

export const isLocalHost = () => {
  return (
    window.location.hostname === "localhost" || window.location.hostname === "127.0.0.1"
  );
};

export const forceHTTPS = () => {
  if (window.location.protocol !== "https:" && !isLocalHost()) {
    window.location.href =
      "https:" + window.location.href.substring(window.location.protocol.length);
  }
};

export const getUserImage = user => {
  const { image } = user;
  if (image) return image;
  return sampleProfilePic;
};

export const setSocialSignOn = (profile, accessToken, type, props) => {
  const { setNotification, user, setUser, removeSignon } = props;
  const { email, name, image } = profile;
  if (!accessToken) {
    setNotification({ message: "Something Went Wrong!" });
    return;
  }
  const newUser = { ...user };
  newUser.loggedIn = true;
  newUser.key = accessToken;
  newUser.email = email;
  newUser.name = name;
  newUser.image = image;
  newUser.signOnType = type;
  setUser(newUser);
  removeSignon();
};

export const facebookSignOn = (response, props) => {
  const { email, accessToken, name, userID } = response;
  const profile = {
    email,
    name,
    image: "https://graph.facebook.com/" + userID + "/picture?height=512&width=512",
  };
  setSocialSignOn(profile, accessToken, "facebook", props);
};

export const googleSignOn = (response, props) => {
  const {
    profileObj: { email, name, imageUrl },
    accessToken,
  } = response;
  const profile = {
    email,
    name,
    image: imageUrl.replace("=s96", "=s512"),
  };
  setSocialSignOn(profile, accessToken, "google", props);
};

export function imgToLocalStore(file, fieldName) {
  const reader = new FileReader();
  reader.readAsDataURL(file);
  reader.onloadend = function() {
    localStorage.setItem(fieldName, reader.result);
  };
}

/**
 *
 * @param {string} url presigned aws s3 url for object
 * @param {string} fieldName name of key in ls
 */
export async function getImage(url, fieldName) {
  try {
    const res = await axios.get(url, { responseType: "arraybuffer" });
    imgToLocalStore(new Blob([new Uint8Array(res.data).buffer]), fieldName);
  } catch {
    throw Error(`Failed to fetch ${fieldName.replace("_", " ")}!`);
  }
}

export function getObjName(url) {
  let new_re = /^((http[s]?|ftp):\/)?\/?([^:/\s]+)((\/\w+)*\/)([\w-.]+[^#?\s]+)(.*)?(#[\w-]+)?$/;
  return new_re.exec(url)[6];
}

export async function fetchImages(response) {
  let p = [];
  const { cover_photo: coverUrl, profile_photo: profileUrl } = response;

  if (coverUrl) {
    p.push(getImage(coverUrl, "cover_photo"));
    response.cover_photo = getObjName(coverUrl);
  }
  if (profileUrl) {
    p.push(getImage(profileUrl, "profile_photo"));
    response.profile_photo = getObjName(profileUrl);
  }

  await Promise.all(p);
}
