import { useSelector } from "react-redux";

import styles from "./MealEntry.module.css";

const MealEntry = ({ meal }) => {
  const foods = useSelector((state) => state.foods);
  let currentFood;
  if (foods) {
    currentFood = foods[meal.food_id];
  }
  console.log(currentFood);
  if (!currentFood) return null;
  return (
    <div className={styles.container}>
      <div>{currentFood.food_type}</div>
      <div>{currentFood.food_name}</div>
      <div>{currentFood.serving_size} g</div>
      <div>{currentFood.calories} calories</div>
    </div>
  );
};

export default MealEntry;
