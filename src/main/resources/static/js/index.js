const targetDate = new Date();
targetDate.setHours(targetDate.getHours() + 5);

function getTimeSegmentElements(segmentElement) {
  const segmentDisplay = segmentElement.querySelector(
    '.segment-display'
  );
  const segmentDisplayTop = segmentDisplay.querySelector(
    '.segment-display__top'
  );
  const segmentDisplayBottom = segmentDisplay.querySelector(
    '.segment-display__bottom'
  );

  const segmentOverlay = segmentDisplay.querySelector(
    '.segment-overlay'
  );
  const segmentOverlayTop = segmentOverlay.querySelector(
    '.segment-overlay__top'
  );
  const segmentOverlayBottom = segmentOverlay.querySelector(
    '.segment-overlay__bottom'
  );

  return {
    segmentDisplayTop,
    segmentDisplayBottom,
    segmentOverlay,
    segmentOverlayTop,
    segmentOverlayBottom,
  };
}

function updateSegmentValues(
  displayElement,
  overlayElement,
  value
) {
  displayElement.textContent = value;
  overlayElement.textContent = value;
}

function updateTimeSegment(segmentElement, timeValue) {
  const segmentElements =
    getTimeSegmentElements(segmentElement);

  if (
    parseInt(
      segmentElements.segmentDisplayTop.textContent,
      10
    ) === timeValue
  ) {
    return;
  }

  segmentElements.segmentOverlay.classList.add('flip');

  updateSegmentValues(
    segmentElements.segmentDisplayTop,
    segmentElements.segmentOverlayBottom,
    timeValue
  );

  function finishAnimation() {
    segmentElements.segmentOverlay.classList.remove('flip');
    updateSegmentValues(
      segmentElements.segmentDisplayBottom,
      segmentElements.segmentOverlayTop,
      timeValue
    );

    this.removeEventListener(
      'animationend',
      finishAnimation
    );
  }
  segmentElements.segmentOverlay.addEventListener('animationend',finishAnimation);
}

function updateTimeSection(sectionID, timeValue) {
  const firstNumber = Math.floor(timeValue / 10) || 0;
  const secondNumber = timeValue % 10 || 0;
  const sectionElement = document.getElementById(sectionID);
  const timeSegments = sectionElement.querySelectorAll('.time-segment');

  updateTimeSegment(timeSegments[0], firstNumber);
  updateTimeSegment(timeSegments[1], secondNumber);
}

function getTimeRemaining(targetDateTime) {
  const nowTime = Date.now();
  const complete = nowTime >= targetDateTime;

  if (complete) {
    return {
      complete,
      seconds: 0,
      minutes: 0,
      hours: 0,
    };
  }
    const date = new Date();
	const secondsRemaining = Math.floor((nowTime) / 1000);
	const minutes = date.getMinutes();
	const hours = date.getHours();
	const seconds = secondsRemaining % 60;
  return {
    complete,
    seconds,
    minutes,
    hours,
  };
}
function updateAllSegments() {
  const timeRemainingBits = getTimeRemaining(
    new Date(targetDate).getTime()
  );
  updateTimeSection('seconds', timeRemainingBits.seconds);
  updateTimeSection('minutes', timeRemainingBits.minutes);
  updateTimeSection('hours', timeRemainingBits.hours);
  return timeRemainingBits.complete;
}
const countdownTimer = setInterval(() => {
  const isComplete = updateAllSegments();
  if (isComplete) {
    clearInterval(countdownTimer);
  }
}, 1000);
updateAllSegments();
 	var ipAddr;
function getIP(json) {
 	ipAddr = json.ip;
 	console.log(ipAddr)
}


var xhr = new XMLHttpRequest();
console.log(ipAddr);
xhr.open('GET', 'http://api.ipstack.com/+${ipAddr}+?access_key=f228c5e05cd3e7ef4b8c36ac5b35685e', true);

	xhr.onreadystatechange = function() {
    console.log(this.responseText);
};

xhr.send();