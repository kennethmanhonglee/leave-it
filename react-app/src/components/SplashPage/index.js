import { Link } from "react-router-dom";

import styles from "./SplashPage.module.css";

const SplashPage = () => {
  return (
    <div className={styles.splash_page}>
      <div className={styles.slogan_container}>
        <div className={styles.slogan}>
          <h1>Weight loss for dogs</h1>
          <h4>Track the foods your dog loves</h4>
        </div>
        <Link className={styles.link} to="/sign-up" exact>
          <div className={styles.signup_button}>Sign Up</div>
        </Link>
      </div>
      <div className={styles.bio}>this is bio and stuff</div>
    </div>
  );
};

export default SplashPage;
