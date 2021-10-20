import { useSelector } from "react-redux";
import { NavLink } from "react-router-dom";

import styles from "./MealTracker.module.css";

const MealTracker = ({ pet_id }) => {
  const pets = useSelector((state) => state.pets);
  let currentPet;
  if (Object.values(pets)) {
    currentPet = pets[pet_id];
  }

  // const edit

  if (!currentPet) return "loading";
  else {
    return (
      <div className={styles.meal_tracker}>
        <div className={styles.util_bar}>
          <NavLink to={`/edit_pet/${pet_id}`}>Edit your Pet</NavLink>
        </div>
        <div className={styles.entries}>placeholder for each food entry</div>
      </div>
    );
  }
};

export default MealTracker;
