import React, { useState } from "react";

import { useDispatch } from "react-redux";
import { setItem } from "../../operations";
import { storage } from "../../config";
import { setErrorState } from "../../Redux/Slice";

import { seasons, category } from "../../Addons/cat";
import { rundomNum } from "../../Addons/func";

import "./AddItem.css";
const nameFolderForImagesItems = "product";
const initialState = {
  title: "",
  poster: "",
  price: "",
  rate: rundomNum(5),
  sex: "male",
  season: "",
  category: "",
  sale: false,
  priceNew: "",
};

const AddItem = () => {
  const [userInfo, setUserInfo] = useState(initialState);
  const [progress, setProgress] = useState();

  const dispatch = useDispatch();
  const inputHolderFile = (e) => {
    if (!e.target.files[0]) {
      return;
    }
    const link = nameFolderForImagesItems + "/" + Date.now() + e.target.files[0].name;
    let uploadTask = storage.ref().child(link).put(e.target.files[0], { contentType: e.target.files[0].type });
    uploadTask.on(
      "state_changed",
      (snapshot) => setProgress((snapshot.bytesTransferred / snapshot.totalBytes) * 100),
      (error) => dispatch(setErrorState(error)),
      () => {
        uploadTask.snapshot.ref.getDownloadURL().then((downloadURL) => setUserInfo({ ...userInfo, poster: downloadURL }));
      }
    );
  };
  const inputHolder = ({ target }) => {
    setUserInfo({ ...userInfo, [target.name]: target.value });
  };
  const onSubmit = () => {
    dispatch(setItem({ ...userInfo, date: Date.now() }));
    setUserInfo(initialState);
  };
  return (
    <>
      <div className="container addItem">
        <div className="addItem__item">
          <p className="addItem__label">Title item</p>
          <input className="addItem__input" type="text" name="title" onChange={inputHolder} value={userInfo.title} />
        </div>
        <div className="addItem__item">
          <p className="addItem__label">Category</p>
          <select className="addItem__item-select" size="8" multiple name="category" onChange={inputHolder}>
            {category.map((item) => (
              <option key={item} value={item}>
                {item}
              </option>
            ))}
          </select>
        </div>
        <div className="addItem__item">
          <p className="addItem__label">Season</p>
          <select className="addItem__item-select" size={seasons.length} multiple name="season" onChange={inputHolder}>
            {seasons.map((item) => (
              <option key={item} value={item}>
                {item}
              </option>
            ))}
          </select>
        </div>
        <div className="addItem__item">
          <p className="addItem__label">Poster</p>
          <p className="addItem__item-poster">
            <input type="file" name="file" multiple="multiple" accept="image/png,image/jpeg" onChange={inputHolderFile} />
            <progress className="addItem__progress" max="100" value={progress}></progress>
          </p>
        </div>
        <div className="addItem__item">
          <p className="addItem__label">Price</p>
          <input className="addItem__input" type="text" name="price" onChange={inputHolder} value={userInfo.price} />
        </div>
        <div className="addItem__item">
          <p className="addItem__label">Sale</p>
          <div className="addItem__input-sale">
            <label>
              No <input type="radio" name="sale" value={false} defaultChecked={true} onClick={inputHolder} />
            </label>
            <label>
              Yes <input type="radio" name="sale" value={true} onClick={inputHolder} />
            </label>
            <input className="addItem__input" type="text" name="priceNew" placeholder="New price" onChange={inputHolder} value={userInfo.priceNew} />
          </div>
        </div>
        <div className="addItem__item">
          <p className="addItem__label">Rate</p>
          <input className="addItem__input" type="range" name="rate" min="1" max="5" onChange={inputHolder} value={userInfo.rate} />
        </div>
        <div className="addItem__item">
          <p className="addItem__label">Sex</p>
          <div className="addItem__input-radio">
            <label>
              Men <input type="radio" name="sex" value="male" defaultChecked={true} onClick={inputHolder} />
            </label>
            <label>
              Women <input type="radio" name="sex" value="female" onClick={inputHolder} />
            </label>
            <label>
              Kids <input type="radio" name="sex" value="kids" onClick={inputHolder} />
            </label>
          </div>
        </div>
        <button className="btn addItem__submit" onClick={onSubmit}>
          add
        </button>
      </div>
    </>
  );
};

export default AddItem;
