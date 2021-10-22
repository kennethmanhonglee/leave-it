import styles from "./FoodEntry.module.css";

const FoodEntry = ({ food }) => {
  return (
    <>
      <div className={styles.food_info}>
        <h2>{food.food_name}</h2>
        <h2>{food.food_type}</h2>
        <h2>{food.calories} CALORIES!</h2>
        <h2>{food.serving_size} g</h2>
      </div>
      <div className={styles.add_button_div}>
        <button className={styles.button}>Add</button>
      </div>
    </>
  );
};

export default FoodEntry;
