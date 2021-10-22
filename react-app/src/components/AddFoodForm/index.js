import { useHistory } from "react-router-dom";
import { useSelector } from "react-redux";

import styles from "./AddFoodForm.module.css";
import { useEffect } from "react";

const AddFoodForm = () => {
  const history = useHistory();
  const createFood = () => {
    return history.push("/create_food");
  };

  const currentUser = useSelector((state) => state.session.user);
  const currentUserFoods = currentUser?.created_foods;

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
          <button onClick={createFood} className={styles.button}>
            Create a Food
          </button>
        </div>
      </div>
      <div className={styles.food_entries}>
        {currentUserFoods &&
          Object.values(currentUserFoods).map((food) => (
            // make component to go from name to all info
            <div className={styles.food_entry}>
              <h2>{food.food_name}</h2>
            </div>
          ))}
      </div>
    </div>
  );
};

export default AddFoodForm;
