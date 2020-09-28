export default class Timer {
  constructor(obj) {
    this.selector = [
      document.querySelector(obj.day),
      document.querySelector(obj.hour),
      document.querySelector(obj.min),
      document.querySelector(obj.sec),
    ];
    this.date = obj.targetDate;
    this.innerTimer = this.innerTimer.bind(this);
    this.startTimer = this.startTimer.bind(this);
  }
  innerTimer() {
    this.time = Date.now() - this.date;
    this.selector[0].textContent = this.fix(
      Math.floor(this.time / (1000 * 60 * 60 * 24)),
    );
    this.selector[1].textContent = this.fix(
      Math.floor((this.time % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
    );
    this.selector[2].textContent = this.fix(
      Math.floor((this.time % (1000 * 60 * 60)) / (1000 * 60)),
    );
    this.selector[3].textContent = this.fix(
      Math.floor((this.time % (1000 * 60)) / 1000),
    );
  }
  startTimer() {
    this.timerId = setInterval(this.innerTimer, 1000);
  }
  fix(num) {
    Math.sign(num) === -1 ? (num *= -1) : null;
    return String(num < 10 && num >= 0 ? "0" + num : num);
  }
}
