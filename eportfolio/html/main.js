// ------------- VARIABLES ------------- //
var ticking = false;
var isFirefox = /Firefox/i.test(navigator.userAgent);
var isIe =
  /MSIE/i.test(navigator.userAgent) ||
  /Trident.*rv\:11\./i.test(navigator.userAgent);
var scrollSensitivitySetting = 30; //Increase/decrease this number to change sensitivity to trackpad gestures (up = less sensitive; down = more sensitive)
var slideDurationSetting = 600; //Amount of time for which slide is "locked"
var currentSlideNumber = 0;
var totalSlideNumber = 9;

// ------------- DETERMINE DELTA/SCROLL DIRECTION ------------- //
function parallaxScroll(evt) {
  if (isFirefox) {
    //Set delta for Firefox
    delta = evt.detail * -120;
  } else if (isIe) {
    //Set delta for IE
    delta = -evt.deltaY;
  } else {
    //Set delta for all other browsers
    delta = evt.wheelDelta;
  }

  if (ticking != true) {
    if (delta <= -scrollSensitivitySetting) {
      //Down scroll
      ticking = true;
      if (currentSlideNumber !== totalSlideNumber - 1) {
        console.log(totalSlideNumber);
        currentSlideNumber++;
        nextItem();
      }
      slideDurationTimeout(slideDurationSetting);
    }
    if (delta >= scrollSensitivitySetting) {
      //Up scroll
      ticking = true;
      if (currentSlideNumber !== 0) {
        currentSlideNumber--;
      }
      previousItem();
      slideDurationTimeout(slideDurationSetting);
    }
  }
}

function touchScroll(direction) {
  if (ticking != true) {
    if (direction == "up") {
      //Down scroll
      ticking = true;
      if (currentSlideNumber !== totalSlideNumber - 1) {
        currentSlideNumber++;
        nextItem();
      }
      slideDurationTimeout(slideDurationSetting);
    }
    if (direction == "down") {
      //Up scroll
      ticking = true;
      if (currentSlideNumber !== 0) {
        currentSlideNumber--;
      }
      previousItem();
      slideDurationTimeout(slideDurationSetting);
    }
  }
}

// ------------- SET TIMEOUT TO TEMPORARILY "LOCK" SLIDES ------------- //
function slideDurationTimeout(slideDuration) {
  setTimeout(function () {
    ticking = false;
  }, slideDuration);
}

// ------------- ADD EVENT LISTENER ------------- //
var mousewheelEvent = isFirefox ? "DOMMouseScroll" : "wheel";
window.addEventListener(mousewheelEvent, _.throttle(parallaxScroll, 60), false);

// ------------- SLIDE MOTION ------------- //
function nextItem() {
  var $previousSlide = $(".background").eq(currentSlideNumber - 1);
  $previousSlide.removeClass("up-scroll").addClass("down-scroll");
}

function previousItem() {
  var $currentSlide = $(".background").eq(currentSlideNumber);
  $currentSlide.removeClass("down-scroll").addClass("up-scroll");
}

function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

async function showContent(ev) {
  let parent = ev.parentNode;
  let body = parent.parentNode.querySelector(".content-body");
  parent.style.filter = "blur(10px)";
  body.style.animation = "2s fadeIn, gradient 15s ease infinite";
  body.style.visibility = "visible";
}

function backToDef(ev) {
  let parent = ev.parentNode.parentNode;
  let content = parent.querySelector(".content-body");
  let wrapper = parent.querySelector(".content-wrapper");
  content.style.animation = "2s fadeOut, gradient 15s ease infinite";
  content.style.visibility = "hidden";
  wrapper.style.filter = "";
}
class Swipe {
  constructor(element) {
    this.xDown = null;
    this.yDown = null;
    this.element =
      typeof element === "string" ? document.querySelector(element) : element;

    this.element.addEventListener(
      "touchstart",
      function (evt) {
        this.xDown = evt.touches[0].clientX;
        this.yDown = evt.touches[0].clientY;
      }.bind(this),
      false
    );
  }

  onLeft(callback) {
    this.onLeft = callback;

    return this;
  }

  onRight(callback) {
    this.onRight = callback;

    return this;
  }

  onUp(callback) {
    this.onUp = callback;

    return this;
  }

  onDown(callback) {
    this.onDown = callback;

    return this;
  }

  handleTouchMove(evt) {
    if (!this.xDown || !this.yDown) {
      return;
    }

    var xUp = evt.touches[0].clientX;
    var yUp = evt.touches[0].clientY;

    this.xDiff = this.xDown - xUp;
    this.yDiff = this.yDown - yUp;

    if (Math.abs(this.xDiff) > Math.abs(this.yDiff)) {
      // Most significant.
      if (this.xDiff > 0) {
        this.onLeft();
      } else {
        this.onRight();
      }
    } else {
      if (this.yDiff > 0) {
        this.onUp();
      } else {
        this.onDown();
      }
    }

    // Reset values.
    this.xDown = null;
    this.yDown = null;
  }

  run() {
    this.element.addEventListener(
      "touchmove",
      function (evt) {
        this.handleTouchMove(evt);
      }.bind(this),
      false
    );
  }
}

var swiper = new Swipe(document.documentElement);
swiper.onUp(() => touchScroll("up"));
swiper.onDown(() => touchScroll("down"));
swiper.run();
