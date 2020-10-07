import React from "react";
import { useSelector } from "react-redux";
import LoaderSpiner from "react-loader-spinner";

import "./Loader.css";
const Loader = () => {
  const { loader } = useSelector((state) => state.global);
  return (
    <>
      {loader && (
        <div className="loader">
          <LoaderSpiner type="Puff" color="#ffffff" height={300} width={300} />
        </div>
      )}
    </>
  );
};

export default Loader;
