import React from "react";
import Loading from "../Loading/Loading";

const Rank = ({ userName, userEntries, isLoading }) => {
  return (
    <div>
      <div
        style={{ color: "white", fontSize: "1.75em" }}
      >{`${userName}, your current entry count is...`}</div>
      <div style={{ color: "white", fontSize: "3em" }}>
        {isLoading ? <Loading /> : userEntries}
      </div>
    </div>
  );
};

export default Rank;
