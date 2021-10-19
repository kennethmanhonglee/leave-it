import { useState } from "react";

const PetForm = () => {
  const [name, setName] = useState();
  const [age, setAge] = useState();
  const [currentWeight, setCurrentWeight] = useState();
  const [idealWeight, setIdealWeight] = useState();
  const [neutered, setNeutered] = useState();

  const updateName = (e) => setName(e.target.value);
  const updateAge = (e) => setAge(e.target.value);
  const updateCurrentWeight = (e) => setCurrentWeight(e.target.value);
  const updateIdealWeight = (e) => setIdealWeight(e.target.value);
  const updateNeutered = (e) => setNeutered(e.target.value);

  const isEmptyForm = () => {
    if (!name || !age || !currentWeight || !idealWeight) return true;
    if (neutered === undefined) return true;
    return false;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // call thunk and make request
  };

  return (
    <form onSubmit={handleSubmit}>
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
