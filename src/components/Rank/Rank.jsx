import React from "react";
import Loading from "../Loading/Loading";

import "./Rank.css";

const Rank = ({ userName, userEntries, isLoading }) => {
  return (
    <div>
      <p className='app-description'>
        This app will detect faces in any image you submit, just paste the URL
        of the image and click the "Detect" button
      </p>
      <div className='rank'>{`${userName}, your current entry count is...`}</div>
      <div className='spinner'>{isLoading ? <Loading /> : userEntries}</div>
    </div>
  );
};

export default Rank;
