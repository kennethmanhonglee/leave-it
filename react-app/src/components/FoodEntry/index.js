import { useDispatch } from "react-redux";
import { useParams, useHistory } from "react-router-dom";

import styles from "./FoodEntry.module.css";
import { create_meal_thunk } from "../../store/meal";

const FoodEntry = ({ food }) => {
  const dispatch = useDispatch();
  const { pet_id } = useParams();
  const history = useHistory();
  const addFood = async () => {
    //   call thunk to create a meal
    const newMeal = {
      food_id: food.id,
      pet_id,
    };
    await dispatch(create_meal_thunk(newMeal));
    history.goBack();
  };
  return (
    <div className={styles.food_entry}>
      <div className={styles.food_info}>
        <h2>{food.food_name}</h2>
        <h2>{food.food_type}</h2>
        <h2>{food.calories} CALORIES!</h2>
        <h2>{food.serving_size} g</h2>
      </div>
      <div className={styles.add_button_div}>
        {/* placeholder, will likely use a fontawesome icon later */}
        <button onClick={addFood} className={styles.button}>
          Add
        </button>
      </div>
    </div>
  );
};

export default FoodEntry;
