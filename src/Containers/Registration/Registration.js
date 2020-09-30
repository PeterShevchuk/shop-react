import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import { useDispatch } from "react-redux";

import { navigation } from "../../Addons/vars";
import { userSingUp } from "../../operations";

import "./Registration.css";
const Registration = () => {
  const initialState = { email: "", password: "", name: "", phoneNumber: "", photoUrl: "" };

  const [userInfo, setUserInfo] = useState(initialState);

  const dispatch = useDispatch();

  const inputHolder = ({ target }) => {
    setUserInfo({ ...userInfo, [target.name]: target.value });
  };
  const onSubmit = (e) => {
    e.preventDefault();
    dispatch(userSingUp(userInfo));
  };

  return (
    <div className="registration">
      <h1 className="registration__title">Registration</h1>
      <form className="registration__form" onSubmit={onSubmit}>
        <input className="registration__input" type="text" name="name" placeholder="Name" onChange={inputHolder} value={userInfo.name} />
        <input className="registration__input" type="text" name="phoneNumber" placeholder="Phone" onChange={inputHolder} value={userInfo.phoneNumber} />
        <input className="registration__input" type="text" name="photoUrl" placeholder="Photo url" onChange={inputHolder} value={userInfo.photoUrl} />
        <input className="registration__input" type="text" name="email" placeholder="Email" onChange={inputHolder} value={userInfo.email} />
        <input className="registration__input" type="password" name="password" placeholder="Password" onChange={inputHolder} value={userInfo.password} />
        <button className="btn registration__submit" type="submit">
          Sing up
        </button>
      </form>
      <p className="registration__text-login">
        If you already have an account please <NavLink to={navigation.login}>login</NavLink>
      </p>
    </div>
  );
};

export default Registration;
