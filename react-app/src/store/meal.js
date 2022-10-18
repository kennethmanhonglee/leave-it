// constants
const CREATE_MEAL = 'meals/CREATE_MEAL';
const LOAD_MEALS = 'meals/LOAD_MEALS';
const REMOVE_MEALS = 'meals/REMOVE_MEALS';
const DELETE_MEAL = 'meals/DELETE_MEAL';

// actions
const createMeal = (meal) => ({
  type: CREATE_MEAL,
  payload: meal,
});

const loadMeals = (meals) => ({
  type: LOAD_MEALS,
  payload: meals,
});
export const removeMeals = () => ({
  type: REMOVE_MEALS,
});
const deleteMeal = (mealId) => ({
  type: DELETE_MEAL,
  payload: mealId,
});

// thunks
export const createMealThunk = (newMeal) => async (dispatch) => { // eslint-disable-line
  // make post request with foodId
  const res = await fetch('/api/meals', {
    method: 'POST',
    headers: {
      'content-type': 'application/json',
    },
    body: JSON.stringify(newMeal),
  });
  const response = await res.json();
  if (response.ok === false) {
    return response.errors;
  }
  await dispatch(createMeal(response));
};

export const loadMealsThunk = () => async (dispatch) => { // eslint-disable-line consistent-return
  const res = await fetch('/api/meals/today');
  const response = await res.json();
  await dispatch(loadMeals(response));
};

export const deleteMealThunk = (mealId) => async (dispatch) => { // eslint-disable-line
  const res = await fetch(`/api/meals/${mealId}`, {
    method: 'DELETE',
  });
  const response = await res.json();
  if (!response.ok) {
    return response.errors;
  }
  await dispatch(deleteMeal(mealId));
};

// reducer
const initialState = {};

const reducer = (state = initialState, action = {}) => {
  const newState = { ...state };
  switch (action.type) {
    case CREATE_MEAL:
      newState[action.payload.id] = action.payload;
      return newState;
    case LOAD_MEALS:
      Object.entries(action.payload).forEach(([id, meal]) => {
        newState[id] = meal;
      });
      return newState;
    case REMOVE_MEALS:
      return {};
    case DELETE_MEAL:
      delete newState[action.payload];
      return newState;
    default:
      return state;
  }
};

export default reducer;
