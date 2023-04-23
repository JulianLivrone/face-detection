import React from "react";
import Spinner from "./Spinner.gif";

const Loading = () => {
  return (
    <div>
      <img src={Spinner} alt='Spinner Loader' />
    </div>
  );
};

export default Loading;
