import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { subscribe } from "../../operations";

import "./Subscribe.css";
const Subscribe = () => {
  const [info, setInfo] = useState("");
  const dispatch = useDispatch();
  const inputHendler = ({ target }) => {
    setInfo(target.value);
  };
  const onSubmit = (e) => {
    e.preventDefault();
    dispatch(subscribe(info));
  };
  return (
    <div className="subscribe">
      <div className="container">
        <p className="subscribe__title">Subscribe to newsletter</p>
        <p className="subscribe__text">Get updated on new product releases and promotions.</p>
        <form className="subscribe__form" action="#" method="get" onSubmit={onSubmit}>
          <input className="subscribe__email" type="email" name="email" placeholder="Your Email..." value={info} required onChange={inputHendler} />
          <button className="subscribe__submit" type="submit" value="send">
            Submit
          </button>
        </form>
      </div>
    </div>
  );
};

export default Subscribe;
