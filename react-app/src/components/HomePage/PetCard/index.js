import React, { useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';

import styles from './PetCard.module.css';
import defaultPic from '../../../assets/images/default_dog.png';

function PetCard({ petId }) {
  const history = useHistory();
  const pets = useSelector((state) => state.pets);
  let currentPet;
  if (Object.values(pets).length > 0) {
    currentPet = pets[+petId];
  }

  const redirectToPetPage = () => {
    history.push(`/pets/${petId}`);
  };
  if (!currentPet) return null;
  return (
    <button type="button" className={styles.pet_card} onClick={redirectToPetPage}>
      <div className={styles.pet_image_div}>
        <div
          className={styles.pet_image}
          style={{
            backgroundImage: `url(${currentPet.image_url ? currentPet.image_url : defaultPic})`,
          }}
        />
      </div>
      <div className={styles.pet_info}>
        <div className={styles.name_div}>
          <p className={styles.name}>{currentPet.name}</p>
        </div>
        <div className={styles.goal}>
          <p>
            Goal:
            {currentPet.goal}
          </p>
        </div>
        <div className={styles.weight}>
          <p>
            {currentPet.currentWeight}
            {currentPet.unit}
          </p>
        </div>
      </div>
    </button>
  );
}

export default PetCard;
