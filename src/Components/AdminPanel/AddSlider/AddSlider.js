import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import MenuItem from "@material-ui/core/MenuItem";
import Select from "@material-ui/core/Select";
import FormControl from "@material-ui/core/FormControl";
import InputLabel from "@material-ui/core/InputLabel";
import CircularProgress from "@material-ui/core/CircularProgress";
import TextField from "@material-ui/core/TextField";

import Slider from "react-slick";

import { setErrorState, setSliderArray } from "../../../Redux/Slice";
import { storage } from "../../../config";

import { nameFolderForSliderImages } from "../../../Addons/vars";
import { randomString } from "../../../Addons/func";

import { postSliderArray } from "../../../operations";

import "./AddSlider.css";
// import "~slick-carousel/slick/slick.css";
// import "~slick-carousel/slick/slick-theme.css";
const settings = {
  dots: true,
  infinite: true,
  speed: 500,
  slidesToShow: 1,
  slidesToScroll: 1,
  autoplay: true,
  focusOnSelect: true,
  pauseOnHover: false,
  arrows: false,
};

const AddSlider = () => {
  const { items, slider } = useSelector((state) => state.data);

  const initialState = {
    image: "",
    id: items[0].id,
    text1: "",
    text2: "",
  };
  const [itemInfo, setItemInfo] = useState(initialState);
  const [progress, setProgress] = useState(0);

  const dispatch = useDispatch();

  const inputHolder = ({ target }) => {
    setItemInfo({ ...itemInfo, [target.name]: target.value });
  };

  const inputHolderFile = async ({ target }) => {
    if (!target.files.length) return;

    await setItemInfo({ ...itemInfo, image: [] });

    const uploadTask = storage
      .ref()
      .child(`${nameFolderForSliderImages}/${randomString(5)}_${target.files[0].name}`)
      .put(target.files[0]);
    await uploadTask.on(
      "state_changed",
      (snapshot) => setProgress((snapshot.bytesTransferred / snapshot.totalBytes) * 100),
      (error) => dispatch(setErrorState(error)),
      () => {
        uploadTask.snapshot.ref.getDownloadURL().then((downloadURL) => {
          setItemInfo({ ...itemInfo, image: downloadURL });
        });
      }
    );
  };
  const onSubmit = () => {
    const newArray = [...slider, { ...itemInfo }];
    dispatch(postSliderArray(newArray));
    dispatch(setSliderArray(newArray));
    setItemInfo(initialState);
  };
  const onDelete = (id) => {
    const newArray = slider.filter((item) => item.id !== id);
    dispatch(postSliderArray(newArray));
    dispatch(setSliderArray(newArray));
  };
  const onEdit = (item) => {
    setItemInfo(item);
    onDelete(item.id);
  };
  return (
    <div className="addSlider">
      <div className="form__item">
        <p className="form__label">Choose Product</p>
        <FormControl variant="outlined">
          <InputLabel id="demo-simple-select-outlined-label">Category</InputLabel>
          <Select labelId="demo-simple-select-outlined-label" id="demo-simple-select-outlined" name="id" value={itemInfo.id} onChange={inputHolder} label="Choose Product">
            {items.map((item) => (
              <MenuItem key={item.id} value={item.id}>
                <img className="addSlider__select-img" src={item.images[item.imageBasic]} alt={item.title} width="50" height="50" />
                {item.title} ({item.category})
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </div>
      <div className="form__item">
        <p className="form__label">Poster</p>
        <div className="form__item-poster">
          <input type="file" name="file" multiple="multiple" accept="image/png,image/jpeg" onChange={inputHolderFile} />
          <CircularProgress variant="static" value={progress} />
          {/* <progress className="form__progress" max="100" value={progress}></progress> */}
        </div>
      </div>
      <div className="form__item">
        <p className="form__label">Text1</p>
        <TextField label="Text1" name="text1" variant="outlined" value={itemInfo.text1} onChange={inputHolder} />
      </div>
      <div className="form__item">
        <p className="form__label">Text2</p>
        <TextField label="Text2" name="text2" variant="outlined" value={itemInfo.text2} onChange={inputHolder} />
      </div>
      <button className="btn addItem__submit" onClick={onSubmit}>
        add
      </button>

      <Slider {...settings} className="addSliders">
        {slider.map((item) => (
          <div className="slider" key={"addSlider" + item.id}>
            <div className="slider__text">
              <p className="slider__text-first">{item.text1}</p>
              <p className="slider__text-second">{item.text2}</p>
            </div>
            <img src={item.image} alt="slider" width="100%" height="100%" />
            <button className="addSlider__delete" onClick={() => onDelete(item.id)}>
              DELETE
            </button>
            <button className="addSlider__delete" onClick={() => onEdit(item)}>
              EDIT
            </button>
          </div>
        ))}
      </Slider>
    </div>
  );
};

export default AddSlider;
