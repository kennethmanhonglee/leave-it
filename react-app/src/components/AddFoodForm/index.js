import { NavLink } from "react-router-dom";

import styles from "./AddFoodForm.module.css";

const AddFoodForm = () => {
  return (
    <div className={styles.container}>
      <div className={styles.header_bar}>
        <div className={styles.header_div}>
          <h3>
            Choose one of the available foods to add to the tracker, or create
            your own:
          </h3>
        </div>
        <div className={styles.add_button_div}>
          <button className={styles.button}>Create a Food</button>
        </div>
      </div>
      <div className={styles.food_entries}>
        <div className={styles.food_entry}>Food item</div>
        <div className={styles.food_entry}>Food item</div>
        <div className={styles.food_entry}>Food item</div>
        <div className={styles.food_entry}>Food item</div>
        <div className={styles.food_entry}>Food item</div>
      </div>
    </div>
  );
};

export default AddFoodForm;
