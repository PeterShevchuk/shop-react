import React, { useState } from "react";

import imgTest from "../../img/content/saleTop1.png";
import "./TopSale.css";

const TopSale = () => {
  const [timer, setTimer] = useState({ day: 0, hour: 0, min: 0, sec: 0 });

  const innerTimer = () => {
    let time = Date.now() - new Date("Dec 1, 2020");
    setTimer({
      day: fix(Math.floor(time / (1000 * 60 * 60 * 24))),
      hour: fix(Math.floor((time % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60))),
      min: fix(Math.floor((time % (1000 * 60 * 60)) / (1000 * 60))),
      sec: fix(Math.floor((time % (1000 * 60)) / 1000)),
    });
  };
  const fix = (num) => {
    num = Math.sign(num) === -1 ? num * -1 : num;
    return String(num < 10 && num >= 0 ? "0" + num : num);
  };
  setInterval(innerTimer, 1000);
  return (
    <div className="saleTop">
      <div></div>
      <div className="container saleTop__content">
        <div>
          <p className="saleTop__sale">Sale</p>
          <p className="saleTop__title">
            Deal of the Day <br />
            30% on Dresses
          </p>
          <img className="saleTop__image mobile tablet" src={imgTest} alt="" width="900" height="1000" />
          <p className="saleTop__name">Pretty Thing Floral Skater Dress</p>
          <p className="saleTop__price">$30.50</p>
          <div className="saleTop__timer">
            <div className="saleTop__timer-day">
              <p className="saleTop__timer-number">{timer.day}</p>
              <p className="saleTop__timer-char">day</p>
            </div>
            <div className="saleTop__timer-hour">
              <p className="saleTop__timer-number">{timer.hour}</p>
              <p className="saleTop__timer-char">hours</p>
            </div>
            <div className="saleTop__timer-min">
              <p className="saleTop__timer-number">{timer.min}</p>
              <p className="saleTop__timer-char">minutes</p>
            </div>
            <div className="saleTop__timer-sec">
              <p className="saleTop__timer-number">{timer.sec}</p>
              <p className="saleTop__timer-char">seconds</p>
            </div>
          </div>
          <button className="btn saleTop__add">Add to Cart</button>
        </div>
      </div>
      <img className="saleTop__image laptop" src={imgTest} alt="" width="900" height="1000" />
    </div>
  );
};

export default TopSale;
