import React, { useEffect } from "react";
import { useSelector } from "react-redux";

const Modal = ({}) => {
  const { modal } = useSelector((state) => state.global);
  return <>{modal && <div>yes</div>}</>;
};

export default Modal;
