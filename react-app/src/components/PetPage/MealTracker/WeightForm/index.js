import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { newWeightThunk } from '../../../../store/pet';
import styles from './WeightForm.module.css';

function WeightForm({ petId }) {
  const dispatch = useDispatch();
  let currentPet;
  const pets = useSelector((state) => state.pets);
  if (pets) {
    currentPet = pets[+petId];
  }

  const [weight, setWeight] = useState(currentPet.current_weight);
  const [error, setError] = useState();

  const updateWeight = (e) => setWeight(e.target.value);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newPet = {
      petId,
      currentWeight: +weight,
      unit: currentPet.unit,
    };
    const errors = await dispatch(newWeightThunk(newPet));
    if (errors) {
      setError(errors);
    } else {
      setError('');
    }
  };

  return (
    <div className={styles.form_div}>
      <form onSubmit={handleSubmit} className={styles.form}>
        <div className={styles.form_container}>
          <div>
            <label htmlFor="weight">
              today&apos;s weight :
              <input
                id="weight"
                className={styles.weight_input}
                type="number"
                value={weight}
                onChange={updateWeight}
              />
            </label>
            <span className={styles.weight_unit}>{currentPet.unit}</span>
          </div>
          {error && <h2 className={styles.error}>{error.currentWeight}</h2>}
          <button
            // the ternary is used to check the last item in the weights list
            // if the last item in the weights list is recorded today,
            // highlight button green
            className={`${styles.button} ${
              currentPet.weights[currentPet.weights.length - 1].recorded_today ? styles.green : null
            }`}
            type="submit"
          >
            Record
          </button>
        </div>
      </form>
    </div>
  );
}

export default WeightForm;
