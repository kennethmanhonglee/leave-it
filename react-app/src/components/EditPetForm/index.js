import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory, useParams } from "react-router-dom";

import { create_pet_thunk } from "../../store/pet";

const EditPetForm = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const { pet_id } = useParams();
  const [name, setName] = useState();
  const [age, setAge] = useState();
  const [current_weight, setCurrentWeight] = useState();
  const [ideal_weight, setIdealWeight] = useState();
  const [neutered, setNeutered] = useState();
  const [errors, setErrors] = useState();

  const pets = useSelector((state) => state.pets);
  let current_pet;
  if (Object.values(pets).length > 0) {
    if (pets[pet_id]) current_pet = pets[pet_id];
    else console.log("no such pet");
  }

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
      return history.push("/");
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

export default EditPetForm;
