import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Link, useParams } from "react-router-dom";
import Rating from "@material-ui/lab/Rating";

import { dateParse, fixedPrice } from "../../../Addons/func";
import { navigation } from "../../../Addons/vars";
import AddButton from "../../Cart/AddButton/AddButton";
import { sex } from "../../../Addons/cat";

import "./ItemsDetails.css";
import EditItem from "../EditItem/EditItem";
const ItemsDetails = () => {
  const { user, token } = useSelector((state) => state.session);
  const { items } = useSelector((state) => state.data);
  const [itemInfo, setItemInfo] = useState({ images: [""] });
  const [basicImage, setBasicImage] = useState(itemInfo && itemInfo.images ? itemInfo.images[itemInfo.imageBasic] : null);
  const [modalEdit, setModalEdit] = useState(false);
  const itemDetailsID = useParams().id;
  const viewImage = ({ target }) => {
    if (itemInfo.images.length <= 0 || target.src === basicImage) {
      return;
    }
    document.querySelector(".itemDetails__image--active").classList.remove("itemDetails__image--active");
    target.parentNode.classList.add("itemDetails__image--active");
    setBasicImage(target.src);
  };

  useEffect(() => {
    const fetchData = async () => {
      const foundObj = items.find((item) => item.id === itemDetailsID);
      setItemInfo(foundObj);
      setBasicImage(foundObj.images[foundObj.imageBasic]);
    };
    fetchData();
  }, [itemDetailsID, items]);
  return (
    <div className="container itemDetails">
      {itemInfo && (
        <>
          <div className="itemDetails__left">
            <img src={basicImage} alt={itemInfo.title} width="320" className="itemDetails__image-basic" />
            <ul className="itemDetails__listImages">
              {itemInfo.images.map((item) => (
                <li key={item} className={`itemDetails__image${itemInfo.images.indexOf(item) === itemInfo.imageBasic ? " itemDetails__image--active" : ""}`}>
                  <img src={item} alt={itemInfo.title} onClick={viewImage} />
                </li>
              ))}
            </ul>
          </div>
          <div className="itemDetails__right">
            <h1>{itemInfo.title}</h1>
            <Rating name="read-only" value={Number(itemInfo.rate)} readOnly />
            <p>Categry: {itemInfo.category}</p>
            <p className="itemDetails__right-season">Season: {itemInfo.season && itemInfo.season.map((item) => <span key={item}>{item}</span>)}</p>
            <p>Sex: {sex[itemInfo.sex]}</p>
            <p>Price: ${fixedPrice(itemInfo.price)}</p>
            {itemInfo.priceNew && <p>New price: ${itemInfo.priceNew}</p>}
            <p>Date add: {dateParse(itemInfo.date)}</p>
            <p>
              User add: <Link to={navigation.prof + "/" + itemInfo.authorUid}>{itemInfo.authorName}</Link>
            </p>
            <AddButton id={itemDetailsID} />
            {token && user.admin && (
              <>
                <br />
                <button className="btn" onClick={() => setModalEdit(true)}>
                  Edit
                </button>
                <EditItem open={modalEdit} close={setModalEdit} array={itemInfo} />
              </>
            )}
          </div>
        </>
      )}
    </div>
  );
};

export default ItemsDetails;
