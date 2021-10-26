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

  const updateWeight = (e) => setWeight(e.target.value);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const new_pet = {
      pet_id,
      name: currentPet.name,
      user_id: currentPet.user_id,
      age: currentPet.age,
      current_weight: weight,
      ideal_weight: currentPet.ideal_weight,
      neutered: currentPet.neutered,
    };
    // call thunk to create new weight
    const errors = await dispatch(edit_pet_thunk(new_pet));
    if (errors) {
      console.log(errors);
    }
  };

  return (
    <div className={styles.form_div}>
      <form onSubmit={handleSubmit} className={styles.form}>
        <div>
          <label htmlFor="weight">
            {currentPet && currentPet.name}'s weight today:{" "}
          </label>
          <input
            id="weight"
            className={styles.weight_input}
            type="number"
            value={weight}
            onChange={updateWeight}
          ></input>
          <button className={styles.button} type="submit">
            Record
          </button>
        </div>
      </form>
    </div>
  );
};

export default WeightForm;
