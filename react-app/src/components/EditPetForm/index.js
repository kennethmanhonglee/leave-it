import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory, useParams } from "react-router-dom";

import { edit_pet_thunk } from "../../store/pet";
import styles from "./EditPetForm.module.css";

const EditPetForm = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const { pet_id } = useParams();
  const pets = useSelector((state) => state.pets);
  let current_pet;
  if (Object.values(pets).length > 0) {
    if (pets[pet_id]) {
      current_pet = pets[pet_id];
    }
  }

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

  const [name, setName] = useState(current_pet?.name);
  const [current_weight, setCurrentWeight] = useState(
    current_pet?.current_weight
  );
  const [ideal_weight, setIdealWeight] = useState(current_pet?.ideal_weight);
  const [goal, setGoal] = useState(current_pet?.goal);
  const [errors, setErrors] = useState();

  const updateName = (e) => setName(e.target.value);
  const updateGoal = (e) => setGoal(e.target.value);
  const updateCurrentWeight = (e) => setCurrentWeight(e.target.value);
  const updateIdealWeight = (e) => setIdealWeight(e.target.value);

  const isEmptyForm = () => {
    if (!name || !goal || !current_weight || !ideal_weight) return true;
    return false;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    // call thunk and make request
    const newPet = {
      pet_id: +pet_id,
      name,
      current_weight,
      ideal_weight,
      goal,
    };
    const data = await dispatch(edit_pet_thunk(newPet));
    if (data) {
      setErrors(data);
    } else {
      return history.push("/home");
    }
  };

  return (
    <div className={styles.container}>
      <form onSubmit={handleSubmit} className={styles.form}>
        <h2 className={styles.header}>Edit {current_pet?.name}</h2>
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
            value={name}
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
            value={current_weight}
            className={styles.number}
          ></input>
        </div>
        <div>
          <input
            type="number"
            min="0"
            placeholder="Ideal Weight in Kilograms"
            onChange={updateIdealWeight}
            value={ideal_weight}
            className={styles.number}
          ></input>
        </div>
        <button
          disabled={isEmptyForm()}
          type="submit"
          className={styles.button}
        >
          Edit {current_pet.name}
        </button>
      </form>
    </div>
  );
};

export default EditPetForm;
