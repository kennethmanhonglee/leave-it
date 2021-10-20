import { NavLink } from "react-router-dom";

import styles from "./SplashPage.module.css";

const SplashPage = () => {
  return (
    <div className={styles.splash_page}>
      <div className={styles.phone_pic}>PHONE PLACEHOLDER</div>
      <div className={styles.slogan}>
        <li>
          <NavLink to="/sign-up" exact={true} activeClassName="active">
            Sign Up
          </NavLink>
        </li>
      </div>
    </div>
  );
};

export default SplashPage;
