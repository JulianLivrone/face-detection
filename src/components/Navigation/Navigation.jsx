import React from "react";
import ProfileIcon from "../Profile/ProfileIcon";

import "./Navigation.css";

const Navigation = ({ onRouteChange, isSignedIn, toggleModal }) => {
  if (isSignedIn) {
    return (
      <nav className='nav'>
        <ProfileIcon onRouteChange={onRouteChange} toggleModal={toggleModal} />
      </nav>
    );
  } else {
    return (
      <nav className='nav'>
        <p onClick={() => onRouteChange("signin")} className='nav-text'>
          Sign In
        </p>
        <p onClick={() => onRouteChange("register")} className='nav-text'>
          Register
        </p>
      </nav>
    );
  }
};

export default Navigation;
