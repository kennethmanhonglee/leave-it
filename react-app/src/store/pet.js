// constants
const LOAD_PETS = 'pets/LOAD_PETS';
const CREATE_PET = 'pets/CREATE_PET';
const REMOVE_PETS = 'pets/REMOVE_PETS';
const DELETE_PET = 'pets/DELETE_PET';

// actions
const loadPets = (pets) => ({
  type: LOAD_PETS,
  payload: pets,
});
const addPet = (pet) => ({
  type: CREATE_PET,
  payload: pet,
});
export const removePets = () => ({
  type: REMOVE_PETS,
});

const deletePet = (petId) => ({
  type: DELETE_PET,
  payload: petId,
});

// thunks
export const getPetsThunk = () => async (dispatch) => {
  const res = await fetch('/api/pets');
  const allPets = await res.json();
  await dispatch(loadPets(allPets));
  return true;
};

export const createPetThunk = (pet) => async (dispatch) => { // eslint-disable-line
  const res = await fetch('/api/pets', {
    method: 'POST',
    body: pet,
  });
  const response = await res.json();
  if (!response.ok) {
    return response.errors;
  }
  await dispatch(addPet(response));
};
export const editPetThunk = ({ petId, newPetData }) => async (dispatch) => { // eslint-disable-line
  const res = await fetch(`/api/pets/${petId}`, {
    method: 'PATCH',
    body: newPetData,
  });
  const response = await res.json();
  if (!response.ok) {
    return response.errors;
  }
  // edit does the same thing as adding a pet in terms of redux store state
  await dispatch(addPet(response.new_pet));
};

export const newWeightThunk = ({ petId, currentWeight, unit }) => async (dispatch) => { // eslint-disable-line
  const res = await fetch(`/api/pets/${petId}/new_weight`, {
    method: 'POST',
    headers: {
      'content-type': 'application/json',
    },
    body: JSON.stringify({ petId, currentWeight, unit }),
  });

  const response = await res.json();
  if (!response.ok) {
    return response.errors;
  }
  // dispatch action to create pet - same as editing pet
  await dispatch(addPet(response.new_pet));
};

export const deletePetThunk = (petId) => async (dispatch) => {
  const res = await fetch(`/api/pets/${petId}`, {
    method: 'DELETE',
  });
  const response = await res.json();
  if (response.deleted) {
    await dispatch(deletePet(petId));
    return true;
  }
  return false;
};

// reducer
const initialState = {};
const reducer = (state = initialState, action = {}) => {
  const newState = { ...state };
  switch (action.type) {
    case CREATE_PET:
      newState[action.payload.id] = action.payload;
      return newState;
    case LOAD_PETS:
      Object.values(action.payload).forEach((pet) => {
        newState[pet.id] = pet;
      });
      return newState;
    case REMOVE_PETS:
      return {};
    case DELETE_PET:
      delete newState[action.payload];
      return newState;
    default:
      return state;
  }
};

export default reducer;
