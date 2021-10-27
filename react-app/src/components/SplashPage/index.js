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
        <Link className={styles.link} to="/sign-up">
          <div className={styles.signup_button}>Sign Up</div>
        </Link>
      </div>
      <div className={styles.bio}>
        <div className={styles.bio_div}>
          <a
            href="https://www.linkedin.com/in/kenneth-lee-75b870158/"
            target="_blank"
          >
            <i className="fab fa-linkedin"></i>
          </a>
        </div>
        <div className={styles.bio_div}>
          <a href="https://github.com/kennethmanhonglee" target="_blank">
            <i className="fab fa-github-square"></i>
          </a>
        </div>
      </div>
    </div>
  );
};

export default SplashPage;
