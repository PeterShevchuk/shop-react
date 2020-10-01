import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import { setItemCart, removeItemCart } from "../../../Redux/Slice";

const AddButton = ({ id, addClass = "" }) => {
  const { cart } = useSelector((state) => state.session);
  const [isCart, setIsCart] = useState(cart.find((item) => (item.id === id ? item : false)));
  const dataThisItem = useSelector((state) => state.data.items.find((item) => item.id === id));
  const dispatch = useDispatch();

  const toggleBasket = () => {
    if (isCart) {
      dispatch(removeItemCart(id));
      setIsCart(false);
      return;
    }
    dispatch(setItemCart(dataThisItem));
    setIsCart(true);
  };
  return (
    <button className={"btn " + addClass} onClick={toggleBasket}>
      {isCart ? "Remove from " : "Add to "}
      Cart
    </button>
  );
};

export default AddButton;
