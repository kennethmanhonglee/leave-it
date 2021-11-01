import styles from "./AboutPage.module.css";
import ken from "../../assets/images/linkedin_ken.jpeg";

const AboutPage = () => {
  return (
    <div className={styles.page}>
      <div className={styles.container}>
        <div className={styles.bio}>
          <div className={styles.bio_card}>
            <div
              style={{
                backgroundImage: `url(${ken})`,
              }}
              className={styles.ken}
            ></div>
            <div className={styles.bio_icons}>
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
        <div className={styles.about_us}>
          <h2>About Leaveit!</h2>
          <div className={styles.about}>
            <p>
              Leaveit! is a pet calorie tracker app, inspired by{" "}
              <a className={styles.link} href="https://www.loseit.com/">
                Loseit!
              </a>
              . The calculations for the resting energy requirements and daily
              caloric needs are done based on the{" "}
              <a
                className={styles.link}
                href="https://vet.osu.edu/vmc/companion/our-services/nutrition-support-service/basic-calorie-calculator"
              >
                Basic Calorie Calculator
              </a>{" "}
              by The Ohio State University.
            </p>
            <p>
              According to above link, "Individual pet needs can vary by as much
              as 50% from calculated values." This means that the daily
              calculated calories for pets are to be used as a reference. The
              actual amount should be adjusted up or down as needed to maintain
              a healthy body condition score.
            </p>
            <p>
              This app is developed by Kenneth Lee as a capstone project for App
              Academy.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutPage;
