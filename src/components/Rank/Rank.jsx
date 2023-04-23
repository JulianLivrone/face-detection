import React from "react";
import Loading from "../Loading/Loading";

const Rank = ({ userName, userEntries, isLoading }) => {
  return (
    <div>
      <div className='white f3'>{`${userName}, your current entry count is...`}</div>
      <div className='white f1'>{isLoading ? <Loading /> : userEntries}</div>
    </div>
  );
};

export default Rank;
