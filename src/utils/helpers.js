import $ from "jquery";
import _ from 'lodash';

var ACCOUNT_TYPES = ['employer_signup', 'freelancer_signup', 'employer_signin', 'freelancer_signin'];
var POPUPS = ['portfolio-upload-modal', 'portfolio-view-modal', 'hire-me-modal'];

export const insertAndExecute = (domelement, text) => {
  domelement.innerHTML = text;
  var scripts = [];

  var ret = domelement.childNodes;
  for (var i = 0; ret[i]; i++) {
    if (scripts && nodeName(ret[i], "script") && (!ret[i].type || ret[i].type.toLowerCase() === "text/javascript")) {
      scripts.push(ret[i].parentNode ? ret[i].parentNode.removeChild(ret[i]) : ret[i]);
    }
  }

  for (var script in scripts) {
    evalScript(scripts[script]);
  }
  return;
}

export const nodeName = (elem, name) => elem.nodeName && elem.nodeName.toUpperCase() === name.toUpperCase();

export const evalScript = elem => {
  var data = (elem.text || elem.textContent || elem.innerHTML || "");

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
}

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
      xhttp.onreadystatechange = function () {
        if (this.readyState === 4) {
          // if (this.status === 200) { elmnt.innerHTML = this.responseText; }
          // if (this.status === 404) { elmnt.innerHTML = "Page not found."; }
          if (this.status === 200) { insertAndExecute(elmnt, this.responseText); }
          if (this.status === 404) { insertAndExecute(elmnt, "Page not found."); }
          /*remove the attribute, and call this export function once more:*/
          elmnt.removeAttribute("include-html");
          includeHTML();
        }
      }
      xhttp.open("GET", file, true);
      xhttp.send();
      /*exit the export function:*/
      return;
    }
  }
  return;
}

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
    document.getElementById('home-link').className += " active";
  }

  browseJobsImage = document.getElementById("browse-jobs-link-image");
  if (browseJobsImage) {
    if (linkClass === 'main-tablinks' && divId === 'browse-jobs') {
      browseJobsImage.src = "../images/binder_icon_blue.png";
    } else if (linkClass === 'main-tablinks' && divId !== 'browse-jobs') {
      browseJobsImage.src = "../images/binder_icon.png";
    }
  }
  return;
}

export const renderRatings = () => {
  var ratingContainers = document.getElementsByClassName('rating-container');
  for (var idx = 0; idx < ratingContainers.length; idx++) {
    var score = ratingContainers[idx].getAttribute("score")
    var scores = score.split('.');
    var wholeNumber = parseInt(scores[0], 10);
    var decimalPoint = parseInt(scores[1], 10);
    var emptyNumber = 5 - (wholeNumber + 1);
    var fullStars = '';
    var halfStars = '';
    var emptyStars = '';

    for (let i = 0; i < wholeNumber; i++) {
      fullStars = fullStars + '<i class="fa fa-star blue margin-right-0-point-2-em"></i>';
    }
    for (let i = 0; i < emptyNumber; i++) {
      emptyStars = emptyStars + '<i class="fa fa-star light-grey margin-right-0-point-2-em"></i>';
    }
    if (decimalPoint > 3) {
      halfStars = '<i class="fa fa-star light-grey"></i>'
        + '<i class="fa fa-star-half blue" style = "position: absolute; margin-left: -0.94em; margin-top: 0.27em;" ></i > ';
    } else if ((decimalPoint >= 0 && decimalPoint <= 3 && wholeNumber < 5)) {
      emptyStars = emptyStars + '<i class="fa fa-star light-grey margin-right-0-point-2-em"></i>';
    }

    ratingContainers[idx].innerHTML = fullStars + halfStars + emptyStars
  }
  return;
}

export const selectRadioButton = (event, radioButtonClass, accountType) => {
  var i, radioButtons;
  radioButtons = document.getElementsByClassName(radioButtonClass);
  for (i = 0; i < radioButtons.length; i++) {
    radioButtons[i].className = radioButtons[i].className.replace(" active", "");
  }
  if (event) {
    event.currentTarget.className += " active";
  } else {
    var radioButton = document.getElementById('employer_signup-radio-btn') || document.getElementById('employer_signin-radio-btn');
    if (radioButton) {
      radioButton.className += " active";
    }
  }
  if (accountType) {
    localStorage.ACCOUNT_TYPE = accountType;
  }
  return;
}

export const openAccountPage = () => {
  var accountType = localStorage.ACCOUNT_TYPE;
  if (ACCOUNT_TYPES.includes(accountType)) {
    openPage(null, accountType, 'tablinks', 'tabcontent');
    localStorage.ACCOUNT_TYPE = '';
  } else {
    openPage(null, 'home', 'tablinks', 'tabcontent');
  }
  return;
}

export const selectSingleRadioButton = event => {
  if (event.currentTarget.className.includes(' active')) {
    event.currentTarget.className = event.currentTarget.className.replace(" active", "");
  } else {
    event.currentTarget.className += " active";
  }
  return;
}

export const renderTooltip = event => {
  if (event) {
    var elementRect = event.currentTarget.getBoundingClientRect(),
      bodyRect = document.body.getBoundingClientRect(),
      top = elementRect.top - bodyRect.top,
      left = elementRect.left - bodyRect.left,
      tooltip = document.getElementById('tooltip');
    tooltip.style.display = 'inline';
    tooltip.style.position = 'absolute';
    tooltip.style.top = top - 119;
    tooltip.style.left = left - 79;
  }
  return;
}

