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
        <li>
          <NavLink to="/" exact={true} activeClassName="active">
            Home
          </NavLink>
        </li>
        {!currentUser && (
          <>
            <li>
              <NavLink to="/login" exact={true} activeClassName="active">
                Login
              </NavLink>
            </li>
            <li>
              <NavLink to="/sign-up" exact={true} activeClassName="active">
                Sign Up
              </NavLink>
            </li>
          </>
        )}
        {currentUser && (
          <>
            <li>
              <NavLink to="/add_a_pet" exact>
                Add a pet
              </NavLink>
            </li>
            <li>
              <LogoutButton />
            </li>
          </>
        )}
      </ul>
    </nav>
  );
};

export default NavBar;
