import React from "react";
import { useSelector } from "react-redux";
import Avatar from "@material-ui/core/Avatar";

import Menu from "../Menu/Menu";

import "./Header.css";
const Header = () => {
  const session = useSelector((state) => state.session);
  // const dispatch = useDispatch();

  return (
    <header>
      <div className="header">
        <div className="container">
          <div className="contact">
            <a href="tel:(0) 101 0000 888" className="contact__tel">
              <i className="icons icon--tel"></i> (0) 73 123 45 67
            </a>
            <a href="mailto:raf02041994@gmail.com" className="contact__mail">
              <i className="icons icon--email"></i>raf02041994@gmail.com
            </a>
          </div>
          <div className="userInfo">
            {session.token && (
              <>
                <p className="userInfo__name">{session.token && session.user.name ? session.user.name : "No Name"}</p>
                <Avatar alt="Remy Sharp" src={session.user.photoUrl} />
              </>
            )}
          </div>
        </div>
      </div>
      <Menu />
    </header>
  );
};

export default Header;
