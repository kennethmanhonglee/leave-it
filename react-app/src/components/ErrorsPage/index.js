import React from "react";

import styles from "./ErrorsPage.module.css";
import dog_picture from "../../assets/images/error_dog.png";

export default class ErrorPage extends React.Component {
  render() {
    return (
      <div className={styles.error_page}>
        <div className={styles.container}>
          <div
            className={styles.error_page_dog_picture}
            style={{
              backgroundImage: `url(${dog_picture})`,
            }}
          ></div>
          <p>Error: Page Not Found</p>
        </div>
      </div>
    );
  }
}
