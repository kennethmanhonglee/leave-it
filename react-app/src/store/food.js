// constants
const CREATE_FOOD = 'food/CREATE_FOOD';
const LOAD_FOOD = 'food/LOAD_FOOD';
const REMOVE_FOODS = 'food/REMOVE_FOODS';
const EDIT_FOOD = 'food/EDIT_FOOD';
const DELETE_FOOD = 'food/DELETE_FOOD';

// actions
const createFood = (food) => ({
  type: CREATE_FOOD,
  payload: food,
});

const loadFood = (foods) => ({
  type: LOAD_FOOD,
  payload: foods,
});

export const removeFoodss = () => ({
  type: REMOVE_FOODS,
});

const editFood = (food) => ({
  type: EDIT_FOOD,
  payload: food,
});

const deleteFood = (foodId) => ({
  type: DELETE_FOOD,
  payload: foodId,
});

// thunks
export const createFoodThunk = (food) => async (dispatch) => { // eslint-disable-line
  const res = await fetch('/api/foods', {
    method: 'POST',
    headers: {
      'content-type': 'application/json',
    },
    body: JSON.stringify(food),
  });
  const response = await res.json();
  if (!response.ok) {
    // response contains errors
    return response;
  }
  //   response contains food
  await dispatch(createFood(response));
};

export const loadFoodThunk = () => async (dispatch) => {
  const res = await fetch('/api/foods');
  const response = await res.json();
  await dispatch(loadFood(response));
};

export const editFoodThunk = (foodId, newFood) => async (dispatch) => { // eslint-disable-line
  const res = await fetch(`/api/foods/${foodId}`, {
    method: 'PUT',
    headers: {
      'content-type': 'application/json',
    },
    body: JSON.stringify(newFood),
  });
  const response = await res.json();
  if (!response.ok) {
    return response;
  }
  const { food } = response;
  await dispatch(editFood(food));
};

export const deleteFoodThunk = (foodId) => async (dispatch) => { // eslint-disable-line
  const res = await fetch(`/api/foods/${foodId}`, {
    method: 'DELETE',
  });
  const response = await res.json();
  if (!response.ok) {
    return response.errors;
  }
  await dispatch(deleteFood(foodId));
};

// reducer
const initialState = {};
const reducer = (state = initialState, action = {}) => {
  const newState = { ...state };
  switch (action.type) {
    case CREATE_FOOD:
      newState[action.payload.id] = action.payload;
      return newState;
    case LOAD_FOOD:
      Object.entries(action.payload).forEach(([id, food]) => {
        newState[id] = food;
      });
      return newState;
    case REMOVE_FOODS:
      return {};
    case EDIT_FOOD:
      newState[action.payload.id] = action.payload;
      return newState;
    case DELETE_FOOD:
      delete newState[action.payload];
      return newState;
    default:
      return state;
  }
};

export default reducer;
