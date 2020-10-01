import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import { useDispatch } from "react-redux";

import { navigation } from "../../Addons/vars";
import { userSingUp } from "../../operations";
import { setErrorState } from "../../Redux/Slice";
import { storage } from "../../config";

import { nameFolderForUserPoster } from "../../Addons/vars";

import "./Registration.css";
const Registration = () => {
  const initialState = { email: "", password: "", name: "", phoneNumber: "", photoUrl: "" };

  const [progress, setProgress] = useState();
  const [userInfo, setUserInfo] = useState(initialState);

  const dispatch = useDispatch();

  const inputHolder = ({ target }) => {
    setUserInfo({ ...userInfo, [target.name]: target.value });
  };
  const onSubmit = (e) => {
    e.preventDefault();
    dispatch(userSingUp(userInfo));
  };

  const inputHolderFile = (e) => {
    if (!e.target.files[0]) {
      return;
    }
    const link = nameFolderForUserPoster + "/" + Date.now() + e.target.files[0].name;
    let uploadTask = storage.ref().child(link).put(e.target.files[0], { contentType: e.target.files[0].type });
    uploadTask.on(
      "state_changed",
      (snapshot) => setProgress((snapshot.bytesTransferred / snapshot.totalBytes) * 100),
      (error) => dispatch(setErrorState(error)),
      () => {
        uploadTask.snapshot.ref.getDownloadURL().then((downloadURL) => setUserInfo({ ...userInfo, photoUrl: downloadURL }));
      }
    );
  };

  return (
    <div className="registration">
      <h1 className="registration__title">Registration</h1>
      <form className="registration__form" onSubmit={onSubmit}>
        <input className="registration__input" type="text" name="name" placeholder="Name" onChange={inputHolder} value={userInfo.name} />
        <input className="registration__input" type="text" name="phoneNumber" placeholder="Phone" onChange={inputHolder} value={userInfo.phoneNumber} />
        <div className="registration__input-poster">
          <p className="registration__input-poster-title">Photo</p>
          <input type="file" name="file" multiple="multiple" accept="image/png,image/jpeg" onChange={inputHolderFile} />
          <progress max="100" value={progress}></progress>
        </div>
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
