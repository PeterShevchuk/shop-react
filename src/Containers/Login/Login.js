import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import { useDispatch } from "react-redux";

import { navigation } from "../../Addons/vars";
import { userSingIn } from "../../operations";

import "./Login.css";
const Login = () => {
  const initialState = { email: "", password: "" };

  const [userInfo, setUserInfo] = useState(initialState);

  const dispatch = useDispatch();

  const inputHolder = ({ target }) => {
    setUserInfo({ ...userInfo, [target.name]: target.value });
  };
  const onSubmit = (e) => {
    e.preventDefault();
    dispatch(userSingIn(userInfo.email, userInfo.password));
  };

  return (
    <div className="login">
      <h1 className="login__title">Login</h1>
      <form className="login__form" onSubmit={onSubmit}>
        <input className="login__email" type="text" name="email" placeholder="Email" onChange={inputHolder} value={userInfo.email} />
        <input className="login__pass" type="password" name="password" placeholder="Password" onChange={inputHolder} value={userInfo.password} />
        <button className="btn login__submit" type="submit">
          Sing in
        </button>
      </form>
      <p className="login__text-reg">
        If you do not have any account, please <NavLink to={navigation.reg}>registration</NavLink>
      </p>
    </div>
  );
};

export default Login;
