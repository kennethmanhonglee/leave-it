// constants
const CREATE_FOOD = "food/CREATE_FOOD";

// actions
const create_food = (food) => ({
  type: CREATE_FOOD,
  payload: food,
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

// reducer
const initialState = {};
const reducer = (state = initialState, action) => {
  let newState = Object.assign({}, state);
  switch (action.type) {
    case CREATE_FOOD:
      newState[action.payload.id] = action.payload;
      return newState;
    default:
      return state;
  }
};

export default reducer;
