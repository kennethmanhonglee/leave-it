import React from 'react';
import { useSelector } from 'react-redux';
import { NavLink, useLocation } from 'react-router-dom';

import LogoutButton from './LogoutButton';
import styles from './Navbar.module.css';

function NavBar() {
  const currentUser = useSelector((state) => state.session.user);

  // below block is to allow different navbar styling on splash page and other pages
  const { pathname } = useLocation();
  const navbarBackground = pathname === '/' ? null : {
    backgroundColor: 'rgb(255, 140, 29)',
    borderBottom: '1px solid rgba(0,0,0,0.2)',
  };
  return (
    <nav className={styles.nav} style={navbarBackground}>
      <ul>
        <div className={styles.home_links}>
          <li>
            <NavLink to="/home" exact activeClassName="active">
              Home
            </NavLink>
          </li>
          <li>
            <NavLink to="/about" exact activeClassName="active">
              About
            </NavLink>
          </li>
        </div>
        {!currentUser && (
          <div className={styles.login_buttons}>
            <li>
              <NavLink to="/login" exact activeClassName="active">
                Login
              </NavLink>
            </li>
          </div>
        )}
        {currentUser && (
          <div className={styles.logged_in_buttons}>
            <li>
              <NavLink to="/add_a_pet" exact>
                Add a pet
              </NavLink>
            </li>
            <li>
              <LogoutButton />
            </li>
          </div>
        )}
      </ul>
    </nav>
  );
}

export default NavBar;
