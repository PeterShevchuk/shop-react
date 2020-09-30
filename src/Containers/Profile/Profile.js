import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
import { navigation } from "../../Addons/vars";

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
        <p>ID: {user.uid}</p>
        <p>Name: {user.name}</p>
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
