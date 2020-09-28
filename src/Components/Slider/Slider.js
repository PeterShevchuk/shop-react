import React from "react";

import sliderImg from "../../img/slider/bg.png";
import "./Slider.css";

const Slider = () => {
  return (
    <div className="container slider">
      <div className="slider__text">
        <p className="slider__text-first">Sale</p>
        <p className="slider__text-second">Up to 50% Off</p>
      </div>
      <img src={sliderImg} alt="slider" width="100%" height="100%" />
    </div>
  );
};
export default Slider;
