import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { dateParse } from "../../Addons/func";

import { dbUsers } from "../../operations";
import { Loader } from "../../Redux/Slice";
import NotFound from "../NotFound/NotFound";
import "./ProfileID.css";
const ProfileID = () => {
  const [userInfo, setUseInfo] = useState(false);
  const { user, token } = useSelector((state) => state.session);
  const userSearchId = useParams().id;
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(Loader(true));
    const fetchData = async () => {
      const response = await dbUsers.doc(userSearchId).get();
      if (response.data()) {
        const { name, uid, photoUrl, date } = response.data();
        setUseInfo({ name, uid, photoUrl, date });
      }
    };

    fetchData();
    dispatch(Loader(false));
  }, [userSearchId, dispatch]);
  return (
    <>
      {userInfo ? (
        <div className="container profile">
          <div className="profile__photo">
            <img src={userInfo.photoUrl} width="300" height="300" alt={userInfo.name} />
          </div>
          <div className="profile__info">
            <p>ID: {userInfo.uid}</p>
            <p>
              Name: {userInfo.name} {token && userSearchId === user.uid && <span>(You)</span>}
            </p>
            <p>Date registered: {dateParse(userInfo.date)}</p>
          </div>
        </div>
      ) : (
        <NotFound />
      )}
    </>
  );
};

export default ProfileID;
