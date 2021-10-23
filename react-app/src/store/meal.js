// constants
const CREATE_MEAL = "meals/CREATE_MEAL";
const LOAD_MEALS = "meals/LOAD_MEALS";
const REMOVE_MEALS = "meals/REMOVE_MEALS";

// actions
const create_meal = (meal) => ({
  type: CREATE_MEAL,
  payload: meal,
});

const load_meals = (meals) => ({
  type: LOAD_MEALS,
  payload: meals,
});
export const remove_meals = () => ({
  type: REMOVE_MEALS,
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

export const load_meals_thunk = () => async (dispatch) => {
  const res = await fetch(`${window.location.origin}/api/meals/today`);
  const response = await res.json();
  await dispatch(load_meals(response));
};

// reducer
const initialState = {};

const reducer = (state = initialState, action) => {
  let newState = Object.assign({}, state);
  switch (action.type) {
    case CREATE_MEAL:
      newState[action.payload.id] = action.payload;
      return newState;
    case LOAD_MEALS:
      for (let [id, meal] of Object.entries(action.payload)) {
        newState[id] = meal;
      }
      return newState;
    case REMOVE_MEALS:
      return {};
    default:
      return state;
  }
};

export default reducer;
