import { useSelector } from "react-redux";
import { useHistory } from "react-router-dom";

import styles from "./PetCard.module.css";

const PetCard = ({ pet_id }) => {
  const history = useHistory();
  const pets = useSelector((state) => state.pets);
  let currentPet;
  if (Object.values(pets).length > 0) {
    currentPet = pets[+pet_id];
  }

  const redirectToPetPage = () => {
    history.push(`/pets/${pet_id}`);
  };

  return (
    <div className={styles.pet_card} onClick={redirectToPetPage}>
      <div className={styles.pet_image_div}>
        <div className={styles.pet_image}></div>
      </div>
      <div className={styles.pet_info}>
        <div className={styles.name_div}>
          <p className={styles.name}>{currentPet.name}</p>
        </div>
        <div className={styles.goal}>
          <p>Goal: {currentPet.goal}</p>
        </div>
        <div className={styles.weight}>
          <p>{currentPet.current_weight}kg</p>
        </div>
      </div>
    </div>
  );
};

export default PetCard;
