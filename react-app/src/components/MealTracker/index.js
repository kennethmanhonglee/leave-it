import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";

import { load_food_thunk } from "../../store/food";
import { delete_pet_thunk } from "../../store/pet";
import MealEntry from "../MealEntry";
import WeightForm from "../WeightForm";
import styles from "./MealTracker.module.css";

const MealTracker = ({ pet_id }) => {
  const pets = useSelector((state) => state.pets);
  const dispatch = useDispatch();
  const history = useHistory();

  const allMeals = useSelector((state) => state.meals);
  console.log(allMeals);
  let currentPet;
  if (Object.values(pets).length > 0) {
    currentPet = pets[pet_id];
  }
  let goal_calories = Math.floor(currentPet?.goal_calories);
  let current_calories;
  let currentPetMeals;

  currentPetMeals = Object.values(allMeals).filter(
    (meal) => meal.pet_id === +pet_id
  );
  const foods = useSelector((state) => state.foods);
  current_calories =
    currentPetMeals.length != 0
      ? currentPetMeals.reduce(
          (sum, meal) => (sum += foods[meal.food_id]?.calories),
          0
        )
      : "0";

  useEffect(() => {
    dispatch(load_food_thunk());
  }, [dispatch]);

  const delete_pet = async () => {
    const result = await dispatch(delete_pet_thunk(pet_id));
    if (result) return history.push("/home");
  };

  const addFood = () => {
    // later change to modal
    // redirect to add food, but need to keep track of for which pet as well
    // route params
    history.push(`/pets/${pet_id}/add_food`);
  };

  if (!currentPet || !foods || !allMeals) return "loading...";
  else {
    return (
      <div className={styles.meal_tracker}>
        <div className={styles.util_bar}>
          <div className={styles.food_div}>
            <div className={styles.add_button_div}>
              <button onClick={addFood}>Add a meal</button>
            </div>
          </div>
          <div className={styles.pet_name_div}>
            <div className={styles.pet_name}>
              {currentPet && currentPet.name}
            </div>
          </div>
          <div className={styles.util_div}>
            <div className={styles.editing_div}>
              <button onClick={() => history.push(`/edit_pet/${pet_id}`)}>
                Edit
              </button>
            </div>
            <div className={styles.deleting_div}>
              {/* show modal later on */}
              <button onClick={delete_pet}>Delete</button>
            </div>
          </div>
        </div>
        {/* map through and show all meals created by this user, and later all that are used by this user */}
        <div className={styles.entries}>
          {currentPetMeals &&
            currentPetMeals.map((meal) => (
              <MealEntry key={meal.id} meal={meal} />
            ))}
        </div>
        <div className={styles.weight_logging}>
          <WeightForm pet_id={currentPet.id} />
        </div>
        <div className={styles.goals}>
          <div className={styles.goal}>Goal: {goal_calories}cal</div>
          <div className={styles.actual}>
            Actual: {current_calories}
            cal
          </div>
          <div className={styles.budget}>
            <span
              className={
                goal_calories - current_calories > 0 ? styles.green : styles.red
              }
            >
              Budget: {goal_calories - current_calories}
            </span>
          </div>
        </div>
      </div>
    );
  }
};

export default MealTracker;
