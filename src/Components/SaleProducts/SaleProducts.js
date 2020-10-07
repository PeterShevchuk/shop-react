import React from "react";
import { useSelector } from "react-redux";

import ProductItem from "../ProductItem/ProductItem";

import { newArrayWithCount } from "../../Addons/func";

import "./SaleProducts.css";
import { navigation } from "../../Addons/vars";
const SaleProducts = ({ count = null }) => {
  const products = useSelector((state) => state.data.items);

  const productsFiltered = products.length ? products.filter((item) => item.sale !== 1) : [];
  // console.log(productsFiltered);

  return (
    <div className="container sale">
      <h2 className="sale__title">
        <a href={navigation.sale}> Sale Products </a>
      </h2>
      <ul className="product">{productsFiltered.length > 0 && newArrayWithCount(productsFiltered, count).map((item) => <ProductItem {...item} key={"sale" + item.date} />)}</ul>
    </div>
  );
};

export default SaleProducts;
