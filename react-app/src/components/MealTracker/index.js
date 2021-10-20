import { useSelector } from "react-redux";
import styles from "./MealTracker.module.css";

const MealTracker = ({ pet_id }) => {
  const pets = useSelector((state) => state.pets);
  let currentPet;
  if (Object.values(pets)) {
    currentPet = pets[pet_id];
  }

  if (!currentPet) return "loading";
  else {
    return (
      <div className={styles.meal_tracker}>
        <h1>{currentPet.name}</h1>
        <h1>{currentPet.age}</h1>
        <h1>{currentPet.current_weight}</h1>
        <h1>{currentPet.ideal_weight}</h1>
      </div>
    );
  }
};

export default MealTracker;
