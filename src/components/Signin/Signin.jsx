import React, { useState } from "react";
import Loading from "../Loading/Loading";
const { REACT_APP_API_URL } = process.env;

const Signin = ({ onRouteChange, loadUser }) => {
  const [signInEmail, setSignInEmail] = useState("");
  const [signInPassword, setSignInPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [wrongCredentials, setWrongCredentials] = useState(false);

  const onEmailChange = (event) => {
    setSignInEmail(event.target.value);
  };
  const onPasswordChange = (event) => {
    setSignInPassword(event.target.value);
  };

  const onSubmitSignIn = () => {
    setIsLoading(true);
    setWrongCredentials(false);
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
          onRouteChange("home");
        } else {
          setWrongCredentials(true);
          throw new Error(data);
        }
      })
      .catch((err) => console.log(err));
  };

  return (
    <article className='br3 bab--black-10 mv4 w-100 w-50-m w-25-l mw6 shadow-1 center'>
      <main className='pa4 black-80'>
        <div className='measure'>
          <fieldset id='sign_up' className='ba b--transparent ph0 mh0'>
            <legend className='f1 fw6 ph0 mh0'>Sign In</legend>
            <div className='mt3'>
              <label className='db fw6 lh-copy f6' htmlFor='email-address'>
                Email
              </label>
              <input
                onChange={onEmailChange}
                className='pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100 b--black'
                type='email'
                name='email-address'
                id='email-address'
              />
            </div>
            <div className='mv3'>
              <label className='db fw6 lh-copy f6' htmlFor='password'>
                Password
              </label>
              <input
                onChange={onPasswordChange}
                className='b pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100 b--black'
                type='password'
                name='password'
                id='password'
              />
            </div>
          </fieldset>
          <div className=''>
            <input
              onClick={onSubmitSignIn}
              className='b ph3 pv2 input-reset ba b--black bg-transparent grow pointer f6 dib'
              type='submit'
              value='Sign in'
            />
          </div>
        </div>
        {isLoading ? <Loading /> : null}
        {wrongCredentials ? <p>Wrong credentials</p> : null}
      </main>
    </article>
  );
};

export default Signin;
