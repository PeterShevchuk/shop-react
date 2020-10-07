import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import AddEditForm from "../AddEditForm/AddEditForm";

import { setItem } from "../../../operations";
import { setErrorState } from "../../../Redux/Slice";

import { rundomNum } from "../../../Addons/func";

import "./AddItem.css";
const initialState = {
  title: "",
  images: [],
  price: "",
  rate: rundomNum(5),
  sex: 0,
  season: [],
  category: "",
  sale: 1,
  priceNew: "",
  imageBasic: 0,
  folderName: "",
};

const AddItem = () => {
  const [itemInfo, setItemInfo] = useState(initialState);

  const dispatch = useDispatch();

  const { user } = useSelector((state) => state.session);
  const onSubmit = () => {
    if (checkAdd()) {
      return;
    }
    dispatch(setItem({ ...itemInfo, date: Date.now(), authorName: user.name, authorUid: user.uid }));
    setItemInfo(initialState);
  };
  const checkAdd = () => {
    const { title, images, price, category, season } = itemInfo;
    if (title === "" && title === " ") {
      setError("Error! Title is null");
      return true;
    }
    if (images === "") {
      setError("Error! No poster");
      return true;
    }
    if (price === "") {
      setError("Error! No price");
      return true;
    }
    if (category === "") {
      setError("Error! Choose category");
      return true;
    }
    if (season.length > 0) {
      setError("Error! Season must be one value");
      return true;
    }
    return false;
  };
  const setError = (mess) => {
    dispatch(setErrorState({ message: mess }));
  };
  return (
    <>
      <div className="container addItem">
        <AddEditForm itemInfo={itemInfo} setItemInfo={setItemInfo} />
        <button className="btn addItem__submit" onClick={onSubmit}>
          add
        </button>
      </div>
    </>
  );
};

export default AddItem;
