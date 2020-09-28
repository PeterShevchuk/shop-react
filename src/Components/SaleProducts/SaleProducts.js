import React from "react";

import ProductList from "../ProductList/ProductList";

import "./SaleProducts.css";
const SaleProducts = () => {
  return (
    <div className="container sale">
      <h2 className="sale__title">
        <a href="/"> Sale Products </a>
      </h2>
      <ProductList count="4" />
    </div>
  );
};

export default SaleProducts;
