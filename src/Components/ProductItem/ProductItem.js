import React, { useState } from "react";
import Rating from "@material-ui/lab/Rating";
import { setItemCart, removeItemCart } from "../../Redux/Slice";
import { fixedPrice } from "../../Addons/func";

import "./ProductItem.css";
import { useDispatch, useSelector } from "react-redux";
const ProductItem = ({ rate, price, title, poster, id, priceNew, category, season, sex }) => {
  const dispatch = useDispatch();
  const { cart } = useSelector((state) => state.session);
  const [isCart, setIsCart] = useState(cart.find((item) => (item.id === id ? true : false)));
  const toggleBasket = () => {
    if (isCart) {
      dispatch(removeItemCart(id));
      setIsCart(false);
      return;
    }
    dispatch(setItemCart({ title, poster, price, priceNew, id, category, season, sex }));
    setIsCart(true);
  };
  return (
    <li className="product__list">
      <div className="product__poster">
        <img src={poster} alt={title} className="product__poster-img" width="387" height="440" />
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
      <button className="btn product__add" onClick={toggleBasket}>
        {isCart ? "Remove from " : "Add to "}
        Cart
      </button>
    </li>
  );
};

export default ProductItem;
