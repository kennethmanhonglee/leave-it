import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory, useParams } from "react-router-dom";

import { edit_pet_thunk } from "../../store/pet";

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
  const [name, setName] = useState(current_pet?.name);
  const [age, setAge] = useState(current_pet?.age);
  const [current_weight, setCurrentWeight] = useState(
    current_pet?.current_weight
  );
  const [ideal_weight, setIdealWeight] = useState(current_pet?.ideal_weight);
  const [neutered, setNeutered] = useState(current_pet?.neutered);
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
    const newPet = {
      pet_id: +pet_id,
      name,
      age,
      current_weight,
      ideal_weight,
      neutered,
    };
    const data = await dispatch(edit_pet_thunk(newPet));
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
        <input
          type="text"
          placeholder="Name"
          onChange={updateName}
          value={name}
        ></input>
      </div>
      <div>
        <input
          type="number"
          min="0"
          placeholder="Age"
          onChange={updateAge}
          value={age}
        ></input>
      </div>
      <div>
        <input
          type="number"
          min="0"
          placeholder="Current Weight"
          onChange={updateCurrentWeight}
          value={current_weight}
        ></input>
      </div>
      <div>
        <input
          type="number"
          min="0"
          placeholder="Ideal Weight"
          onChange={updateIdealWeight}
          value={ideal_weight}
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
        Edit {current_pet.name}
      </button>
    </form>
  );
};

export default EditPetForm;
