import React, { useState } from "react";
import Loading from "../Loading/Loading";
import { isEmailValid, isPasswordValid } from "../Utils/Utils";

const { REACT_APP_API_URL } = process.env;

const Signin = ({ onRouteChange, loadUser }) => {
  const [signInEmail, setSignInEmail] = useState("");
  const [signInPassword, setSignInPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [wrongCredentials, setWrongCredentials] = useState(false);
  const [allInputsAreValid, setAllInputsAreValid] = useState(true);

  const onEmailChange = (event) => {
    setSignInEmail(event.target.value);
  };

  const onPasswordChange = (event) => {
    setSignInPassword(event.target.value);
  };

  const inputsAreValid = () => {
    if (isEmailValid(signInEmail) && isPasswordValid(signInPassword)) {
      return true;
    }
    return false;
  };

  const onSubmitSignIn = () => {
    setAllInputsAreValid(true);
    setWrongCredentials(false);
    if (inputsAreValid()) {
      setIsLoading(true);
      fetch(`${REACT_APP_API_URL}/signin`, {
        method: "post",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: signInEmail,
          password: signInPassword,
        }),
      })
        .then((response) => response.json())
        .then((data) => {
          setIsLoading(false);
          if (data.id) {
            loadUser(data);
            setSignInEmail("");
            setSignInPassword("");
            onRouteChange("home");
          } else {
            setWrongCredentials(true);
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
      onSubmitSignIn();
    }
  };

  return (
    <article className='article'>
      <main className='main'>
        <fieldset id='sign_up' className='field_inputs'>
          <legend className='title'>Sign In</legend>
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
            onClick={onSubmitSignIn}
            className='input-submit'
            type='submit'
            value='Sign in'
          />
        </div>

        {isLoading ? <Loading /> : null}
        {wrongCredentials ? <p>Wrong email and/or password</p> : null}
        {allInputsAreValid ? null : <p>Fill all fields correctly</p>}
      </main>
    </article>
  );
};

export default Signin;
