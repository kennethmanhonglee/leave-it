import React, { useEffect } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import styles from './AddFoodForm.module.css';
import { loadFoodThunk } from '../../store/food';
import FoodEntry from './FoodEntry';

function AddFoodForm() {
  const history = useHistory();
  const dispatch = useDispatch();
  const { petId } = useParams();
  const currentUserFoods = useSelector((state) => state.foods);
  const pets = useSelector((state) => state.pets);

  useEffect(() => {
    dispatch(loadFoodThunk());
  }, [dispatch]);

  if (pets && !pets[+petId]) {
    history.push('/home');
  }

  // redirect for now, close modal later
  const createFood = () => history.push('/createFood');

  return (
    <div className={styles.form}>
      <div className={styles.container}>
        <div className={styles.header_bar}>
          <div className={styles.header_div}>
            <h3>Choose one of the available foods to add to the tracker, or create your own:</h3>
          </div>
          <div className={styles.create_button_div}>
            <button type="button" onClick={createFood} className={styles.button}>
              Create a Food
            </button>
          </div>
        </div>
        <div className={styles.food_entries}>
          {currentUserFoods
            && Object.values(currentUserFoods).map((food) => (
              // make component to go from name to all info
              <div key={food.id} className={styles.food_entry}>
                <FoodEntry food={food} />
              </div>
            ))}
        </div>
      </div>
    </div>
  );
}

export default AddFoodForm;
