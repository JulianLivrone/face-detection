import React from "react";

import "./ImageLinkForm.css";

const ImageLinkForms = ({ onInputChange, onButtonSubmit }) => {
  const onKeyDown = (event) => {
    if (event.key === "Enter") {
      onButtonSubmit();
    }
  };

  return (
    <div className='container-image'>
      <div className='container-description-input'>
        <div className='form'>
          <input
            className='input-img'
            type='text'
            onChange={onInputChange}
            onKeyDown={onKeyDown}
          />
          <button className='button' onClick={onButtonSubmit}>
            Detect
          </button>
        </div>
      </div>
    </div>
  );
};

export default ImageLinkForms;
