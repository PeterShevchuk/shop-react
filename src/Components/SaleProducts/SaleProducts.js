import React from "react";
import { useSelector } from "react-redux";

import ProductItem from "../ProductItem/ProductItem";

import { newArrayWithCount } from "../../Addons/func";

import "./SaleProducts.css";
import { navigation } from "../../Addons/vars";
const SaleProducts = ({ count = null }) => {
  const products = useSelector((state) => state.data.items);

  let productsFiltered = products.filter((item) => item.sale);

  return (
    <div className="container sale">
      <h2 className="sale__title">
        <a href={navigation.sale}> Sale Products </a>
      </h2>
      <ul className="product">{productsFiltered.length && newArrayWithCount(productsFiltered, count).map((item) => <ProductItem {...item} key={"sale" + item.id} />)}</ul>
    </div>
  );
};

export default SaleProducts;
