import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Redirect } from 'react-router-dom';

import styles from './SignupForm.module.css';
import { signUp, login } from '../../store/session';
import logo from '../../assets/images/logo_figma.png';

function SignUpForm() {
  const [errors, setErrors] = useState([]);
  const [username, setUsername] = useState('');
  const [firstname, setFirstname] = useState('');
  const [lastname, setLastname] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [repeatPassword, setRepeatPassword] = useState('');
  const user = useSelector((state) => state.session.user);
  const dispatch = useDispatch();

  const onSignUp = async (e) => {
    e.preventDefault();
    if (password === repeatPassword) {
      const data = await dispatch(signUp(username, firstname, lastname, email, password));
      if (data) {
        setErrors(data);
        setPassword('');
        setRepeatPassword('');
      }
    } else {
      setErrors(['Password and Confirm Password must match.']);
    }
  };

  const updateUsername = (e) => {
    setUsername(e.target.value);
  };
  const updateFirstname = (e) => {
    setFirstname(e.target.value);
  };
  const updateLastname = (e) => {
    setLastname(e.target.value);
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

  const demoUser = async (e) => {
    e.preventDefault();
    await dispatch(login('demo', 'password'));
  };

  if (user) {
    return <Redirect to="/home" />;
  }

  return (
    <div className={styles.container}>
      <div
        className={styles.logo_div}
        style={{
          backgroundImage: `url(${logo})`,
        }}
      />
      <form onSubmit={onSignUp} className={styles.form}>
        <div className={styles.names}>
          <div>
            {
              errors?.firstname
                ? errors.firstname.map((error) => (
                  <div className={styles.errors} key={error}>
                    {error}
                  </div>
                )) : null
            }
            <input
              placeholder="First Name"
              type="text"
              name="firstname"
              onChange={updateFirstname}
              value={firstname}
              className={styles.input}
              required
            />
          </div>
          <div>
            {
              errors?.lastname
                ? errors.lastname.map((error) => (
                  <div className={styles.errors} key={error}>
                    {error}
                  </div>
                )) : null
            }
            <input
              placeholder="Last Name"
              type="text"
              name="lastname"
              onChange={updateLastname}
              value={lastname}
              className={styles.input}
              required
            />
          </div>
        </div>
        <div>
          {
              errors?.username
                ? errors.username.map((error) => (
                  <div className={styles.errors} key={error}>
                    {error}
                  </div>
                )) : null
            }
          <input
            placeholder="Username"
            type="text"
            name="username"
            onChange={updateUsername}
            value={username}
            className={styles.input}
            required
          />
        </div>
        <div>
          {
              errors?.email
                ? errors.email.map((error) => (
                  <div className={styles.errors} key={error}>
                    {error}
                  </div>
                )) : null
            }
          <input
            placeholder="Email"
            type="text"
            name="email"
            onChange={updateEmail}
            value={email}
            className={styles.input}
            required
          />
        </div>
        <div>
          {
              errors?.password
                ? errors.password.map((error) => (
                  <div className={styles.errors} key={error}>
                    {error}
                  </div>
                )) : null
            }
          <input
            placeholder="Password"
            type="password"
            name="password"
            onChange={updatePassword}
            value={password}
            className={styles.input}
            required
          />
        </div>
        <div>
          <input
            placeholder="Confirm Password"
            type="password"
            name="repeat_password"
            onChange={updateRepeatPassword}
            value={repeatPassword}
            required
            className={styles.input}
          />
        </div>
        <div className={styles.button_div}>
          <button type="button" className={styles.button} onClick={demoUser}>
            Demo
          </button>
          <button className={styles.button} type="submit">
            Sign Up
          </button>
        </div>
      </form>
    </div>
  );
}

export default SignUpForm;
