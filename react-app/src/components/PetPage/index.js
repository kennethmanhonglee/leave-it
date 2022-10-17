import { useDispatch, useSelector } from 'react-redux';
import { useHistory, useParams } from 'react-router-dom';
import React from 'react';

import MealTracker from './MealTracker';
import styles from './PetPage.module.css';
import defaultDog from '../../assets/images/default_dog.png';
import { deletePetThunk } from '../../store/pet';

function PetPage() {
  const { petId } = useParams();
  const history = useHistory();
  const dispatch = useDispatch();
  const pets = useSelector((state) => state.pets);
  let currentPet;
  let idealWeight;
  let currentWeight;

  if (Object.values(pets).length > 0) {
    currentPet = pets[+petId];
    idealWeight = currentPet.ideal_weight;
    currentWeight = currentPet.current_weight;
    if (!currentPet) {
      history.push('/errors');
    }
  }

  const deletePet = async () => {
    const result = await dispatch(deletePetThunk(petId));
    if (result) return history.push('/home');
    return 1;
  };

  if (!currentPet) return null;
  return (
    <div className={styles.pet_page}>
      <div className={styles.pet_info}>
        <div
          className={styles.pet_image}
          style={{
            backgroundImage: `url(${currentPet.image_url ? currentPet.image_url : defaultDog})`,
          }}
        />
        <div className={styles.header}>
          <div className={styles.name_and_utils}>
            <h1 className={styles.pet_name}>{currentPet.name}</h1>
            <div className={styles.util_div}>
              <button type="button" className={styles.editing_div} onClick={() => history.push(`/edit_pet/${petId}`)}>
                <div>Edit</div>
              </button>
              <button type="button" className={styles.deleting_div} onClick={deletePet}>
                {/* show modal later on */}
                <div>Delete</div>
              </button>
            </div>
          </div>
          <h2 className={styles.stats}>
            Goal:
            {' '}
            <span>
              {currentPet.goal}
              {' '}
            </span>
          </h2>
          <h2 className={styles.stats}>
            Current Weight:
            {' '}
            <span>
              {currentWeight}
              {currentPet.unit}
              {' '}
            </span>
          </h2>
          <h2 className={styles.stats}>
            Ideal Weight:
            {' '}
            <span>
              {idealWeight}
              {currentPet.unit}
              {' '}
            </span>
          </h2>
        </div>
      </div>
      <MealTracker petId={petId} />
    </div>
  );
}

export default PetPage;
