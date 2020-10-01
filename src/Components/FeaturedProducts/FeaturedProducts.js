import React from "react";
import { useSelector } from "react-redux";

import ProductItem from "../ProductItem/ProductItem";

import { newArrayWithCount } from "../../Addons/func";

import "./FeaturedProducts.css";
import { navigation } from "../../Addons/vars";
const FeaturedProducts = ({ count = null }) => {
  const products = useSelector((state) => state.data.items);
  return (
    <div className="container featured">
      <h2 className="featured__title">
        <a href={navigation.featured}> Featured Products </a>
      </h2>
      <ul className="product">{products.length && newArrayWithCount(products, count).map((item) => <ProductItem {...item} key={"featured" + item.date} />)}</ul>
    </div>
  );
};

export default FeaturedProducts;
