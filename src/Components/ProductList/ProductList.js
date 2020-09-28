import React from "react";

import ProductItem from "../ProductItem/ProductItem";

import "./ProductList.css";
const ProductList = ({ count }) => {
  return (
    <ul className="product">
      <ProductItem />
      <ProductItem />
      <ProductItem />
      <ProductItem />
    </ul>
  );
};

export default ProductList;
