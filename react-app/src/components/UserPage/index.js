import { useState } from "react";
import { useSelector } from "react-redux";
import { useHistory, useParams } from "react-router-dom";

const UserPage = () => {
  const currentUser = useSelector((state) => state.session.user);
  const { user_id } = useParams();
  const history = useHistory();
  const [firstname, setFirstname] = useState(currentUser?.firstname);
  const [lastname, setLastname] = useState(currentUser?.lastname);
  const [username, setUsername] = useState(currentUser?.username);
  const [email, setEmail] = useState(currentUser?.email);
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const changeFirstname = (e) => setFirstname(e.target.value);
  const changeLastname = (e) => setLastname(e.target.value);
  const changeUsername = (e) => setUsername(e.target.value);
  const changeEmail = (e) => setEmail(e.target.value);
  const changePassword = (e) => setPassword(e.target.value);
  const changeConfirmPassword = (e) => setConfirmPassword(e.target.value);

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(
      firstname,
      lastname,
      username,
      email,
      password,
      confirmPassword
    );
  };

  if (currentUser.id !== +user_id) history.push("/errors");

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <div>
          <input
            id="firstname"
            type="text"
            placeholder="First Name"
            value={firstname}
            onChange={changeFirstname}
          ></input>
        </div>
        <div>
          <input
            id="lastname"
            type="text"
            placeholder="Last Name"
            value={lastname}
            onChange={changeLastname}
          ></input>
        </div>
        <div>
          <input
            id="username"
            type="text"
            placeholder="Username"
            value={username}
            onChange={changeUsername}
          ></input>
        </div>
        <div>
          <input
            id="email"
            type="text"
            placeholder="Email"
            value={email}
            onChange={changeEmail}
          ></input>
        </div>
        <div>
          <input
            type="password"
            placeholder="Password"
            onChange={changePassword}
            value={password}
          ></input>
        </div>
        <div>
          <input
            type="password"
            placeholder="Confirm Password"
            onChange={changeConfirmPassword}
            value={confirmPassword}
          ></input>
        </div>
        <button type="submit">Edit {currentUser.username}</button>
      </form>
    </div>
  );
};

export default UserPage;
