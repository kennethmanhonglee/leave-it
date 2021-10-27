import { useEffect } from "react";
import { useHistory, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import styles from "./AddFoodForm.module.css";
import { load_food_thunk } from "../../store/food";
import FoodEntry from "../FoodEntry";

const AddFoodForm = () => {
  const history = useHistory();
  const dispatch = useDispatch();
  const { pet_id } = useParams();
  let currentUserFoods = useSelector((state) => state.foods);
  let pets = useSelector((state) => state.pets);

  useEffect(() => {
    dispatch(load_food_thunk());
  }, [dispatch]);

  if (pets && !pets[+pet_id]) {
    history.push("/home");
  }

  const createFood = () => {
    // redirect for now, close modal later
    return history.push("/create_food");
  };

  return (
    <div className={styles.form}>
      <div className={styles.container}>
        <div className={styles.header_bar}>
          <div className={styles.header_div}>
            <h3>
              Choose one of the available foods to add to the tracker, or create
              your own:
            </h3>
          </div>
          <div className={styles.create_button_div}>
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
                <FoodEntry food={food} />
              </div>
            ))}
        </div>
      </div>
    </div>
  );
};

export default AddFoodForm;
