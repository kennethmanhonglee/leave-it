import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Redirect } from "react-router-dom";

import styles from "./LoginForm.module.css";
import { login } from "../../store/session";

const LoginForm = () => {
  const [errors, setErrors] = useState([]);
  const [login_param, setLogin_param] = useState("");
  const [password, setPassword] = useState("");
  const user = useSelector((state) => state.session.user);
  const dispatch = useDispatch();

  const onLogin = async (e) => {
    e.preventDefault();
    const data = await dispatch(login(login_param, password));
    if (data) {
      setErrors(data);
    }
  };

  const demoUser = async () => {
    await dispatch(login("demo", "password"));
  };

  const updateLoginParam = (e) => {
    setLogin_param(e.target.value);
  };

  const updatePassword = (e) => {
    setPassword(e.target.value);
  };

  if (user) {
    return <Redirect to="/" />;
  }

  return (
    <div className={styles.container}>
      <div className={styles.logo_div}>LOGO DIV!</div>
      <form onSubmit={onLogin} className={styles.form}>
        {errors.map((error, ind) => (
          <div>
            <div key={ind}>{error}</div>
          </div>
        ))}
        <div>
          <input
            name="login_param"
            type="text"
            placeholder="Username/Email"
            value={login_param}
            onChange={updateLoginParam}
            className={styles.input}
          />
        </div>
        <div>
          <input
            name="password"
            type="password"
            placeholder="Password"
            value={password}
            onChange={updatePassword}
            className={styles.input}
          />
        </div>
        <div className={styles.button_div}>
          <button className={styles.button} onClick={demoUser}>
            Demo
          </button>
          <button className={styles.button} type="submit">
            Login
          </button>
        </div>
      </form>
    </div>
  );
};

export default LoginForm;