import { useDispatch, useSelector } from "react-redux";
import { delete_meal_thunk } from "../../store/meal";

import styles from "./MealEntry.module.css";

const MealEntry = ({ meal }) => {
  const dispatch = useDispatch();
  const foods = useSelector((state) => state.foods);
  let currentFood;
  if (foods) {
    currentFood = foods[meal.food_id];
  }

  const deleteMeal = async () => {
    const error = await dispatch(delete_meal_thunk(meal.id));
    if (error) {
      //pop up modal later to show something went wrong
      alert("Not able to delete meal.");
    }
  };

  if (!currentFood) return null;
  return (
    <div className={styles.container}>
      <div>{currentFood.food_type}</div>
      <div>{currentFood.food_name}</div>
      <div>{currentFood.serving_size} g</div>
      <div>{currentFood.calories} calories</div>
      <div className={styles.button_div}>
        <button onClick={deleteMeal} className={styles.button}>
          delete
        </button>
      </div>
    </div>
  );
};

export default MealEntry;