export const showOverlay = (overlayId, event = null, linkClass = "") => {
  event.preventDefault();
  document.getElementById(overlayId).style.display = 'block';
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
}

export const dismissOverlay = (event, overlayIds = null) => {
  if (event) {
    event.currentTarget.style.display = 'none';
  }
  if (overlayIds) {
    for (var i = 0; i < overlayIds.length; i++) {
      const overlay = document.getElementById(overlayIds[i]);
      if (overlay) overlay.style.display = 'none';
      if (POPUPS.includes(overlayIds[i])) {
        $("body").removeClass("modal-open");
      }
    }
  }
  var tablinks = document.getElementsByClassName('side-tablinks-2');
  for (i = 0; i < tablinks.length; i++) {
    tablinks[i].className = tablinks[i].className.replace(" active", "");
  }
  return;
}

export const stopPropagation = event => {
  if (event) {
    event.stopPropagation();
  }
  return;
}

export const editSection = (sectionToHide, sectionToShow) => {
  const hide = document.getElementById(sectionToHide);
  if (hide) hide.style.display = 'none';
  const show = document.getElementById(sectionToShow);
  if (show) show.style.display = 'block';
  return;
}

export const editSectionClass = (sectionsToHide, sectionsToShow) => {
  var hideSections = document.getElementsByClassName(sectionsToHide);
  var showSections = document.getElementsByClassName(sectionsToShow);
  for (let i = 0; i < hideSections.length; i++) {
    hideSections[i].style.display = 'none';
  }
  for (let i = 0; i < showSections.length; i++) {
    showSections[i].style.display = 'block';
  }
  return;
}

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
}

export const isEmpty = testCollection => _.isEmpty(testCollection);

export const isLoggedIn = user => user && !isEmpty(user) && user.loggedIn;

export const validateEmail = email => {
  // eslint-disable-next-line
  const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return re.test(String(email).toLowerCase());
}

export const setInputError = (name, message) => {
  const inputWithError = $(`[name="${name}"]`);
  const label = inputWithError.prev();
  inputWithError.css('borderColor', 'red');
  if ($(`#${name}-error`).length === 0) {
    label.html(`${label.html()} <span id="${name}-error" style="color: red; float: right;">${message}</span>`);
  }
}

export const clearInputError = name => {
  const inputWithError = $(`[name="${name}"]`);
  const errorLabel = $(`#${name}-error`);
  inputWithError.css({ 'borderColor': '#ebeced' });
  if (errorLabel.length > 0) {
    errorLabel.remove();
  }
}

export const comparePasswords = () => {
  const password = $(`[name="password"]`).val();
  const passwordConfirmation = $(`[name="passwordConfirmation"]`).val();
  return password === passwordConfirmation;
}

export const inputHasValue = name => {
  const value = $(`[name="${name}"]`).val();
  return value !== "";
}

export const scrollToElement = name => {
  $([document.documentElement, document.body]).animate({
    scrollTop: $(`[name="${name}"]`).prev().offset().top - 10
  }, 'slow');
}

export const showAPIErrors = (error, setNotification) => {
  if (!error || !error.response || !error.response.data || typeof error.response.data !== 'object') {
    setNotification({ message: 'Something Went Wrong!' });
    return;
  }
  const { response: { data } } = error;

  for (var key in data) {
    if (data.hasOwnProperty(key)) {
      const errors = data[key];
      if (typeof errors === 'string') {
        setNotification({ message: errors });
        return;
      }
      errors.map(resError => setNotification({ message: resError }));
    }
  }
}

export const getNameFromUser = user => {
  const newUser = {...user};
  let { firstName, lastName, email } = newUser;

  if (!firstName && !lastName && email){
    const emailSplit = email.match(/^([^@]*)@/);
    const username = emailSplit ? emailSplit[1] : '';
    const names = username ? username.split(/[^A-Za-z]/) : [];

    for (let i = 0; i < names.length; i++){
      const currentName = _.capitalize(`${names[i] ? names[i] : ''}`);

      if (!firstName){
        firstName = currentName;
      } else {
        lastName = lastName ? `${lastName} ${currentName}` : ` ${currentName}`;
      }
    }
  }
  return `${firstName ? firstName : ''} ${lastName ? lastName : ''}`;
}

export const getTitleFromUser = user => {
  const newUser = {...user};
  let { accountType, companyName } = newUser;
  if (accountType === "freelancer" || (accountType === "employer" && !companyName)){
    return _.capitalize(accountType);
  } else if (accountType && accountType === "employer" && companyName){
    return `Member ${_.capitalize(companyName)}`;
  }
  return '';
}

export const openRoute = (event, route) => {
  if (event) event.preventDefault();
  window.location.href = route;
}

export const getUrlParameter = (name) => {
  // eslint-disable-next-line
  name = name.replace(/[\[]/, '\\[').replace(/[\]]/, '\\]');
  var regex = new RegExp('[\\?&]' + name + '=([^&#]*)');
  var results = regex.exec(document.location.search);
  return results === null ? '' : decodeURIComponent(results[1].replace(/\+/g, ' '));
}
