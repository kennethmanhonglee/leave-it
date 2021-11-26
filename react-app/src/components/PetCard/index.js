import { useSelector } from "react-redux";
import { useHistory } from "react-router-dom";

import styles from "./PetCard.module.css";
import default_pic from "../../assets/images/default_dog.png";

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
  if (!currentPet) return null;
  return (
    <div className={styles.pet_card} onClick={redirectToPetPage}>
      <div className={styles.pet_image_div}>
        <div
          className={styles.pet_image}
          style={{
            backgroundImage: `url(${
              currentPet.image_url ? currentPet.image_url : default_pic
            })`,
          }}
        ></div>
      </div>
      <div className={styles.pet_info}>
        <div className={styles.name_div}>
          <p className={styles.name}>{currentPet.name}</p>
        </div>
        <div className={styles.goal}>
          <p>Goal: {currentPet.goal}</p>
        </div>
        <div className={styles.weight}>
          <p>
            {currentPet.current_weight}
            {currentPet.unit}
          </p>
        </div>
      </div>
    </div>
  );
};

export default PetCard;
