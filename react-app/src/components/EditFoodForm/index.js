import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory, useParams } from 'react-router-dom';

import styles from './EditFoodForm.module.css';
import { editFoodThunk } from '../../store/food';

function EditFoodForm() {
  const dispatch = useDispatch();
  const history = useHistory();
  const { foodId } = useParams();
  const foods = useSelector((state) => state.foods);
  const currentUser = useSelector((state) => state.session.user);

  let currentFood;
  if (foods) {
    currentFood = foods[foodId];
    if (currentFood?.user_id !== currentUser?.id) history.push('/errors');
  }

  const [foodName, setFoodName] = useState(currentFood?.food_name);
  const [foodType, setFoodType] = useState(currentFood?.food_type);
  const [calories, setCalories] = useState(currentFood?.calories);
  const [servingSize, setServingSize] = useState(currentFood?.serving_size);
  const [errors, setErrors] = useState();

  const updateFoodName = (e) => setFoodName(e.target.value);
  const updateFoodType = (e) => setFoodType(e.target.value);
  const updateCalories = (e) => setCalories(e.target.value);
  const updateServingSize = (e) => setServingSize(e.target.value);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newFood = {
      foodName,
      foodType,
      calories,
      servingSize,
    };

    const data = await dispatch(editFoodThunk(foodId, newFood));
    if (data && data.errors) {
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

  if (!currentFood) return null;
  return (
    <div className={styles.container}>
      <form onSubmit={handleSubmit} className={styles.form}>
        <h2 className={styles.header}>
          {' '}
          Edit
          {currentFood.foodName}
        </h2>
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

export default EditFoodForm;
