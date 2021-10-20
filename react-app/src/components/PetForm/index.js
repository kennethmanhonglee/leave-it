import { useState } from "react";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router";

import { create_pet_thunk } from "../../store/pet";

const PetForm = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const [name, setName] = useState();
  const [age, setAge] = useState();
  const [current_weight, setCurrentWeight] = useState();
  const [ideal_weight, setIdealWeight] = useState();
  const [neutered, setNeutered] = useState();
  const [errors, setErrors] = useState();

  const updateName = (e) => setName(e.target.value);
  const updateAge = (e) => setAge(e.target.value);
  const updateCurrentWeight = (e) => setCurrentWeight(e.target.value);
  const updateIdealWeight = (e) => setIdealWeight(e.target.value);
  const updateNeutered = (e) => setNeutered(e.target.value);

  const isEmptyForm = () => {
    if (!name || !age || !current_weight || !ideal_weight) return true;
    if (neutered === undefined) return true;
    return false;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    // call thunk and make request
    console.log(neutered);
    const newPet = {
      name,
      age,
      current_weight,
      ideal_weight,
      neutered,
    };
    const data = await dispatch(create_pet_thunk(newPet));
    if (data) {
      setErrors(data);
    } else {
      return history.push("/home");
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      {errors && Object.values(errors).map((error) => <h1>{error}</h1>)}
      <div>
        <input type="text" placeholder="Name" onChange={updateName}></input>
      </div>
      <div>
        <input
          type="number"
          min="0"
          placeholder="Age"
          onChange={updateAge}
        ></input>
      </div>
      <div>
        <input
          type="number"
          min="0"
          placeholder="Current Weight"
          onChange={updateCurrentWeight}
        ></input>
      </div>
      <div>
        <input
          type="number"
          min="0"
          placeholder="Ideal Weight"
          onChange={updateIdealWeight}
        ></input>
      </div>
      <div>
        <label htmlFor="neutered">Is your dog neutered?</label>
        <div>
          <input
            id="neutered"
            type="radio"
            name="neutered"
            value="true"
            onChange={updateNeutered}
          ></input>
          Yes
        </div>
        <div>
          <input
            id="neutered"
            type="radio"
            name="neutered"
            value="false"
            onChange={updateNeutered}
          ></input>
          No
        </div>
      </div>
      <button disabled={isEmptyForm()} type="submit">
        Add a pet
      </button>
    </form>
  );
};

export default PetForm;
