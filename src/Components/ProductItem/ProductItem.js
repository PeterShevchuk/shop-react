import React from "react";
import { useHistory } from "react-router-dom";
import Rating from "@material-ui/lab/Rating";
import { fixedPrice } from "../../Addons/func";
import { navigation } from "../../Addons/vars";

import "./ProductItem.css";
import AddButton from "../Cart/AddButton/AddButton";
const ProductItem = ({ rate, price, title, images, id, priceNew, imageBasic }) => {
  const history = useHistory();

  const redirectToDetailsItem = () => {
    history.push(`${navigation.shop}/${id}`);
  };
  return (
    <li className="product__list">
      <div className="product__click" onClick={redirectToDetailsItem}>
        <div className="product__poster">
          <img src={images[imageBasic]} alt={title} className="product__poster-img" width="387" height="440" />
        </div>
        <Rating name="read-only" value={Number(rate)} readOnly />
        <div className="product__name">{title}</div>
        <div className="product__price">
          {priceNew ? (
            <>
              <p className="product__price-new">${fixedPrice(priceNew)}</p>
              <p className="product__price-old">${fixedPrice(price)}</p>
            </>
          ) : (
            <>
              <p className="product__price-new">${fixedPrice(price)}</p>
            </>
          )}
        </div>
      </div>
      <AddButton id={id} addClass="product__add" />
    </li>
  );
};

export default ProductItem;
