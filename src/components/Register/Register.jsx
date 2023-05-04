import React, { useState } from "react";
import Loading from "../Loading/Loading";
import { isNameValid, isEmailValid, isPasswordValid } from "../Utils/Utils";

const { REACT_APP_API_URL } = process.env;

const Register = ({ onRouteChange, loadUser }) => {
  const [registerName, setRegisterName] = useState("");
  const [registerEmail, setRegisterEmail] = useState("");
  const [registerPassword, setRegisterPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [emailAlreadyInUse, setEmailAlreadyInUse] = useState(false);
  const [allInputsAreValid, setAllInputsAreValid] = useState(true);

  const onNameChange = (event) => {
    setRegisterName(event.target.value);
  };

  const onEmailChange = (event) => {
    setRegisterEmail(event.target.value);
  };

  const onPasswordChange = (event) => {
    setRegisterPassword(event.target.value);
  };

  const inputsAreValid = () => {
    if (
      isNameValid(registerName) &&
      isEmailValid(registerEmail) &&
      isPasswordValid(registerPassword)
    ) {
      return true;
    }
    return false;
  };

  const onSubmitRegister = () => {
    setAllInputsAreValid(true);
    setEmailAlreadyInUse(false);
    if (inputsAreValid()) {
      setIsLoading(true);
      fetch(`${REACT_APP_API_URL}/register`, {
        method: "post",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: registerName,
          email: registerEmail,
          password: registerPassword,
        }),
      })
        .then((response) => response.json())
        .then((data) => {
          setIsLoading(false);
          if (data.id) {
            loadUser(data);
            onRouteChange("home");
          } else {
            setEmailAlreadyInUse(true);
            throw new Error(data);
          }
        })
        .catch((err) => console.log(err));
    } else {
      setAllInputsAreValid(false);
    }
  };

  const onKeyDown = (event) => {
    if (event.key === "Enter") {
      onSubmitRegister();
    }
  };

  return (
    <article className='article'>
      <main className='main'>
        <fieldset id='sign_up' className='field_inputs'>
          <legend className='title'>Register</legend>
          <div className='div_input-text'>
            <label className='label' htmlFor='name-address'>
              Name
            </label>
            <input
              onChange={onNameChange}
              onKeyDown={onKeyDown}
              className='input-text'
              type='text'
              name='name-address'
              id='name-address'
              placeholder='Only letters'
            />
          </div>
          <div className='div_input-text'>
            <label className='label' htmlFor='email-address'>
              Email
            </label>
            <input
              onChange={onEmailChange}
              onKeyDown={onKeyDown}
              className='input-text'
              type='email'
              name='email-address'
              id='email-address'
              placeholder='email@address.com'
            />
          </div>
          <div className='div_input-text'>
            <label className='label' htmlFor='password'>
              Password
            </label>
            <input
              onChange={onPasswordChange}
              onKeyDown={onKeyDown}
              className='input-text'
              type='password'
              name='password'
              id='password'
              placeholder='Minimun 4 characters'
            />
          </div>
        </fieldset>
        <div>
          <input
            onClick={onSubmitRegister}
            className='input-submit'
            type='submit'
            value='Register'
          />
        </div>

        {isLoading ? <Loading /> : null}
        {emailAlreadyInUse ? <p>Email already in use</p> : null}
        {allInputsAreValid ? null : <p>Fill all fields correctly</p>}
      </main>
    </article>
  );
};

export default Register;
