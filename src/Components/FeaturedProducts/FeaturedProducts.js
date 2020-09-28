import React from "react";
import ProductList from "../ProductList/ProductList";

import "./FeaturedProducts.css";
const FeaturedProducts = () => {
  return (
    <div className="container featured">
      <h2 className="featured__title">
        <a href="/"> Featured Products </a>
      </h2>
      <ProductList />
    </div>
  );
};

export default FeaturedProducts;
