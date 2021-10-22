import styles from "./FoodEntry.module.css";

const FoodEntry = ({ food }) => {
  const addFood = async () => {
    //   call thunk to create a meal
    console.log(food.id);
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
