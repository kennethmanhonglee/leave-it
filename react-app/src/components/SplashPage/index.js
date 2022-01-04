import { Link, useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import styles from "./SplashPage.module.css";
import logo from "../../assets/images/leaveit.png";
import { login } from "../../store/session";

const SplashPage = () => {
  const dispatch = useDispatch();
  const history = useHistory();

  const currentUser = useSelector((state) => state.session.user);
  if (currentUser) history.push("/home");

  const demoUser = async (e) => {
    e.preventDefault();
    await dispatch(login("demo", "password"));
  };

  return (
    <div className={styles.splash_page}>
      <div className={styles.heading}>
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
                <span className={styles.app_name}>Leaveit!</span> <br></br>The
                Calorie Tracker for Dogs
              </h1>
              <h4>Track the foods your dog loves</h4>
            </div>
            <div className={styles.buttons}>
              <Link className={styles.link} to="/sign-up">
                <div className={styles.button}>Sign Up</div>
              </Link>
              <button className={styles.button} onClick={demoUser}>
                Demo
              </button>
            </div>
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
            <p>Keep track of the weight of your pets, and see their progress</p>
          </div>
        </div>
      </div>
      <div className={styles.instructions}>
        <h1>How to use Leaveit!</h1>
        <div className={styles.step}>
          <div>
            <h1>Step 1: Create your pet</h1>
            <p>
              Upload a picture, type in the name of your pet, their current
              weight, and goal weight.
            </p>
          </div>
          <div className={`${styles.picture} ${styles.picture_1}`}></div>
        </div>
        <div className={`${styles.step} ${styles.dark_background}`}>
          <div className={`${styles.picture} ${styles.picture_2}`}></div>
          <div>
            <h1>Step 2: Create food items</h1>
            <p>
              Create your dog's food items in our database, or choose one of our
              pre-built items from the list.
            </p>
          </div>
        </div>
        <div className={styles.step}>
          <div>
            <h1>Step 3: Log food/weights daily</h1>
            <p>
              Track what your dog is eating daily, along with their daily
              weight.
            </p>
          </div>
          <div className={`${styles.picture} ${styles.picture_3}`}></div>
        </div>
      </div>
    </div>
  );
};

export default SplashPage;
