import { Link } from "react-router-dom";

import styles from "./SplashPage.module.css";
import logo from "../../assets/images/leaveit.png";

const SplashPage = () => {
  return (
    <div className={styles.splash_page}>
      <div className={styles.top_container}>
        <div
          style={{
            backgroundImage: `url(${logo})`,
          }}
          className={styles.logo}
        ></div>
        <div className={styles.bio_and_link}>
          <div className={styles.slogan_container}>
            <div className={styles.slogan}>
              <h1>
                Leaveit! <br></br>The Calorie Tracker for Dogs
              </h1>
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
                rel="noreferrer"
              >
                <i className="fab fa-linkedin"></i>
              </a>
            </div>
            <div className={styles.bio_div}>
              <a
                href="https://github.com/kennethmanhonglee"
                target="_blank"
                rel="noreferrer"
              >
                <i className="fab fa-github-square"></i>
              </a>
            </div>
          </div>
        </div>
      </div>
      <div className={styles.bottom_container}>
        <div className={styles.three_features}>
          <h1>Keep your pets healthy</h1>
          <div className={styles.features_container}>
            <div className={styles.feature_card}>
              <h2>Multiple Pets</h2>
              <div>🐶</div>
              <p>Keep track of many pets under one user</p>
            </div>
            <div className={styles.feature_card}>
              <h2>Track Your Food</h2>
              <div>🍱</div>
              <p>Know about the foods your dogs are eating</p>
            </div>
            <div className={styles.feature_card}>
              <h2>Stay Healthy</h2>
              <div>💪</div>
              <p>
                Keep track of the weight of your pets, and see their progress
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SplashPage;
