import React from 'react';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';

import { logout } from '../../../store/session';
import styles from './LogoutButton.module.css';

function LogoutButton() {
  const dispatch = useDispatch();
  const history = useHistory();
  const onLogout = async () => {
    await dispatch(logout());
    history.push('/');
  };

  return (
    <button type="button" onClick={onLogout} className={styles.button}>
      Logout
    </button>
  );
}

export default LogoutButton;
