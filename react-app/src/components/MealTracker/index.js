import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";

import { load_food_thunk } from "../../store/food";
import { delete_pet_thunk } from "../../store/pet";
import styles from "./MealTracker.module.css";

const MealTracker = ({ pet_id }) => {
  const pets = useSelector((state) => state.pets);
  const dispatch = useDispatch();
  const history = useHistory();

  const allMeals = useSelector((state) => state.meals);
  let currentPetMeals;
  if (Object.values(allMeals).length > 0) {
    currentPetMeals = Object.values(allMeals).filter(
      (meal) => meal.pet_id === +pet_id
    );
  }
  console.log(currentPetMeals);
  useEffect(() => {
    dispatch(load_food_thunk());
  }, [dispatch, currentPetMeals]);

  let currentPet;
  if (Object.values(pets).length > 0) {
    currentPet = pets[pet_id];
  }

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

  if (!currentPet) return "loading";
  else {
    return (
      <div className={styles.meal_tracker}>
        <div className={styles.util_bar}>
          <div className={styles.food_div}>
            <div className={styles.add_button_div}>
              <button onClick={addFood}>Add a meal</button>
            </div>
          </div>
          <div className={styles.util_div}>
            <div className={styles.editing_div}>
              <button onClick={() => history.push(`/edit_pet/${pet_id}`)}>
                Edit {currentPet.name}
              </button>
            </div>
            <div className={styles.deleting_div}>
              {/* show modal later on */}
              <button onClick={delete_pet}>Delete {currentPet.name}</button>
            </div>
          </div>
        </div>
        {/* map through and show all meals created by this user, and later all that are used by this user */}
        <div className={styles.entries}>
          <h1>meeeh</h1>
          {currentPetMeals && currentPetMeals.map((meal) => <h1>hello</h1>)}
        </div>
      </div>
    );
  }
};

export default MealTracker;
