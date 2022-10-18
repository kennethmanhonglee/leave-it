import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Redirect } from 'react-router-dom';

import styles from './LoginForm.module.css';
import { login } from '../../store/session';
import logo from '../../assets/images/logo_figma.png';

function LoginForm() {
  const [errors, setErrors] = useState({});
  const [loginParam, setLoginParam] = useState('');
  const [password, setPassword] = useState('');
  const user = useSelector((state) => state.session.user);
  const dispatch = useDispatch();

  const onLogin = async (e) => {
    e.preventDefault();
    const data = await dispatch(login(loginParam, password));
    if (data) {
      setErrors(data);
    }
  };

  const demoUser = async () => {
    await dispatch(login('demo', 'password'));
  };

  const updateLoginParam = (e) => {
    setLoginParam(e.target.value);
  };

  const updatePassword = (e) => {
    setPassword(e.target.value);
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
      <form onSubmit={onLogin} className={styles.form}>
        <div>
          {
            errors
              ? errors?.loginParam?.map((error) => (
                <div className={styles.errors} key={error}>
                  {error}
                </div>
              )) : null
          }
          <input
            name="loginParam"
            type="text"
            placeholder="Username/Email"
            value={loginParam}
            onChange={updateLoginParam}
            className={styles.input}
            required
          />
        </div>
        <div>
          {
            errors
              ? errors?.password?.map((error) => (
                <div className={styles.errors} key={error}>
                  {error}
                </div>
              )) : null
          }
          <input
            name="password"
            type="password"
            placeholder="Password"
            value={password}
            onChange={updatePassword}
            className={styles.input}
            required
          />
        </div>
        <div className={styles.button_div}>
          <button type="button" className={styles.button} onClick={demoUser}>
            Demo
          </button>
          <button className={styles.button} type="submit">
            Login
          </button>
        </div>
      </form>
    </div>
  );
}

export default LoginForm;
