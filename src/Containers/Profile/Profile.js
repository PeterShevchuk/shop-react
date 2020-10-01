import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
import { navigation } from "../../Addons/vars";
import { dateParse } from "../../Addons/func";

import { userSingOut } from "../../operations";

import "./Profile.css";
const Profile = () => {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.session);
  return (
    <div className="container profile">
      <div className="profile__photo">
        <img src={user.photoUrl} width="300" height="300" alt={user.name} />
      </div>
      <div className="profile__info">
        <h1>{user.name}</h1>
        <p>ID: {user.uid}</p>
        <p>Date registered: {dateParse(user.date)}</p>
        {user.phoneNumber && <p>Phone: {user.phoneNumber}</p>}

        <NavLink to={navigation.prof + "/" + user.uid}>
          <button className="btn userInfo__loginOut" onClick={() => dispatch(userSingOut())}>
            login Out
          </button>
        </NavLink>
      </div>
    </div>
  );
};

export default Profile;
