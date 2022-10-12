import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';

import { createFoodThunk } from '../../store/food';
import styles from './CreateFoodForm.module.css';

function CreateFoodForm() {
  const dispatch = useDispatch();
  const history = useHistory();

  const [foodName, setfoodName] = useState('');
  const [foodType, setfoodType] = useState('Kibbles');
  const [calories, setCalories] = useState(0);
  const [servingSize, setservingSize] = useState(0);
  const [errors, setErrors] = useState();

  const updateFoodName = (e) => setfoodName(e.target.value);
  const updateFoodType = (e) => setfoodType(e.target.value);
  const updateCalories = (e) => setCalories(e.target.value);
  const updateServingSize = (e) => setservingSize(e.target.value);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newFood = {
      foodName,
      foodType,
      calories,
      servingSize,
    };

    const data = await dispatch(createFoodThunk(newFood));
    if (data.errors) {
      setErrors(data.errors);
    } else {
      // if modal, close modal
      // not yet modal, so we redirect to food page
      // history.push("/add_food");
      history.goBack();
    }
  };

  const isEmptyForm = () => {
    if (!foodName || !calories || !servingSize) return true;
    return false;
  };

  return (
    <div className={styles.container}>
      <form onSubmit={handleSubmit} className={styles.form}>
        <h2 className={styles.header}>Create a food</h2>
        <div>
          <label htmlFor="foodName">
            Food Name
            <input
              id="foodName"
              type="text"
              placeholder="Food"
              onChange={updateFoodName}
              value={foodName}
              className={styles.input}
            />
          </label>
          {errors && errors.foodName && <div className={styles.errors}>{errors.foodName}</div>}
        </div>
        <div>
          <label htmlFor="foodType">
            Food Type
            <select id="foodType" onChange={updateFoodType} value={foodType} className={styles.select}>
              <option onSelect={updateFoodType} value="Kibbles">
                Kibbles
              </option>
              <option onSelect={updateFoodType} value="Fresh Food">
                Fresh Food
              </option>
              <option onSelect={updateFoodType} value="Raw Meat">
                Raw Meat
              </option>
              <option onSelect={updateFoodType} value="Others">
                Others
              </option>
            </select>
          </label>
          {errors && errors.foodType && <div className={styles.errors}>{errors.foodType}</div>}
        </div>
        <div>
          <label htmlFor="servingSize">
            Serving Size in Grams
            <input
              type="number"
              id="servingSize"
              placeholder="Serving Size in Grams"
              onChange={updateServingSize}
              value={servingSize}
              className={styles.number}
            />
          </label>
          {errors && errors.servingSize && <div className={styles.errors}>{errors.servingSize}</div>}
        </div>
        <div>
          <label htmlFor="calories">
            Calories
            <input
              type="number"
              id="calories"
              placeholder="calories"
              onChange={updateCalories}
              value={calories}
              className={styles.number}
            />
          </label>
          {errors && errors.calories && <div className={styles.errors}>{errors.calories}</div>}
        </div>
        <button
          type="submit"
          disabled={isEmptyForm()}
          className={`${styles.button} ${isEmptyForm() ? styles.grey : null}`}
        >
          Submit
        </button>
      </form>
    </div>
  );
}

export default CreateFoodForm;
