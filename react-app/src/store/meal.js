import { useDispatch } from "react-redux";

// constants
const CREATE_MEAL = "meals/CREATE_MEAL";

// actions
const create_meal = (meal) => ({
  type: CREATE_MEAL,
  payload: meal,
});

// thunks
export const create_meal_thunk =
  ({ food_id, pet_id }) =>
  async (dispatch) => {
    // make post request with food_id
    const res = await fetch(`${window.location.origin}/api/meals`, {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify({ food_id, pet_id }),
    });
    const response = await res.json();
    if (response.ok === false) {
      return response.errors;
    } else {
      await dispatch(create_meal(response));
    }
  };

// reducer
const initialState = {};

const reducer = (state = initialState, action) => {
  let newState = Object.assign({}, state);
  switch (action.type) {
    case CREATE_MEAL:
      newState[action.payload.id] = action.payload;
      return newState;
    default:
      return state;
  }
};

export default reducer;
