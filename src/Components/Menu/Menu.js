import React from "react";

import "./Menu.css";

const Menu = () => {
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
              <a href="/" className="nav-menu__item">
                home
              </a>
            </li>
            <li className="nav-menu__list">
              <a href="/" className="nav-menu__item">
                shop
              </a>
            </li>
            <li className="nav-menu__list">
              <a href="/" className="nav-menu__item">
                blog
              </a>
            </li>
            <li className="nav-menu__list">
              <a href="/" className="nav-menu__item">
                about us
              </a>
            </li>
            <li className="nav-menu__list">
              <a href="/" className="nav-menu__item">
                contact us
              </a>
            </li>
            <li className="nav-menu__list">
              <a href="/" className="nav-menu__item">
                <i className="icons icon--user"> </i>
              </a>
            </li>
            <li className="nav-menu__list">
              <a href="/" className="nav-menu__item">
                <i className="icons icon--search"> </i>
              </a>
            </li>
            <li className="nav-menu__list">
              <a href="/" className="nav-menu__item">
                <i className="icons icon--basker"></i>
              </a>
            </li>
          </ul>
        </div>
      </nav>
    </div>
  );
};

export default Menu;
