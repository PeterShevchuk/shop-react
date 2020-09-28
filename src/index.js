import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import * as serviceWorker from "./serviceWorker";
import { BrowserRouter } from "react-router-dom";

ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </React.StrictMode>,

  // <Provider>
  //   <PersistGate>
  //     <BrowserRouter>
  //       <App />
  //     </BrowserRouter>
  //   </PersistGate>
  // </Provider>
  document.getElementById("root")
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();

class Timer {
  constructor(obj) {
    this.selector = [document.querySelector(obj.day), document.querySelector(obj.hour), document.querySelector(obj.min), document.querySelector(obj.sec)];
    this.date = obj.targetDate;
    this.innerTimer = this.innerTimer.bind(this);
    this.startTimer = this.startTimer.bind(this);
  }
  innerTimer() {
    this.time = Date.now() - this.date;
    this.selector[0].textContent = this.fix(Math.floor(this.time / (1000 * 60 * 60 * 24)));
    this.selector[1].textContent = this.fix(Math.floor((this.time % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)));
    this.selector[2].textContent = this.fix(Math.floor((this.time % (1000 * 60 * 60)) / (1000 * 60)));
    this.selector[3].textContent = this.fix(Math.floor((this.time % (1000 * 60)) / 1000));
  }
  startTimer() {
    this.timerId = setInterval(this.innerTimer, 1000);
  }
  fix(num) {
    num = Math.sign(num) === -1 ? num * -1 : num;
    return String(num < 10 && num >= 0 ? "0" + num : num);
  }
}

const timer1 = new Timer({
  day: ".saleTop__timer-day p",
  hour: ".saleTop__timer-hour p",
  min: ".saleTop__timer-min p",
  sec: ".saleTop__timer-sec p",
  targetDate: new Date("Dec 1, 2020"),
});
timer1.startTimer();
