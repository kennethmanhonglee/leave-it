import React from "react";
import { useSelector } from "react-redux";
import { NavLink } from "react-router-dom";

import LogoutButton from "../LogoutButton";
import styles from "./Navbar.module.css";

const NavBar = () => {
  const currentUser = useSelector((state) => state.session.user);
  return (
    <nav className={styles.nav}>
      <ul>
        <div className={styles.home_links}>
          <li>
            <NavLink to="/home" exact={true} activeClassName="active">
              Home
            </NavLink>
          </li>
          <li>
            <NavLink to="/about" exact={true} activeClassName="active">
              About
            </NavLink>
          </li>
        </div>
        {!currentUser && (
          <div className={styles.login_buttons}>
            <li>
              <NavLink to="/login" exact={true} activeClassName="active">
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
};

export default NavBar;
