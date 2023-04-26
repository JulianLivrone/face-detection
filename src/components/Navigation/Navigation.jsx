import React from "react";
import "./Navigation.css";

const Navigation = ({ onRouteChange, isSignedIn }) => {
  if (isSignedIn) {
    return (
      <nav className='nav'>
        <p
          onClick={() => onRouteChange("signout")}
          className='f3 link dim black underline pa3 pointer'
        >
          Sign Out
        </p>
      </nav>
    );
  } else {
    return (
      <div>
        <nav style={{ display: "flex", justifyContent: "flex-end" }}>
          <p onClick={() => onRouteChange("signin")} className='nav-text'>
            Sign In
          </p>
          <p onClick={() => onRouteChange("register")} className='nav-text'>
            Register
          </p>
        </nav>
      </div>
    );
  }
};

export default Navigation;
