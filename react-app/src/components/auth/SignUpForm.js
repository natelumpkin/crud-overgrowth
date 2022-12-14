import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux'
import { Redirect, Link } from 'react-router-dom';
import { signUp } from '../../store/session';

const SignUpForm = () => {
  // const [errors, setErrors] = useState([]);
  const [usernameErrors, setusernameErrors] = useState([])
  const [emailErrors, setEmailErrors] = useState([])
  const [passwordErrors, setPasswordErrors] = useState([])
  const [confirmPasswordErrors, setConfirmPasswordErrors] = useState([])
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [repeatPassword, setRepeatPassword] = useState('');
  const user = useSelector(state => state.session.user);
  const dispatch = useDispatch();

  useEffect(() => {
    const body = window.document.body;
    body.classList.add('grey')
    return () => {
      body.classList.remove('grey')
    }
  },[])

  const onSignUp = async (e) => {
    e.preventDefault();
    if (password === repeatPassword) {
      setConfirmPasswordErrors([])
      const data = await dispatch(signUp(username, email, password));
      if (data) {
        setConfirmPasswordErrors([])
        if (!repeatPassword) {
          setConfirmPasswordErrors(['This field is required.'])
        }
        setEmailErrors([])
        setPasswordErrors([])
        setusernameErrors([])
        data.forEach(error => errorMap(error))
      }
    } else {
      setEmailErrors([])
      setPasswordErrors([])
      setConfirmPasswordErrors([])
      setusernameErrors([])
      if (!email) setEmailErrors(['This field is required.'])
      if (!password) setPasswordErrors(['This field is required.'])
      if (!username) setusernameErrors(['This field is required'])
      let errors = [];
      errors.push('Passwords do not match')
      if (!repeatPassword) errors.push('This field is required')
      setConfirmPasswordErrors(errors)
    }
  };

  const updateUsername = (e) => {
    setUsername(e.target.value);
  };

  const updateEmail = (e) => {
    setEmail(e.target.value);
  };

  const updatePassword = (e) => {
    setPassword(e.target.value);
  };

  const updateRepeatPassword = (e) => {
    setRepeatPassword(e.target.value);
  };

  const errorMap = (errorItem) => {

    let errorArr = errorItem.split(":")

    if (errorArr[0] === 'username ') {
      setusernameErrors([errorArr[1]])
    }
    if (errorArr[0] === "email ") {

      setEmailErrors([errorArr[1]])
    }
    if (errorArr[0] === "password ") {

      setPasswordErrors([errorArr[1]])
    }

  }

  if (user) {
    return <Redirect to='/questions' />;
  }

  return (
    <div className='login-container'>
    <form id="login-form" className='signup-form' onSubmit={onSignUp}>
      <div id="login-div-top" className='login-div'>
        <label>Display Name</label>
        <input
          type='text'
          name='username'
          onChange={updateUsername}
          value={username}
          maxLength={40}
        ></input>
      </div>
      <div className='list-errors-parent auth-errors'>
          {usernameErrors.map((error, ind) => (
            <div className='list-errors' key={ind}>{error}</div>
          ))}
        </div>
      <div className='login-div'>
        <label>Email</label>
        <input
          type='text'
          name='email'
          onChange={updateEmail}
          value={email}
          maxLength={255}
        ></input>
      </div>
      <div className='list-errors-parent auth-errors'>
          {emailErrors.map((error, ind) => (
            <div className='list-errors' key={ind}>{error}</div>
          ))}
        </div>
      <div className='login-div'>
        <label>Password</label>
        <input
          type='password'
          name='password'
          onChange={updatePassword}
          value={password}
          maxLength={60}
        ></input>
      </div>
      <div className='list-errors-parent auth-errors'>
          {passwordErrors.map((error, ind) => (
            <div className='list-errors' key={ind}>{error}</div>
          ))}
        </div>
      <div className='login-div'>
        <label>Confirm Password</label>
        <input
          type='password'
          name='repeat_password'
          onChange={updateRepeatPassword}
          value={repeatPassword}
          maxLength={60}
        ></input>
      </div>
      <div className='list-errors-parent auth-errors'>
          {confirmPasswordErrors.map((error, ind) => (
            <div className='list-errors' key={ind}>{error}</div>
          ))}
        </div>
      <button className='signup' type='submit'>Sign Up</button>
    </form>
    <div className='auth-otherlinks-container'>
      <p>Already have an account? <Link className='auth-otherlinks' to="/login">Log in</Link></p>
    </div>
    </div>
  );
};

export default SignUpForm;
