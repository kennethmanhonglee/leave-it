import { useSelector } from "react-redux";
import { useParams } from "react-router";

import MealTracker from "../MealTracker";
import styles from "./PetPage.module.css";
import default_dog from "../../assets/images/default_dog.png";

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
      <div className={styles.pet_info}>
        <div
          className={styles.pet_image}
          style={{
            backgroundImage: `url(${
              current_pet.image_url ? current_pet.image_url : default_dog
            })`,
          }}
        ></div>
        <div className={styles.header}>
          <h1 className={styles.pet_name}>{current_pet.name}</h1>
          <h2 className={styles.stats}>
            Goal: <span>{current_pet.goal} </span>
          </h2>
          <h2 className={styles.stats}>
            Current Weight:{" "}
            <span>
              {current_pet.current_weight}
              {current_pet.unit}{" "}
            </span>
          </h2>
          <h2 className={styles.stats}>
            Ideal Weight:{" "}
            <span>
              {current_pet.ideal_weight}
              {current_pet.unit}{" "}
            </span>
          </h2>
        </div>
      </div>
      <MealTracker pet_id={pet_id} />
    </div>
  );
};

export default PetPage;
