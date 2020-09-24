import './styles.css';

const daysCounterRef = document.querySelector('[data-value="days"]');
const hoursCounterRef = document.querySelector('[data-value="hours"]');
const minutesCounterRef = document.querySelector('[data-value="mins"]');
const secondsCounterRef = document.querySelector('[data-value="secs"]');
const bodyRef = document.querySelector('body');

class CountdownTimer {
  constructor({ selector, targetDate }) {
    this.selector = selector;
    this.targetDate = targetDate;
  }
}

const newTimer = new CountdownTimer({
  selector: '#timer-1',
  targetDate: new Date('May 20, 2021'),
});

const date = newTimer.targetDate;
const dateInFuture = date.getTime();

const intervalId = setInterval(() => {
  const currentTime = Date.now();
  const differenceInTime = dateInFuture - currentTime;

  updateClock(differenceInTime);
  checkClock(currentTime);
}, 1000);

const updateClock = deltaTime => {
  const days = pad(Math.floor(deltaTime / (1000 * 60 * 60 * 24)));
  const hours = pad(
    Math.floor((deltaTime % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
  );
  const mins = pad(Math.floor((deltaTime % (1000 * 60 * 60)) / (1000 * 60)));
  const secs = pad(Math.floor((deltaTime % (1000 * 60)) / 1000));

  daysCounterRef.textContent = days;
  hoursCounterRef.textContent = hours;
  minutesCounterRef.textContent = mins;
  secondsCounterRef.textContent = secs;
};

function pad(value) {
  return String(value).padStart(2, '0');
}

function checkClock(currentTime) {
  if (dateInFuture <= currentTime) {
    const hpbElement = document.createElement('div');
    hpbElement.textContent = 'Happy Birthday to me !';
    hpbElement.classList.add('title');
    bodyRef.appendChild(hpbElement);
    clearInterval(intervalId);
    daysCounterRef.textContent = 0;
    hoursCounterRef.textContent = 0;
    minutesCounterRef.textContent = 0;
    secondsCounterRef.textContent = 0;
  }
}
