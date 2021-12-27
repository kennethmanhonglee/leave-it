import { useDispatch, useSelector } from "react-redux";
import { useParams, useHistory } from "react-router-dom";

import styles from "./FoodEntry.module.css";
import { create_meal_thunk } from "../../store/meal";
import { delete_food_thunk } from "../../store/food";
import { useState } from "react";

// This component is for food entries in adding food into meals
const FoodEntry = ({ food }) => {
  const dispatch = useDispatch();
  const { pet_id } = useParams();
  const history = useHistory();
  const currentUser = useSelector((state) => state.session.user);
  const [serving_size, setServing_size] = useState(food.serving_size);
  const [error, setError] = useState("");

  const proportion = food.calories / food.serving_size;
  let calories = (proportion * serving_size).toFixed(2);

  const changeServingSize = (e) => setServing_size(e.target.value);

  const addFood = async () => {
    const newMeal = {
      food_id: food.id,
      pet_id,
      serving_size,
      calories,
    };
    await dispatch(create_meal_thunk(newMeal));
    history.goBack();
  };

  const deleteFood = async () => {
    const data = await dispatch(delete_food_thunk(food.id));
    if (data) {
      setError(data);
    }
  };

  return (
    <div className={styles.food_entry}>
      {error && <h2 className={styles.error}>{error}</h2>}
      <div className={styles.food_and_buttons}>
        <div className={styles.food_info}>
          <div>
            <h2>{food.food_name}</h2>
          </div>
          <div>
            <h2>{food.food_type}</h2>
          </div>
          <div>
            {/* should re-render depending on serving_size, calories per serving is proportion * new serving size */}
            <h2>{calories} cal</h2>
          </div>
          <div>
            {/* change to input */}
            <input
              type="number"
              value={serving_size}
              onChange={changeServingSize}
            ></input>
            <h2>g</h2>
          </div>
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
    </div>
  );
};

export default FoodEntry;
