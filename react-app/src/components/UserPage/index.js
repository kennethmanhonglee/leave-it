import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { useHistory, useParams } from 'react-router-dom';

function UserPage() {
  const currentUser = useSelector((state) => state.session.user);
  const { userId } = useParams();
  const history = useHistory();
  const [firstname, setFirstname] = useState(currentUser?.firstname);
  const [lastname, setLastname] = useState(currentUser?.lastname);
  const [username, setUsername] = useState(currentUser?.username);
  const [email, setEmail] = useState(currentUser?.email);
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const changeFirstname = (e) => setFirstname(e.target.value);
  const changeLastname = (e) => setLastname(e.target.value);
  const changeUsername = (e) => setUsername(e.target.value);
  const changeEmail = (e) => setEmail(e.target.value);
  const changePassword = (e) => setPassword(e.target.value);
  const changeConfirmPassword = (e) => setConfirmPassword(e.target.value);

  // const checkPassword = () => {};

  const handleSubmit = (e) => {
    e.preventDefault();
    // TODO: handle create user functionalities
  };

  if (currentUser.id !== +userId) history.push('/errors');

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <div>
          <input id="firstname" type="text" placeholder="First Name" value={firstname} onChange={changeFirstname} />
        </div>
        <div>
          <input id="lastname" type="text" placeholder="Last Name" value={lastname} onChange={changeLastname} />
        </div>
        <div>
          <input id="username" type="text" placeholder="Username" value={username} onChange={changeUsername} />
        </div>
        <div>
          <input id="email" type="text" placeholder="Email" value={email} onChange={changeEmail} />
        </div>
        <div>
          <input type="password" placeholder="Password" onChange={changePassword} value={password} />
        </div>
        <div>
          <input
            type="password"
            placeholder="Confirm Password"
            onChange={changeConfirmPassword}
            value={confirmPassword}
          />
        </div>
        <button type="submit">
          Edit
          {currentUser.username}
        </button>
      </form>
    </div>
  );
}

export default UserPage;
