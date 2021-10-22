import { useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import styles from "./AddFoodForm.module.css";
import { useEffect } from "react";
import { load_food_thunk } from "../../store/food";

const AddFoodForm = () => {
  const history = useHistory();
  const dispatch = useDispatch();
  let currentUserFoods = useSelector((state) => state.foods);
  const createFood = () => {
    return history.push("/create_food");
  };
  useEffect(() => {
    dispatch(load_food_thunk());
  }, []);

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
            <div key={food.id} className={styles.food_entry}>
              <h2>{food.food_name}</h2>
              <h2>{food.food_type}</h2>
              <h2>{food.calories} CALORIES!</h2>
              <h2>{food.serving_size} g</h2>
            </div>
          ))}
      </div>
    </div>
  );
};

export default AddFoodForm;
