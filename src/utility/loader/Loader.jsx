import React from "react";
import LoaderCss from "./loader.module.css";

const Loader = () => {
  return (
    <div className={LoaderCss.loaderContainer}>
      <div className={LoaderCss.spinner}></div>
    </div>
  );
};

export default Loader;
