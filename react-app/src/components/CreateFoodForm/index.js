import { useState } from "react";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import { create_food_thunk } from "../../store/food";

const CreateFoodForm = () => {
  const dispatch = useDispatch();
  const history = useHistory();

  const [food_name, setFood_name] = useState("");
  const [food_type, setFood_type] = useState("kibbles");
  const [calories, setCalories] = useState(0);
  const [serving_size, setServing_size] = useState(0);
  const [errors, setErrors] = useState();

  const updateFoodName = (e) => setFood_name(e.target.value);
  const updateFoodType = (e) => setFood_type(e.target.value);
  const updateCalories = (e) => setCalories(e.target.value);
  const updateServingSize = (e) => setServing_size(e.target.value);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const new_food = {
      food_name,
      food_type,
      calories,
      serving_size,
    };

    const data = await dispatch(create_food_thunk(new_food));
    if (data.errors) {
      setErrors(data.errors);
    } else {
      // if modal, close modal
      // not yet modal, so we redirect to food page
      // history.push("/add_food");
      history.goBack();
    }
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
        {errors && errors["food_name"] && <h2>{errors["food_name"]}</h2>}
      </div>
      <div>
        <label htmlFor="food_type">Food Type</label>
        <select id="food_type" onChange={updateFoodType} value={food_type}>
          <option onSelect={updateFoodType} value={"Kibbles"}>
            Kibbles
          </option>
          <option onSelect={updateFoodType} value={"Fresh Food"}>
            Fresh Food
          </option>
          <option onSelect={updateFoodType} value={"Raw Meat"}>
            Raw Meat
          </option>
          <option onSelect={updateFoodType} value={"Others"}>
            Others
          </option>
        </select>
        {errors && errors["food_type"] && <h2>{errors["food_type"]}</h2>}
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
        {errors && errors["serving_size"] && <h2>{errors["serving_size"]}</h2>}
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
        {errors && errors["calories"] && <h2>{errors["calories"]}</h2>}
      </div>
      <button type="submit">Submit</button>
    </form>
  );
};

export default CreateFoodForm;
