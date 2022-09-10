import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
// import Modal from "react-modal";

import { load_food_thunk } from "../../store/food";
import { load_meals_thunk } from "../../store/meal";
import MealEntry from "../MealEntry";
import WeightForm from "../WeightForm";
import styles from "./MealTracker.module.css";
// import AddFoodForm from "../AddFoodForm";

const MealTracker = ({ pet_id }) => {
  const pets = useSelector((state) => state.pets);
  const dispatch = useDispatch();
  const history = useHistory();

  // const [addFoodModalOpen, setAddFoodModalOpen] = useState(false);

  const allMeals = useSelector((state) => state.meals);
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
    currentPetMeals.length !== 0
      ? currentPetMeals.reduce(
          (sum, meal) => (sum += foods[meal.food_id]?.calories),
          0
        )
      : "0";

  useEffect(() => {
    dispatch(load_food_thunk());
    dispatch(load_meals_thunk());
  }, [dispatch]);

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
              Budget: {goal_calories - current_calories}cal
            </span>
          </div>
        </div>
      </div>
    );
  }
};

export default MealTracker;
