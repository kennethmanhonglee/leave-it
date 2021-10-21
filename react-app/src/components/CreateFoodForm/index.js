import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";

const CreateFoodForm = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const currentUser = useSelector((state) => state.session.user);

  const [food_name, setFood_name] = useState("");
  const [food_type, setFood_type] = useState("");
  const [calories, setCalories] = useState(0);
  const [serving_size, setServing_size] = useState(0);

  const updateFoodName = (e) => setFood_name(e.target.value);
  const updateFoodType = (e) => setFood_type(e.target.value);
  const updateCalories = (e) => setCalories(e.target.value);
  const updateServingSize = (e) => setServing_size(e.target.value);

  const handleSubmit = (e) => {
    e.preventDefault();
    const new_food = {
      user_id: currentUser.id,
      food_name,
      food_type,
      calories,
    };

    console.log(new_food);
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label htmlFor="food_name">Food Name</label>
        <input
          id="food_name"
          type="text"
          placeholder="Food"
          onChange={updateFoodName}
          value={food_name}
        ></input>
      </div>
      <div>
        <label htmlFor="food_type">Food Type</label>
        <select id="food_type" onChange={updateFoodType} value={food_type}>
          <option value={1}>Kibbles</option>
          <option value={2}>Fresh Food</option>
          <option value={3}>Raw Meat</option>
          <option value={4}>Others</option>
        </select>
      </div>
      <div>
        <label htmlFor="serving_size">Serving Size in Grams</label>
        <input
          type="number"
          id="serving_size"
          placeholder="Serving Size in Grams"
          onChange={updateServingSize}
          value={serving_size}
        ></input>
      </div>
      <div>
        <label htmlFor="calories">Calories</label>
        <input
          type="number"
          id="calories"
          placeholder="calories"
          onChange={updateCalories}
          value={calories}
        ></input>
      </div>
      <button type="submit">Submit</button>
    </form>
  );
};

export default CreateFoodForm;
