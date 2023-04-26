import React from "react";
import "./ImageLinkForm.css";

const ImageLinkForms = ({ onInputChange, onButtonSubmit }) => {
  return (
    <div className='container-image'>
      <p className='app-description'>
        This Magic Brain will detect faces in your pictures. Give it a try!
      </p>
      <div className='form'>
        <input className='input-img' type='text' onChange={onInputChange} />
        <button className='button' onClick={onButtonSubmit}>
          Detect
        </button>
      </div>
    </div>
  );
};

export default ImageLinkForms;
