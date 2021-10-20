import { useDispatch, useSelector } from "react-redux";
import { NavLink, useHistory } from "react-router-dom";
import { delete_pet_thunk } from "../../store/pet";

import styles from "./MealTracker.module.css";

const MealTracker = ({ pet_id }) => {
  const pets = useSelector((state) => state.pets);
  const dispatch = useDispatch();
  const history = useHistory();
  let currentPet;
  if (Object.values(pets)) {
    currentPet = pets[pet_id];
  }

  const delete_pet = async () => {
    const result = await dispatch(delete_pet_thunk(pet_id));
    if (result) return history.push("/home");
  };

  if (!currentPet) return "loading";
  else {
    return (
      <div className={styles.meal_tracker}>
        <div className={styles.util_bar}>
          <div className={styles.editing_div}>
            <NavLink to={`/edit_pet/${pet_id}`}>Edit {currentPet.name}</NavLink>
          </div>
          <div className={styles.deleting_div}>
            {/* show modal later on */}
            <button onClick={delete_pet}>Delete {currentPet.name}</button>
          </div>
        </div>
        <div className={styles.entries}>placeholder for each food entry</div>
      </div>
    );
  }
};

export default MealTracker;
