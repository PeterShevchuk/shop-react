import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams, NavLink } from "react-router-dom";
import { dateParse } from "../../Addons/func";
import { navigation } from "../../Addons/vars";

import { dbUsers, userSingOut } from "../../operations";
import NotFound from "../NotFound/NotFound";
import { setLoader } from "../../Redux/Slice";
import "./ProfileID.css";
const ProfileID = () => {
  const [userInfo, setUserInfo] = useState(false);
  const { user, token } = useSelector((state) => state.session);
  const userSearchId = useParams().id;
  const dispatch = useDispatch();
  useEffect(() => {
    async function fetchData() {
      await dispatch(setLoader(true));
      const response = await dbUsers.doc(userSearchId).get();
      if (response.data()) {
        const { name, uid, photoUrl, date } = response.data();
        setUserInfo({ name, uid, photoUrl, date });
      }
      await dispatch(setLoader(false));
    }

    fetchData();
  }, [userSearchId, dispatch]);
  return (
    <>
      {userInfo ? (
        <div className="container profile">
          <div className="profile__photo">
            <img src={userInfo.photoUrl} width="300" height="300" alt={userInfo.name} />
          </div>
          <div className="profile__info">
            <h1>
              {userInfo.name} {token && userSearchId === userInfo.uid && <span>(You)</span>}
            </h1>
            <p>ID: {userInfo.uid}</p>
            <p>Date registered: {dateParse(userInfo.date)}</p>
            {token && userSearchId === user.uid && (
              <NavLink to={navigation.prof + "/" + user.uid}>
                <button className="btn userInfo__loginOut" onClick={() => dispatch(userSingOut())}>
                  login Out
                </button>
              </NavLink>
            )}
          </div>
        </div>
      ) : (
        <NotFound />
      )}
    </>
  );
};

export default ProfileID;
