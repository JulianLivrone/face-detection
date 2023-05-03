import React, { useState } from "react";
import "./Profile.css";

const { REACT_APP_API_URL } = process.env;

const Profile = ({ isProfileOpen, toggleModal, user, loadUser }) => {
  const [name, setName] = useState(user.name);
  const [age, setAge] = useState(user.age);
  const [pet, setPet] = useState(user.pet);

  const onFormChange = (event) => {
    switch (event.target.name) {
      case "user-name":
        setName(event.target.value);
        break;
      case "user-age":
        setAge(event.target.value);
        break;
      case "user-pet":
        setPet(event.target.value);
        break;
      default:
        return;
    }
  };

  const onProfileUpdate = (data) => {
    fetch(`${REACT_APP_API_URL}/profile/${user.id}`, {
      method: "post",
      headers: {
        "Content-Type": "application/json",
        Authorization: window.sessionStorage.getItem("token"),
      },
      body: JSON.stringify({ formInput: data }),
    })
      .then((response) => {
        if (response.status === 200 || response.status === 304) {
          toggleModal();
          loadUser({ ...user, ...data });
        }
      })
      .catch(console.log);
  };

  return (
    <div className='profile-modal'>
      <article className='article'>
        <main className='main'>
          <img
            src='https://i0.wp.com/post.medicalnewstoday.com/wp-content/uploads/sites/3/2020/03/GettyImages-1092658864_hero-1024x575.jpg?w=1155&h=1528'
            className='h3 w3 dib'
            alt='avatar'
          />
          <h1>{name}</h1>
          <h4>{`Images Submitted: ${user.entries}`}</h4>
          <p>{`Member since: ${new Date(user.joined).toLocaleDateString()}`}</p>
          <hr />
          <div className='div_input-text'>
            <label className='label' htmlFor='user-name'>
              Name:
            </label>
            <input
              onChange={onFormChange}
              className='input-text'
              type='text'
              name='user-name'
              id='user-name'
              placeholder={user.name}
            />
            <label className='label' htmlFor='user-age'>
              Age:
            </label>
            <input
              onChange={onFormChange}
              className='input-text'
              type='text'
              name='user-age'
              id='user-age'
              placeholder={user.age}
            />
            <label className='label' htmlFor='user-pet'>
              Pet:
            </label>
            <input
              onChange={onFormChange}
              className='input-text'
              type='text'
              name='user-pet'
              id='user-pet'
              placeholder={user.pet}
            />
          </div>
          <div className='div_input-text'></div>
          <div
            className='mt4'
            style={{ display: "flex", justifyContent: "space-evenly" }}
          >
            <button
              onClick={() => onProfileUpdate({ name, age, pet })}
              className='b pa2 grow pointer hover-white w-40 bg-light-blue b--black-20'
            >
              Save
            </button>
            <button
              className='b pa2 grow pointer hover-white w-40 bg-light-red b--black-20'
              onClick={toggleModal}
            >
              Cancel
            </button>
          </div>
        </main>
      </article>
    </div>
  );
};

export default Profile;
