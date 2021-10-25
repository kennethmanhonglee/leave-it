// constants
const CREATE_FOOD = "food/CREATE_FOOD";
const LOAD_FOOD = "food/LOAD_FOOD";
const REMOVE_FOODS = "food/REMOVE_FOODS";
const EDIT_FOOD = "food/EDIT_FOOD";

// actions
const create_food = (food) => ({
  type: CREATE_FOOD,
  payload: food,
});

const load_food = (foods) => ({
  type: LOAD_FOOD,
  payload: foods,
});

export const remove_foods = () => ({
  type: REMOVE_FOODS,
});

const edit_food = (food) => ({
  type: EDIT_FOOD,
  payload: food,
});

// thunks
export const create_food_thunk = (food) => async (dispatch) => {
  const res = await fetch(`/api/foods`, {
    method: "POST",
    headers: {
      "content-type": "application/json",
    },
    body: JSON.stringify(food),
  });
  const response = await res.json();
  if (!response.ok) {
    // response contains errors
    return response;
  } else {
    //   response contains food
    await dispatch(create_food(response));
  }
};

export const load_food_thunk = () => async (dispatch) => {
  const res = await fetch(`/api/foods`);
  const response = await res.json();
  await dispatch(load_food(response));
};

export const edit_food_thunk = (food_id, new_food) => async (dispatch) => {
  const res = await fetch(`/api/foods/${food_id}`, {
    method: "PUT",
    headers: {
      "content-type": "application/json",
    },
    body: JSON.stringify(new_food),
  });
  const response = await res.json();
  if (!response.ok) {
    return response;
  } else {
    const { food } = response;
    await dispatch(edit_food(food));
  }
};

// reducer
const initialState = {};
const reducer = (state = initialState, action) => {
  let newState = Object.assign({}, state);
  switch (action.type) {
    case CREATE_FOOD:
      newState[action.payload.id] = action.payload;
      return newState;
    case LOAD_FOOD:
      const foods = action.payload;
      for (let [id, food] of Object.entries(foods)) {
        newState[id] = food;
      }
      return newState;
    case REMOVE_FOODS:
      return {};
    case EDIT_FOOD:
      newState[action.payload.id] = action.payload;
      return newState;
    default:
      return state;
  }
};

export default reducer;
