import React from "react";
import "./Navigation.css";

const Navigation = ({ onRouteChange, isSignedIn }) => {
  if (isSignedIn) {
    return (
      <nav className='nav'>
        <p onClick={() => onRouteChange("signout")} className='nav-text'>
          Sign Out
        </p>
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
