import { useDispatch, useSelector } from "react-redux";
import { useParams, useHistory } from "react-router-dom";

import styles from "./FoodEntry.module.css";
import { create_meal_thunk } from "../../store/meal";
import { delete_food_thunk, load_food_thunk } from "../../store/food";
import { useEffect } from "react";

// This component is for food entries in adding food into meals
const FoodEntry = ({ food }) => {
  const dispatch = useDispatch();
  const { pet_id } = useParams();
  const history = useHistory();
  const currentUser = useSelector((state) => state.session.user);

  const addFood = async () => {
    const newMeal = {
      food_id: food.id,
      pet_id,
    };
    await dispatch(create_meal_thunk(newMeal));
    history.goBack();
  };

  const deleteFood = async () => {
    await dispatch(delete_food_thunk(food.id));
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
        {currentUser && food.user_id === currentUser.id && (
          <>
            <button
              className={styles.button}
              onClick={() => history.push(`/edit_food/${food.id}`)}
            >
              Edit
            </button>
            <button className={styles.button} onClick={deleteFood}>
              Delete
            </button>
          </>
        )}
        <button onClick={addFood} className={styles.button}>
          Add
        </button>
      </div>
    </div>
  );
};

export default FoodEntry;
