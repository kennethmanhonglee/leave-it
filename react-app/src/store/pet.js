// constants
const LOAD_PETS = "pets/LOAD_PETS";
const CREATE_PET = "pets/CREATE_PET";
const REMOVE_PETS = "pets/REMOVE_PETS";
const DELETE_PET = "pets/DELETE_PET";

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

const delete_pet = (pet_id) => ({
  type: DELETE_PET,
  payload: pet_id,
});

// thunks
export const get_pets_thunk = () => async (dispatch) => {
  const res = await fetch(`${window.location.origin}/api/pets`);
  const all_pets = await res.json();
  await dispatch(load_pets(all_pets));
  return true;
};

export const create_pet_thunk = (pet) => async (dispatch) => {
  const res = await fetch(`${window.location.origin}/api/pets`, {
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
export const edit_pet_thunk = (pet) => async (dispatch) => {
  const res = await fetch(`${window.location.origin}/api/pets/${pet.pet_id}`, {
    method: "PUT",
    headers: {
      "content-type": "application/json",
    },
    body: JSON.stringify(pet),
  });
  const response = await res.json();
  if (!response.ok) {
    return response.errors;
  } else {
    // edit does the same thing as adding a pet in terms of redux store state
    await dispatch(add_pet(response));
  }
};

export const delete_pet_thunk = (pet_id) => async (dispatch) => {
  const res = await fetch(`${window.location.origin}/api/pets/${pet_id}`, {
    method: "DELETE",
  });
  const response = await res.json();
  if (response.deleted) {
    await dispatch(delete_pet(pet_id));
    return true;
  } else {
    return false;
  }
};

// reducer
const initialState = {};
const reducer = (state = initialState, action) => {
  let newState = Object.assign({}, state);
  switch (action.type) {
    case CREATE_PET:
      let pet = action.payload;
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
    case DELETE_PET:
      const pet_id = action.payload;
      delete newState[pet_id];
      return newState;
    default:
      return state;
  }
};

export default reducer;
