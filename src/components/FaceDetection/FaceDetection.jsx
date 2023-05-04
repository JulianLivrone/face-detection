import React from "react";

import "./FaceDetection.css";

const FaceDetection = ({ imageUrl, boxes }) => {
  return (
    <div className='container'>
      <div className='div_bounding-boxes'>
        <img
          id='inputImage'
          src={imageUrl}
          alt=''
          width='650px'
          height='auto'
        />
        {boxes.map((box, i) => {
          return (
            <div
              key={i}
              className='bounding-boxes'
              style={{
                top: box.topRow,
                right: box.rightCol,
                bottom: box.bottomRow,
                left: box.leftCol,
              }}
            ></div>
          );
        })}
      </div>
    </div>
  );
};

export default FaceDetection;
