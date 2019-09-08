import $ from "jquery";

var ACCOUNT_TYPES = ['employer_signup', 'freelancer_signup', 'employer_signin', 'freelancer_signin'];
var POPUPS = ['portfolio-upload-modal', 'portfolio-view-modal', 'hire-me-modal'];

export function insertAndExecute(domelement, text) {
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
}

export function nodeName(elem, name) {
  return elem.nodeName && elem.nodeName.toUpperCase() === name.toUpperCase();
}

export function evalScript(elem) {
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
}

export function includeHTML() {
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
}

export function openPage(evt, divId, linkClass, contentClass) {
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
}

export function renderRatings() {
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
}

export function selectRadioButton(evnt, radioButtonClass, accountType) {
  var i, radioButtons;
  radioButtons = document.getElementsByClassName(radioButtonClass);
  for (i = 0; i < radioButtons.length; i++) {
    radioButtons[i].className = radioButtons[i].className.replace(" active", "");
  }
  if (evnt) {
    evnt.currentTarget.className += " active";
  } else {
    var radioButton = document.getElementById('employer_signup-radio-btn') || document.getElementById('employer_signin-radio-btn');
    if (radioButton) {
      radioButton.className += " active";
    }
  }
  if (accountType) {
    localStorage.ACCOUNT_TYPE = accountType;
  }
}

export function openAccountPage() {
  var accountType = localStorage.ACCOUNT_TYPE;
  if (ACCOUNT_TYPES.includes(accountType)) {
    openPage(null, accountType, 'tablinks', 'tabcontent');
    localStorage.ACCOUNT_TYPE = '';
  } else {
    openPage(null, 'home', 'tablinks', 'tabcontent');
  }
}

export function selectSingleRadioButton(evnt) {
  if (evnt.currentTarget.className.includes(' active')) {
    evnt.currentTarget.className = evnt.currentTarget.className.replace(" active", "");
  } else {
    evnt.currentTarget.className += " active";
  }
}

export function renderTooltip(evnt) {
  if (evnt) {
    var elementRect = evnt.currentTarget.getBoundingClientRect(),
      bodyRect = document.body.getBoundingClientRect(),
      top = elementRect.top - bodyRect.top,
      left = elementRect.left - bodyRect.left,
      tooltip = document.getElementById('tooltip');
    tooltip.style.display = 'inline';
    tooltip.style.position = 'absolute';
    tooltip.style.top = top - 119;
    tooltip.style.left = left - 79;
  }
}

export function showOverlay(overlayId, evnt = null, linkClass = "") {
  document.getElementById(overlayId).style.display = 'block';
  if (evnt) {
    if (linkClass) {
      var tablinks = document.getElementsByClassName(linkClass);
      for (var i = 0; i < tablinks.length; i++) {
        tablinks[i].className = tablinks[i].className.replace(" active", "");
      }
    }
    evnt.currentTarget.className += " active";
  }

  if (POPUPS.includes(overlayId)) {
    $("body").addClass("modal-open");
  }
}

export function dismissOverlay(evnt, overlayIds = null) {
  if (evnt) {
    evnt.currentTarget.style.display = 'none';
  }
  if (overlayIds) {
    for (var i = 0; i < overlayIds.length; i++) {
      document.getElementById(overlayIds[i]).style.display = 'none';
      if (POPUPS.includes(overlayIds[i])) {
        $("body").removeClass("modal-open");
      }
    }
  }
  var tablinks = document.getElementsByClassName('side-tablinks-2');
  for (i = 0; i < tablinks.length; i++) {
    tablinks[i].className = tablinks[i].className.replace(" active", "");
  }
}

export function stopPropagation(evnt) {
  if (evnt) {
    evnt.stopPropagation();
  }
}

export function editSection(sectionToHide, sectionToShow) {
  document.getElementById(sectionToHide).style.display = 'none';
  document.getElementById(sectionToShow).style.display = 'block';
}

export function editSectionClass(sectionsToHide, sectionsToShow) {
  var hideSections = document.getElementsByClassName(sectionsToHide);
  var showSections = document.getElementsByClassName(sectionsToShow);
  for (let i = 0; i < hideSections.length; i++) {
    hideSections[i].style.display = 'none';
  }
  for (let i = 0; i < showSections.length; i++) {
    showSections[i].style.display = 'block';
  }
}

export function toggleVideoPlay(videoId, buttonId) {
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
}
