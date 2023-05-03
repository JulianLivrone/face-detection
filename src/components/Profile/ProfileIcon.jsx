import React, { useState } from "react";
import {
  Dropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
} from "reactstrap";

const ProfileIcon = ({ onRouteChange, toggleModal }) => {
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const toggle = () => setDropdownOpen((prevState) => !prevState);

  return (
    <div className='pa4 tc'>
      <Dropdown isOpen={dropdownOpen} toggle={toggle}>
        <DropdownToggle data-toggle='dropdown' tag='span'>
          <img
            src='https://i0.wp.com/post.medicalnewstoday.com/wp-content/uploads/sites/3/2020/03/GettyImages-1092658864_hero-1024x575.jpg?w=1155&h=1528'
            className='br-100 ba h3 w3 dib'
            alt='avatar'
          />
        </DropdownToggle>
        <DropdownMenu
          end
          className='b--transparent shadow-5'
          style={{
            marginTop: "20px",
            backgroundColor: "rgba(255, 255, 255, 0.5)",
          }}
        >
          <DropdownItem onClick={toggleModal}>View Profile</DropdownItem>
          <DropdownItem onClick={() => onRouteChange("signout")}>
            Sign Out
          </DropdownItem>
        </DropdownMenu>
      </Dropdown>
    </div>
  );
};

export default ProfileIcon;
