import { useSelector } from "react-redux";
import { useParams } from "react-router";
import MealTracker from "../MealTracker";
import styles from "./PetPage.module.css";

const PetPage = () => {
  const { pet_id } = useParams();
  const pets = useSelector((state) => state.pets);
  let current_pet;
  if (Object.values(pets).length > 0) {
    current_pet = pets[+pet_id];
  }
  if (!current_pet) return null;
  return (
    <div className={styles.pet_page}>
      <div className={styles.pet_image}></div>
      <div className={styles.header}>
        <h1>{current_pet.name}</h1>
      </div>
      <MealTracker pet_id={pet_id} />
    </div>
  );
};

export default PetPage;
