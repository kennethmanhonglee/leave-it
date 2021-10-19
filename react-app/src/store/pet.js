// constants
const CREATE_PET = "pets/CREATE_PET";

// actions

// thunks
export const create_pet_thunk = (pet) => {
  const res = fetch("/api/pets", {
    method: "POST",
    headers: {
      "content-type": "application/json",
    },
    body: JSON.stringify(pet),
  });
  console.log(res);
};

// reducer
const initialState = {};
const reducer = (state = initialState, action) => {
  switch (action.type) {
    default:
      return state;
  }
};

export default reducer;
