import React from "react";
import Slider from "react-slick";
import { useSelector } from "react-redux";

import "./Slider.css";
import { Link } from "react-router-dom";
import { navigation } from "../../Addons/vars";
const settings = {
  dots: true,
  infinite: true,
  speed: 500,
  slidesToShow: 1,
  slidesToScroll: 1,
  autoplay: true,
  focusOnSelect: true,
  pauseOnHover: false,
  arrows: false,
};

const Sliders = () => {
  const { slider } = useSelector((state) => state.data);
  return (
    <Slider {...settings}>
      {slider.map((item) => (
        <Link to={navigation.shop + "/" + item.id} key={"addSlider" + item.id}>
          <div className="slider">
            <div className="slider__text">
              <p className="slider__text-first">{item.text1}</p>
              <p className="slider__text-second">{item.text2}</p>
            </div>
            <img src={item.image} alt="slider" width="100%" height="100%" />
          </div>
        </Link>
      ))}
    </Slider>
    // <div></div>
  );
};
export default Sliders;
