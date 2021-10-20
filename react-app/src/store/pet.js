// constants
const LOAD_PETS = "pets/LOAD_PETS";
const CREATE_PET = "pets/CREATE_PET";
const REMOVE_PETS = "pets/REMOVE_PETS";

// actions
const load_pets = (pets) => ({
  type: LOAD_PETS,
  payload: pets,
});
const add_pet = (pet) => ({
  type: CREATE_PET,
  payload: pet,
});
export const remove_pets = () => ({
  type: REMOVE_PETS,
});

// thunks
export const get_pets_thunk = () => async (dispatch) => {
  const res = await fetch("api/pets");
  const all_pets = await res.json();
  await dispatch(load_pets(all_pets));
  return true;
};

export const create_pet_thunk = (pet) => async (dispatch) => {
  const res = await fetch("/api/pets", {
    method: "POST",
    headers: {
      "content-type": "application/json",
    },
    body: JSON.stringify(pet),
  });
  const response = await res.json();
  if (!response.ok) {
    return response.errors;
  } else {
    await dispatch(add_pet(response));
  }
};

// reducer
const initialState = {};
const reducer = (state = initialState, action) => {
  let newState = Object.assign({}, state);
  switch (action.type) {
    case CREATE_PET:
      const pet = action.payload;
      newState[pet.id] = pet;
      return newState;
    case LOAD_PETS:
      const pets = action.payload;
      Object.values(pets).forEach((pet) => {
        newState[pet.id] = pet;
      });
      return newState;
    case REMOVE_PETS:
      return {};
    default:
      return state;
  }
};

export default reducer;
