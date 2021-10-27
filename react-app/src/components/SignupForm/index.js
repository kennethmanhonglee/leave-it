import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Redirect } from "react-router-dom";

import styles from "./SignupForm.module.css";
import { signUp, login } from "../../store/session";

const SignUpForm = () => {
  const [errors, setErrors] = useState([]);
  const [username, setUsername] = useState("");
  const [firstname, setFirstname] = useState("");
  const [lastname, setLastname] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [repeatPassword, setRepeatPassword] = useState("");
  const user = useSelector((state) => state.session.user);
  const dispatch = useDispatch();

  const onSignUp = async (e) => {
    e.preventDefault();
    if (password === repeatPassword) {
      const data = await dispatch(
        signUp(username, firstname, lastname, email, password)
      );
      if (data) {
        setErrors(data);
      }
    } else {
      setErrors(["Password and Confirm Password must match."]);
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
    await dispatch(login("demo", "password"));
  };

  if (user) {
    return <Redirect to="/home" />;
  }

  return (
    <div className={styles.container}>
      <div className={styles.logo_div}></div>
      <form onSubmit={onSignUp} className={styles.form}>
        {errors.map((error, ind) => (
          <div className={styles.errors} key={ind}>
            {error}
          </div>
        ))}
        <div className={styles.names}>
          <div>
            <input
              placeholder="First Name"
              type="text"
              name="firstname"
              onChange={updateFirstname}
              value={firstname}
              className={styles.input}
              required
            ></input>
          </div>
          <div>
            <input
              placeholder="Last Name"
              type="text"
              name="lastname"
              onChange={updateLastname}
              value={lastname}
              className={styles.input}
              required
            ></input>
          </div>
        </div>
        <div>
          <input
            placeholder="Username"
            type="text"
            name="username"
            onChange={updateUsername}
            value={username}
            className={styles.input}
            required
          ></input>
        </div>
        <div>
          <input
            placeholder="Email"
            type="text"
            name="email"
            onChange={updateEmail}
            value={email}
            className={styles.input}
            required
          ></input>
        </div>
        <div>
          <input
            placeholder="Password"
            type="password"
            name="password"
            onChange={updatePassword}
            value={password}
            className={styles.input}
            required
          ></input>
        </div>
        <div>
          <input
            placeholder="Confirm Password"
            type="password"
            name="repeat_password"
            onChange={updateRepeatPassword}
            value={repeatPassword}
            required={true}
            className={styles.input}
          ></input>
        </div>
        <div className={styles.button_div}>
          <div className={styles.button} onClick={demoUser}>
            Demo
          </div>
          <button className={styles.button} type="submit">
            Sign Up
          </button>
        </div>
      </form>
    </div>
  );
};

export default SignUpForm;
