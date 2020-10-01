import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Link, useParams } from "react-router-dom";

import { dateParse } from "../../Addons/func";
import { navigation } from "../../Addons/vars";
import AddButton from "../Cart/AddButton/AddButton";

import "./ItemsDetails.css";
const ItemsDetails = () => {
  const [itemInfo, setItemInfo] = useState({});
  const { items } = useSelector((state) => state.data);
  const itemDetailsID = useParams().id;
  useEffect(() => {
    const fetchData = async () => {
      setItemInfo(items.find((item) => item.id === itemDetailsID));
    };
    fetchData();
  }, [itemDetailsID, items]);
  return (
    <div className="container itemDetails">
      {itemInfo && (
        <>
          <div className="itemDetails__left">
            <img src={itemInfo.images} alt={itemInfo.title} width="320" />
          </div>
          <div className="itemDetails__right">
            <h1>{itemInfo.title}</h1>
            <p>Categry: {itemInfo.category}</p>
            <p>Season: {itemInfo.season}</p>
            <p>Sex: {itemInfo.sex}</p>
            <p>Price: ${itemInfo.price}</p>
            {itemInfo.priceNew && <p>New price: ${itemInfo.priceNew}</p>}
            <p>Date add: {dateParse(itemInfo.date)}</p>
            <p>
              User add: <Link to={navigation.prof + "/" + itemInfo.authorUid}>{itemInfo.authorName}</Link>
            </p>
            <AddButton id={itemDetailsID} />
          </div>
        </>
      )}
    </div>
  );
};

export default ItemsDetails;
