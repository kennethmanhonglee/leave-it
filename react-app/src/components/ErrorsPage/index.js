import React from 'react';

import styles from './ErrorsPage.module.css';
import dogPicture from '../../assets/images/error_dog.png';

export default function ErrorPage() {
  return (
    <div className={styles.error_page}>
      <div className={styles.container}>
        <div
          className={styles.error_page_dog_picture}
          style={{
            backgroundImage: `url(${dogPicture})`,
          }}
        />
        <p>Error: Page Not Found</p>
      </div>
    </div>
  );
}
