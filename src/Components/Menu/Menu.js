import React from "react";
import { useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
import { navigation } from "../../Addons/vars";
import Icons from "../Icons/Icons";

import "./Menu.css";

const Menu = () => {
  const { token, user, cart } = useSelector((state) => state.session);
  return (
    <div className="container">
      <nav className="nav">
        <div className="logo">Fashion Shop</div>
        <div id="menuToggle">
          <input type="checkbox" />
          <span></span>
          <span></span>
          <span></span>
          <ul className="nav-menu" id="menu">
            <li className="nav-menu__list">
              <NavLink to={navigation.home} exact className="nav-menu__item">
                home
              </NavLink>
            </li>
            <li className="nav-menu__list">
              <NavLink to={navigation.shop} exact className="nav-menu__item">
                shop
              </NavLink>
            </li>
            <li className="nav-menu__list">
              <NavLink to={navigation.sale} exact className="nav-menu__item">
                Sale
              </NavLink>
            </li>
            <li className="nav-menu__list">
              <NavLink to={navigation.featured} exact className="nav-menu__item">
                featured
              </NavLink>
            </li>
            {/* <li className="nav-menu__list">
              <NavLink to={navigation.addItem} className="nav-menu__item">
                blog
              </NavLink>
            </li> */}
            {token && user.admin && (
              <li className="nav-menu__list">
                <NavLink to={navigation.addItem} className="nav-menu__item">
                  ADD
                </NavLink>
              </li>
            )}
            <li className="nav-menu__list">
              <NavLink to={navigation.contact} className="nav-menu__item">
                contact us
              </NavLink>
            </li>
            <li className="nav-menu__list">
              <NavLink to={token ? navigation.prof : navigation.login} className="nav-menu__item">
                <Icons.Profile />
              </NavLink>
            </li>
            <li className="nav-menu__list">
              <NavLink to={navigation.search} className="nav-menu__item">
                <Icons.Search />
              </NavLink>
            </li>
            <li className="nav-menu__list">
              <NavLink to={navigation.cart} className="nav-menu__item cart">
                {cart.length > 0 && <div className="nav-menu__cart-count">{cart.length}</div>}
                <Icons.Cart />
              </NavLink>
            </li>
          </ul>
        </div>
      </nav>
    </div>
  );
};

export default Menu;
