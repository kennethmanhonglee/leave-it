// constants
const CREATE_MEAL = "meals/CREATE_MEAL";
const LOAD_MEALS = "meals/LOAD_MEALS";
const REMOVE_MEALS = "meals/REMOVE_MEALS";
const DELETE_MEAL = "meals/DELETE_MEAL";

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
const delete_meal = (meal_id) => ({
  type: DELETE_MEAL,
  payload: meal_id,
});

// thunks
export const create_meal_thunk =
  ({ food_id, pet_id }) =>
  async (dispatch) => {
    // make post request with food_id
    const res = await fetch(`/api/meals`, {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify({ food_id, pet_id }),
    });
    const response = await res.json();
    console.log(response);
    if (response.ok === false) {
      return response.errors;
    } else {
      await dispatch(create_meal(response));
    }
  };

export const load_meals_thunk = () => async (dispatch) => {
  const res = await fetch(`/api/meals/today`);
  const response = await res.json();
  await dispatch(load_meals(response));
};

export const delete_meal_thunk = (meal_id) => async (dispatch) => {
  console.log(meal_id);
  const res = await fetch(`/api/meals/${meal_id}`, {
    method: "DELETE",
  });
  const response = await res.json();
  if (!response.ok) {
    return response.errors;
  } else {
    await dispatch(delete_meal(meal_id));
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
    case LOAD_MEALS:
      for (let [id, meal] of Object.entries(action.payload)) {
        newState[id] = meal;
      }
      return newState;
    case REMOVE_MEALS:
      return {};
    case DELETE_MEAL:
      console.log("\n\n\n LEE LOO \n\n\n");
      console.log(newState[action.payload]);
      delete newState[action.payload];
      return newState;
    default:
      return state;
  }
};

export default reducer;
