import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { edit_pet_thunk } from "../../store/pet";
import styles from "./WeightForm.module.css";

const WeightForm = ({ pet_id }) => {
  const dispatch = useDispatch();
  let pets, currentPet;
  pets = useSelector((state) => state.pets);
  if (pets) {
    currentPet = pets[+pet_id];
  }

  const [weight, setWeight] = useState(currentPet.current_weight);
  const [error, setError] = useState();

  const updateWeight = (e) => setWeight(e.target.value);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const new_pet = {
      pet_id,
      name: currentPet.name,
      user_id: currentPet.user_id,
      goal: currentPet.goal,
      current_weight: weight,
      ideal_weight: currentPet.ideal_weight,
    };
    // call thunk to create new weight
    const errors = await dispatch(edit_pet_thunk(new_pet));
    if (errors) {
      setError(errors);
    } else {
      setError("");
    }
  };

  return (
    <div className={styles.form_div}>
      <form onSubmit={handleSubmit} className={styles.form}>
        <div className={styles.form_container}>
          <div>
            <label htmlFor="weight">today's weight : </label>
            <input
              id="weight"
              className={styles.weight_input}
              type="number"
              value={weight}
              onChange={updateWeight}
            ></input>
            <span className={styles.weight_unit}>kg</span>
          </div>
          {error && <h2 className={styles.error}>{error["current_weight"]}</h2>}
          <button
            // the ternary is used to check the last item in the weights list
            // if the last item in the weights list is recorded today,
            // highlight button green
            className={`${styles.button} ${
              currentPet.weights[currentPet.weights.length - 1].recorded_today
                ? styles.green
                : null
            }`}
            type="submit"
          >
            Record
          </button>
        </div>
      </form>
    </div>
  );
};

export default WeightForm;
