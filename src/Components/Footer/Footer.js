import React from "react";

import masterCard from "../../img/footer/Mastercard.png";
import paypal from "../../img/footer/Paypal.png";
import visa from "../../img/footer/Visa.png";
import "./Footer.css";
const Footer = () => {
  return (
    <footer className="footer">
      <div className="container">
        <ul className="footer__info">
          <li className="footer__list">
            <div className="logo">Fashion Shop</div>
            <div className="footer__pay">
              <img className="footer__pay-img" src={masterCard} alt="" />
              <img className="footer__pay-img" src={paypal} alt="" />
              <img className="footer__pay-img" src={visa} alt="" />
            </div>
          </li>
          <li className="footer__list">
            <h3 className="footer__list-title">Customer Service</h3>
            <a href="/" className="footer__link">
              About Us
            </a>
            <a href="/" className="footer__link">
              F.A.Q.
            </a>
            <a href="/" className="footer__link">
              My Account
            </a>
            <a href="/" className="footer__link">
              Contact
            </a>
          </li>
          <li className="footer__list">
            <h3 className="footer__list-title">Social</h3>
            <a href="/" className="footer__link">
              Instagram
            </a>
            <a href="/" className="footer__link">
              Twitter
            </a>
            <a href="/" className="footer__link">
              Facebook
            </a>
            <a href="/" className="footer__link">
              Pinterest
            </a>
          </li>
          <li className="footer__list">
            <h3 className="footer__list-title">Contact Us</h3>
            <a href="/" className="footer__link">
              Patricia C. Amedee 4401
            </a>
            <a href="/" className="footer__link">
              +99 (0) 101 0000 888
            </a>
            <a href="/" className="footer__link">
              info@yourdomain.com
            </a>
          </li>
        </ul>
        <div className="footer__copyright">© 2018 ARTBEES All rights reserved.</div>
      </div>
    </footer>
  );
};

export default Footer;
