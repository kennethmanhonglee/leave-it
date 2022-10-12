import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { deleteMealThunk } from '../../../../store/meal';

import styles from './MealEntry.module.css';

function MealEntry({ meal }) {
  const dispatch = useDispatch();
  const foods = useSelector((state) => state.foods);
  let currentFood;
  if (foods) {
    currentFood = foods[meal.foodId];
  }

  const deleteMeal = async () => {
    const error = await dispatch(deleteMealThunk(meal.id));
    if (error) {
      // pop up modal later to show something went wrong
      alert('Not able to delete meal.');
    }
  };

  if (!currentFood) return null;
  return (
    <div className={styles.container}>
      <div>{currentFood.foodType}</div>
      <div>{currentFood.foodName}</div>
      {/* calories calculated from food cal * meal serving size / food serving size */}
      <div>
        {meal.calories}
        {' '}
        calories
      </div>
      <div>
        {meal.servingSize}
        {' '}
        g
      </div>
      <div className={styles.button_div}>
        <button type="button" onClick={deleteMeal} className={styles.button}>
          delete
        </button>
      </div>
    </div>
  );
}

export default MealEntry;
