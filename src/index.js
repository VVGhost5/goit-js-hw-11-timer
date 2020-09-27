import './styles.css';

const daysCounterRef = document.querySelector('[data-value="days"]');
const hoursCounterRef = document.querySelector('[data-value="hours"]');
const minutesCounterRef = document.querySelector('[data-value="mins"]');
const secondsCounterRef = document.querySelector('[data-value="secs"]');
const bodyRef = document.querySelector('body');
const buttonStopRef = document.querySelector('.btn_stop');
const buttonStartRef = document.querySelector('.btn_start');

class CountdownTimer {
  constructor({ selector, targetDate }) {
    this.selector = selector;
    this.targetDate = targetDate;
    this.dateInFuture = this.targetDate.getTime();
    this.intervalId = null;
    this.isActive = true;
  }

  updateClock(deltaTime) {
    const days = this.pad(Math.floor(deltaTime / (1000 * 60 * 60 * 24)));
    const hours = this.pad(
      Math.floor((deltaTime % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
    );
    const mins = this.pad(
      Math.floor((deltaTime % (1000 * 60 * 60)) / (1000 * 60)),
    );
    const secs = this.pad(Math.floor((deltaTime % (1000 * 60)) / 1000));

    daysCounterRef.textContent = days;
    hoursCounterRef.textContent = hours;
    minutesCounterRef.textContent = mins;
    secondsCounterRef.textContent = secs;
  }

  pad(value) {
    return String(value).padStart(2, '0');
  }

  startCounter() {
    if (this.isActive) {
      this.isActive = false;
      this.intervalId = setInterval(() => {
        const currentTime = Date.now();
        const differenceInTime = this.dateInFuture - currentTime;
        this.updateClock(differenceInTime);
        this.checkClock(currentTime);
      }, 1000);
    }
  }

  checkClock(currentTime) {
    if (this.dateInFuture <= currentTime) {
      const hpbElement = document.createElement('div');
      hpbElement.textContent = 'Happy Birthday to me !';
      hpbElement.classList.add('title');
      bodyRef.appendChild(hpbElement);
      clearInterval(this.intervalId);
      daysCounterRef.textContent = 0;
      hoursCounterRef.textContent = 0;
      minutesCounterRef.textContent = 0;
      secondsCounterRef.textContent = 0;
    }
  }

  stopCounter() {
    this.isActive = true;
    clearInterval(this.intervalId);
  }
}

const newTimer = new CountdownTimer({
  selector: '#timer-1',
  targetDate: new Date('May 20, 2021'),
});

newTimer.startCounter();

buttonStopRef.addEventListener('click', newTimer.stopCounter.bind(newTimer));
buttonStartRef.addEventListener('click', newTimer.startCounter.bind(newTimer));
