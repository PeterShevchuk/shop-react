import React from "react";

import "./Icons.css";
const Icons = {
  Close: ({ scale = 24 }) => {
    return (
      <svg className="svg-Close" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32" width={scale} height={scale}>
        <path d="M16 0c-8.836 0-16 7.164-16 16s7.164 16 16 16c8.835 0 16-7.165 16-16s-7.165-16-16-16zM24.866 21.437l-3.428 3.428-5.438-5.437-5.437 5.437-3.428-3.428 5.437-5.437-5.437-5.437 3.428-3.428 5.437 5.437 5.437-5.437 3.428 3.428-5.437 5.437 5.438 5.437z"></path>
      </svg>
    );
  },
};

export default Icons;
