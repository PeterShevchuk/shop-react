import React from "react";

import Menu from "../Menu/Menu";

import "./Header.css";
const Header = () => {
  return (
    <header>
      <div className="contact">
        <div className="container">
          <a href="tel:(0) 101 0000 888" className="contact__tel">
            <i className="icons icon--tel"></i> (0) 73 123 45 67
          </a>
          <a href="mailto:info@yourdomain.com" className="contact__mail">
            <i className="icons icon--email"></i>raf02041994@gmail.com
          </a>
        </div>
      </div>
      <Menu />
    </header>
  );
};

export default Header;
