import React from "react";

import imgTest from "../../img/content/saleTop1.png";
import "./TopSale.css";
const TopSale = () => {
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
              <p className="saleTop__timer-number">00</p>
              <p className="saleTop__timer-char">day</p>
            </div>
            <div className="saleTop__timer-hour">
              <p className="saleTop__timer-number">00</p>
              <p className="saleTop__timer-char">hours</p>
            </div>
            <div className="saleTop__timer-min">
              <p className="saleTop__timer-number">00</p>
              <p className="saleTop__timer-char">minutes</p>
            </div>
            <div className="saleTop__timer-sec">
              <p className="saleTop__timer-number">00</p>
              <p className="saleTop__timer-char">seconds</p>
            </div>
          </div>
          <button className="saleTop__add">Add to Cart</button>
        </div>
      </div>
      <img className="saleTop__image laptop" src={imgTest} alt="" width="900" height="1000" />
    </div>
  );
};

export default TopSale;
