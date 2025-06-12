export default class Timer {
  static SELECTORS = {
    DAYS: '#days',
    HOURS: '#hours',
    MINUTES: '#minutes',
    SECONDS: '#seconds',
  };
  constructor() {
    this._nowUTC = new Date();
    this._nextYearUTC = new Date(this._nowUTC.getFullYear() + 1, 0, 1, 0, 0, 0);

    this._timerId = null;

    this.init();
  }

  init() {
    this._days = document.querySelector(Timer.SELECTORS.DAYS);
    this._hours = document.querySelector(Timer.SELECTORS.HOURS);
    this._minutes = document.querySelector(Timer.SELECTORS.MINUTES);
    this._seconds = document.querySelector(Timer.SELECTORS.SECONDS);

    if (!this._days || !this._hours || !this._minutes || !this._seconds) {
      return;
    }

    this.getTime();
  }

  getTime() {
    this.getDifferent();
    this._timerId = setInterval(() => this.getDifferent(), 1000);
  }

  getDifferent() {
    this._nowUTC = new Date();
    this._nowUTC.setMinutes(
      this._nowUTC.getMinutes() + this._nowUTC.getTimezoneOffset()
    );

    const diff = this._nextYearUTC - this._nowUTC;

    if (diff <= 0) {
      this.stop();

      this._now = new Date();
      this.getTime();

      return;
    }

    this.render(this.calculateTimeUnits(diff));
  }

  calculateTimeUnits(diff) {
    const seconds = 1000;
    const minute = seconds * 60;
    const hour = minute * 60;
    const days = hour * 24;

    return {
      days: Math.floor(diff / days),
      hours: Math.floor((diff % days) / hour),
      minutes: Math.floor((diff % hour) / minute),
      seconds: Math.floor((diff % minute) / seconds),
    };
  }

  render({ days, hours, minutes, seconds }) {
    this._days.textContent = String(days);
    this._hours.textContent = String(hours);
    this._minutes.textContent = String(minutes);
    this._seconds.textContent = String(seconds);
  }

  stop() {
    clearInterval(this._timerId);
  }
}
