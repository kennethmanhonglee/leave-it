import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
// import Modal from "react-modal";

import { loadFoodThunk } from '../../../store/food';
import { loadMealsThunk } from '../../../store/meal';
import MealEntry from './MealEntry';
import WeightForm from './WeightForm';
import styles from './MealTracker.module.css';
// import AddFoodForm from "../AddFoodForm";

function MealTracker({ petId }) {
  const pets = useSelector((state) => state.pets);
  const dispatch = useDispatch();
  const history = useHistory();

  // const [addFoodModalOpen, setAddFoodModalOpen] = useState(false);

  const allMeals = useSelector((state) => state.meals);
  let currentPet;
  if (Object.values(pets).length > 0) {
    currentPet = pets[petId];
  }
  const goalCalories = Math.floor(currentPet?.goal_calories);
  const currentPetMeals = Object.values(allMeals).filter((meal) => meal.petId === +petId);
  const currentCalories = currentPetMeals.reduce((sum, meal) => sum + meal.calories, 0);

  useEffect(() => {
    dispatch(loadFoodThunk());
    dispatch(loadMealsThunk());
  }, [dispatch]);

  const addFood = () => {
    // later change to modal
    // redirect to add food, but need to keep track of for which pet as well
    // route params
    history.push(`/pets/${petId}/add_food`);
  };

  if (!currentPet || !allMeals) return 'loading...';

  return (
    <div className={styles.meal_tracker}>
      <div className={styles.util_bar}>
        <div className={styles.food_div}>
          <button type="button" className={styles.add_button_div} onClick={addFood}>
            Add a meal
          </button>
        </div>
      </div>
      {/* map through and show all meals created by this user, and later all that are used by this user */}
      <div className={styles.entries}>
        {currentPetMeals && currentPetMeals.map((meal) => <MealEntry key={meal.id} meal={meal} />)}
      </div>
      <div className={styles.weight_logging}>
        <WeightForm petId={currentPet.id} />
      </div>
      <div className={styles.goals}>
        <div className={styles.goal}>
          Goal:
          {goalCalories}
          cal
        </div>
        <div className={styles.actual}>
          Actual:
          {' '}
          {currentCalories}
          cal
        </div>
        <div className={styles.budget}>
          <span className={goalCalories - currentCalories > 0 ? styles.green : styles.red}>
            Budget:
            {' '}
            {goalCalories - currentCalories}
            cal
          </span>
        </div>
      </div>
    </div>
  );
}

export default MealTracker;
