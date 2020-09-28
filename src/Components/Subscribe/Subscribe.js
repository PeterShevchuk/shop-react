import React from "react";

import "./Subscribe.css";
const Subscribe = () => {
  return (
    <div className="subscribe">
      <div className="container">
        <p className="subscribe__title">Subscribe to newsletter</p>
        <p className="subscribe__text">Get updated on new product releases and promotions.</p>
        <form className="subscribe__form" action="#" method="get">
          <input className="subscribe__email" type="email" name="email" placeholder="Your Email..." required />
          <button className="subscribe__submit" type="submit" value="send">
            Submit
          </button>
        </form>
      </div>
    </div>
  );
};

export default Subscribe;
