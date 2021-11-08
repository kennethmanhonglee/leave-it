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
  const currentUser = useSelector((state) => state.session.user);
  let current_pet;
  if (Object.values(pets).length > 0 && currentUser) {
    if (pets[pet_id]) {
      current_pet = pets[pet_id];
    } else {
      history.push("/home");
    }
  }

  if (currentUser && Object.values(pets).length === 0) history.push("/home");

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
  if (!current_pet) return null;
  else {
    return (
      <div className={styles.container}>
        <form onSubmit={handleSubmit} className={styles.form}>
          <div>
            <h2 className={styles.header}>Edit {current_pet?.name}</h2>
          </div>
          <div>
            <input
              type="text"
              placeholder="Name"
              onChange={updateName}
              value={name}
              className={styles.input}
            ></input>
            {errors && <div className={styles.errors}>{errors["name"]}</div>}
          </div>
          <div>
            <select
              value={goal}
              onChange={updateGoal}
              className={styles.select}
            >
              {ACCEPTED_GOALS.map((goal) => (
                <option key={goal} value={goal}>
                  {goal}
                </option>
              ))}
            </select>
            {errors && <div className={styles.errors}>{errors["goal"]}</div>}
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
            {errors && (
              <div className={styles.errors}>{errors["current_weight"]}</div>
            )}
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
            {errors && (
              <div className={styles.errors}>{errors["ideal_weight"]}</div>
            )}
          </div>
          <button
            disabled={isEmptyForm()}
            type="submit"
            className={`${styles.button} ${isEmptyForm() ? styles.grey : null}`}
          >
            Edit {current_pet.name}
          </button>
        </form>
      </div>
    );
  }
};

export default EditPetForm;
