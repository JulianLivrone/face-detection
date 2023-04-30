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
      <div
        style={{ color: "white", fontSize: "1.75em", paddingTop: "1em" }}
      >{`${userName}, your current entry count is...`}</div>
      <div style={{ color: "white", fontSize: "3em", paddingBottom: ".25em" }}>
        {isLoading ? <Loading /> : userEntries}
      </div>
    </div>
  );
};

export default Rank;
