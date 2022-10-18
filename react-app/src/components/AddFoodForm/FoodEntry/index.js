import { useDispatch, useSelector } from 'react-redux';
import { useParams, useHistory } from 'react-router-dom';

import React, { useEffect, useState } from 'react';
import styles from './FoodEntry.module.css';
import { createMealThunk } from '../../../store/meal';
import { deleteFoodThunk } from '../../../store/food';

// This component is for food entries in adding food into meals
function FoodEntry({ food }) {
  const { food_name: foodName, food_type: foodType } = food;
  const dispatch = useDispatch();
  const { petId } = useParams();
  const history = useHistory();
  const currentUser = useSelector((state) => state.session.user);
  const [servingSize, setservingSize] = useState(food.serving_size);
  const [error, setError] = useState('');

  const proportion = food.calories / food.serving_size;
  const calories = (proportion * servingSize).toFixed(2);

  const changeServingSize = (e) => setservingSize(e.target.value);

  useEffect(() => {
    if (servingSize > 500 || servingSize < 0) {
      setError(`Serving size for ${food.foodName} must be less than 500g.`);
    } else {
      setError('');
    }
  }, [servingSize]);

  const addFood = async () => {
    const newMeal = {
      foodId: food.id,
      petId,
      servingSize,
      calories,
    };
    const errors = await dispatch(createMealThunk(newMeal));
    if (errors) {
      setError(errors);
    } else {
      history.goBack();
    }
  };

  const deleteFood = async () => {
    const data = await dispatch(deleteFoodThunk(food.id));
    if (data) {
      setError(data);
    }
  };

  return (
    <div className={styles.food_entry}>
      {error && <h2 className={styles.error}>{error}</h2>}
      <div className={styles.food_and_buttons}>
        <div className={styles.food_info}>
          <div>
            <h2>{foodName}</h2>
          </div>
          <div>
            <h2>{foodType}</h2>
          </div>
          <div>
            <h2>
              {calories}
              {' '}
              cal
            </h2>
          </div>
          <div>
            <input
              type="number"
              value={servingSize}
              onChange={changeServingSize}
              max="500"
              min="0"
              className={styles.food_entry_serving_input}
            />
            <h2>g</h2>
          </div>
        </div>
        <div className={styles.add_button_div}>
          {/* placeholder, will likely use a fontawesome icon later */}
          {currentUser && food.user_id === currentUser.id && (
            <>
              <button type="button" className={styles.button} onClick={() => history.push(`/editFood/${food.id}`)}>
                Edit
              </button>
              <button type="button" className={styles.button} onClick={deleteFood}>
                Delete
              </button>
            </>
          )}
          <button type="button" onClick={addFood} className={styles.button}>
            Add
          </button>
        </div>
      </div>
    </div>
  );
}

export default FoodEntry;
