import React, { useState } from "react";

import { useDispatch } from "react-redux";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";

import { seasons, category, sex } from "../../../Addons/cat";
import { setErrorState } from "../../../Redux/Slice";
import { storage } from "../../../config";
import { randomString, fixArrayFiles } from "../../../Addons/func";
import { nameFolderForImagesItems } from "../../../Addons/vars";
import Icons from "../../Icons/Icons";

import "./AddEditForm.css";
const AddEditForm = ({ itemInfo, setItemInfo }) => {
  const [progress, setProgress] = useState(0);
  const dispatch = useDispatch();
  const inputHolder = ({ target }) => {
    let value = target.name === "sale" || target.name === "sex" ? Number(target.value) : target.value;
    setItemInfo({ ...itemInfo, [target.name]: value });
  };

  const changeSeason = ({ target }) => {
    let newSeasons = itemInfo.season;
    itemInfo.season.find((i) => i === target.name) ? (newSeasons = newSeasons.filter((i) => i !== target.name)) : newSeasons.push(target.name);
    setItemInfo({ ...itemInfo, season: newSeasons });
  };

  const changeBasicPoster = (index) => {
    document.querySelector(".addItem__item-image--active").classList.remove("addItem__item-image--active");
    setItemInfo({ ...itemInfo, imageBasic: Number(index) });
  };

  const deletePoster = (index) => {
    const newArrayImages = itemInfo.images.filter((item) => itemInfo.images.indexOf(item) !== index);
    const imageBasic = itemInfo.imageBasic === index || newArrayImages.length - 1 >= index ? 0 : itemInfo.imageBasic;
    setItemInfo({ ...itemInfo, images: newArrayImages, imageBasic });
  };

  const inputHolderFile = async ({ target }) => {
    await setItemInfo({ ...itemInfo, images: [] });
    if (!target.files.length) {
      return;
    }
    const folderName = randomString();
    const arrayFilesUrl = [];
    fixArrayFiles(target.files).map(async (item) => {
      const uploadTask = storage
        .ref()
        .child(`${nameFolderForImagesItems}/${folderName}/${randomString(5)}_${item.name}`)
        .put(item);
      await uploadTask.on(
        "state_changed",
        (snapshot) => setProgress((snapshot.bytesTransferred / snapshot.totalBytes) * 100),
        (error) => dispatch(setErrorState(error)),
        () => {
          uploadTask.snapshot.ref.getDownloadURL().then((downloadURL) => {
            arrayFilesUrl.push(downloadURL);
          });
        }
      );
    });
    setItemInfo({ ...itemInfo, folderName, images: arrayFilesUrl });
  };
  return (
    <>
      <div className="form__item">
        <p className="form__label">Title item</p>
        <input className="form__input" type="text" name="title" onChange={inputHolder} value={itemInfo.title} />
      </div>
      <div className="form__item">
        <p className="form__label">Category</p>
        <select className="form__item-select" size="1" name="category" onChange={inputHolder} defaultValue={itemInfo.category}>
          {category.sort().map((item) => (
            <option key={item} value={item}>
              {item}
            </option>
          ))}
        </select>
      </div>
      <div className="form__item">
        <p className="form__label">Season</p>
        <div>
          {seasons.map((item) => (
            <FormControlLabel key={item} control={<Checkbox color="secondary" checked={itemInfo.season && Boolean(itemInfo.season.find((itemS) => itemS === item))} onChange={changeSeason} name={item} />} label={item} />
          ))}
        </div>
      </div>
      <div className="form__item">
        <p className="form__label">Poster</p>
        <div className="form__item-poster">
          <input type="file" name="file" multiple="multiple" accept="image/png,image/jpeg" onChange={inputHolderFile} />
          <progress className="form__progress" max="100" value={progress}></progress>
        </div>
      </div>
      {itemInfo.images.length > 0 && (
        <div className="form__item">
          <p className="form__label">Choose basic poster</p>
          <ul className="form__item-poster-list">
            {itemInfo.images.map((item) => {
              const indexBasicImage = itemInfo.images.indexOf(item);
              const checkActiveClass = `form__item-image${indexBasicImage === itemInfo.imageBasic ? " form__item-image--active" : ""}`;
              return (
                <li key={indexBasicImage} className={checkActiveClass} data-index={indexBasicImage}>
                  <img src={item} alt="" title="Change basic image" onClick={() => changeBasicPoster(indexBasicImage)} />
                  <div className="form__item-image-delete" title="Delete this image" onClick={() => deletePoster(indexBasicImage)}>
                    <Icons.Close />
                  </div>
                </li>
              );
            })}
          </ul>
        </div>
      )}
      <div className="form__item">
        <p className="form__label">Price</p>
        <input className="form__input" type="text" name="price" onChange={inputHolder} value={itemInfo.price} />
      </div>
      <div className="form__item">
        <p className="form__label">Sale</p>
        <div className="form__input-sale">
          <label>
            No <input type="radio" name="sale" value={1} defaultChecked={itemInfo.sale === 1} onClick={inputHolder} />
          </label>
          <label>
            Yes <input type="radio" name="sale" value={2} defaultChecked={itemInfo.sale === 2} onClick={inputHolder} />
          </label>
          <label>
            TOP <input type="radio" name="sale" value={3} defaultChecked={itemInfo.sale === 3} onClick={inputHolder} />
          </label>
          <input className="form__input" type="text" name="priceNew" disabled={itemInfo.sale === 1} placeholder="New price" onChange={inputHolder} value={itemInfo.priceNew} />
        </div>
      </div>
      <div className="form__item">
        <p className="form__label">Rate</p>
        <input className="form__input" type="range" name="rate" min="1" max="5" onChange={inputHolder} value={itemInfo.rate} />
      </div>
      <div className="form__item">
        <p className="form__label">Sex</p>
        <div className="form__input-radio">
          {sex.map((item) => (
            <label key={item}>
              {item} <input type="radio" name="sex" value={sex.indexOf(item)} defaultChecked={itemInfo.sex === sex.indexOf(item)} onClick={inputHolder} />
            </label>
          ))}
        </div>
      </div>
    </>
  );
};

export default AddEditForm;
