// constants
const CREATE_PET = "pets/CREATE_PET";

// actions
const add_pet = (pet) => ({
  type: CREATE_PET,
  payload: pet,
});

// thunks
export const create_pet_thunk = (pet) => async (dispatch) => {
  console.log(pet);
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
    default:
      return state;
  }
};

export default reducer;
