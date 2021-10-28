import { useState } from "react";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router";

import { create_pet_thunk } from "../../store/pet";
import styles from "./PetForm.module.css";

const PetForm = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const [name, setName] = useState();
  const [current_weight, setCurrentWeight] = useState();
  const [ideal_weight, setIdealWeight] = useState();
  const [goal, setGoal] = useState("Neutered Adult");
  const [errors, setErrors] = useState();

  const ACCEPTED_GOALS = [
    "Neutered Adult",
    "Intact Adult",
    "Inactive/obese prone",
    "Weight Loss",
    "Weight Gain",
    "Active, working dogs",
    "Puppy 0-4 months",
    "Puppy 4 months to adult",
  ];

  const updateName = (e) => setName(e.target.value);
  const updateCurrentWeight = (e) => setCurrentWeight(e.target.value);
  const updateIdealWeight = (e) => setIdealWeight(e.target.value);
  const updateGoal = (e) => setGoal(e.target.value);

  const isEmptyForm = () => {
    if (!name || !current_weight || !ideal_weight) return true;
    return false;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    // call thunk and make request
    const newPet = {
      name,
      current_weight,
      ideal_weight,
      goal,
    };
    const data = await dispatch(create_pet_thunk(newPet));
    if (data) {
      setErrors(data);
    } else {
      return history.push("/home");
    }
  };

  return (
    <div className={styles.container}>
      <form className={styles.form} onSubmit={handleSubmit}>
        <h2 className={styles.header}>Create a pet</h2>
        {errors &&
          Object.values(errors).map((error, ind) => (
            <div className={styles.errors} key={ind}>
              {error}
            </div>
          ))}
        <div>
          <input
            type="text"
            placeholder="Name"
            onChange={updateName}
            className={styles.input}
          ></input>
        </div>
        <div>
          <select value={goal} onChange={updateGoal} className={styles.select}>
            {ACCEPTED_GOALS.map((goal) => (
              <option key={goal} value={goal}>
                {goal}
              </option>
            ))}
          </select>
        </div>
        <div>
          <input
            type="number"
            min="0"
            placeholder="Current Weight in Kilograms"
            onChange={updateCurrentWeight}
            className={styles.number}
          ></input>
        </div>
        <div>
          <input
            type="number"
            min="0"
            placeholder="Ideal Weight in Kilograms"
            onChange={updateIdealWeight}
            className={styles.number}
          ></input>
        </div>
        <button
          className={styles.button}
          disabled={isEmptyForm()}
          type="submit"
        >
          Add a pet
        </button>
      </form>
    </div>
  );
};

export default PetForm;
