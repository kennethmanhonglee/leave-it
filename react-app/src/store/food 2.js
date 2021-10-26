// constants
const CREATE_FOOD = "food/CREATE_FOOD";
const LOAD_FOOD = "food/LOAD_FOOD";
const REMOVE_FOODS = "food/REMOVE_FOODS";

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

// thunks
export const create_food_thunk = (food) => async (dispatch) => {
  const res = await fetch(`${window.location.origin}/api/foods`, {
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
  const res = await fetch(`${window.location.origin}/api/foods`);
  const response = await res.json();
  await dispatch(load_food(response));
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
    default:
      return state;
  }
};

export default reducer;
