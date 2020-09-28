import React from "react";

import imgTest from "../../img/content/sale1.png";
import "./ProductItem.css";
const ProductItem = ({ img }) => {
  return (
    <li className="product__list">
      <img src={imgTest} alt="" className="product__image" width="387" height="440" />
      <div className="product__rate"></div>
      <div className="product__name">Embroidered Linen Shirt</div>
      <div className="product__price">
        <p className="product__price-new">$19.99</p>
        <p className="product__price-old">$30.50</p>
      </div>
      <button className="product__add">Add to Cart</button>
    </li>
  );
};

export default ProductItem;
