import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useHistory } from "react-router-dom";

import { fixTimer } from "../../Addons/func";
import { navigation } from "../../Addons/vars";

import AddButton from "../Cart/AddButton/AddButton";

import "./TopSale.css";

const TopSale = () => {
  const [timer, setTimer] = useState({ day: 0, hour: 0, min: 0, sec: 0 });
  const { items } = useSelector((state) => state.data);
  const infoItem = items.length > 0 && items.find((item) => item.sale === "top");
  const isDate = infoItem && infoItem.date ? Date.now() - (infoItem.date + 36000000) : -1;
  useEffect(() => {
    const innerTimer = async () => {
      await setTimer({
        day: fixTimer(Math.floor(isDate / (1000 * 60 * 60 * 24))),
        hour: fixTimer(Math.floor((isDate % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60))),
        min: fixTimer(Math.floor((isDate % (1000 * 60 * 60)) / (1000 * 60))),
        sec: fixTimer(Math.floor((isDate % (1000 * 60)) / 1000)),
      });
    };
    if (isDate < 0) {
      const interval = setInterval(innerTimer, 1000);
      return () => clearInterval(interval);
    }
  }, [isDate]);

  const history = useHistory();

  const redirectToDetailsItem = () => {
    history.push(`${navigation.shop}/${infoItem.id}`);
  };
  return (
    <>
      {isDate < 0 && (
        <div className="saleTop">
          <div className="container saleTop__content">
            <div>
              <p className="saleTop__sale">Sale</p>
              <p className="saleTop__title">
                Deal of the Day <br />
                30% on <br />
                {infoItem.category}
              </p>
              <img className="saleTop__image mobile tablet" src={infoItem.images[infoItem.imageBasic]} alt={infoItem.title} width="900" height="1000" onClick={redirectToDetailsItem} />
              <p className="saleTop__name" onClick={redirectToDetailsItem}>
                {infoItem.title}
              </p>
              <p className="saleTop__price">${infoItem.priceNew}</p>
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
              <AddButton id={infoItem.id} addClass="saleTop__add" />
            </div>
          </div>
          <img className="saleTop__image laptop" src={infoItem.images[infoItem.imageBasic]} alt={infoItem.title} width="900" height="1000" onClick={redirectToDetailsItem} />
        </div>
      )}
    </>
  );
};

export default TopSale;
