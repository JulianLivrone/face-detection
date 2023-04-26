import React from "react";
import "./FaceDetection.css";

const FaceDetection = ({ imageUrl, box }) => {
  return (
    <div className='container'>
      <div className='div_bounding-box'>
        <img
          id='inputImage'
          src={imageUrl}
          alt=''
          width='500px'
          height='auto'
        />
        <div
          className='bounding-box'
          style={{
            top: box.topRow,
            right: box.rightCol,
            bottom: box.bottomRow,
            left: box.leftCol,
          }}
        ></div>
      </div>
    </div>
  );
};

export default FaceDetection;
