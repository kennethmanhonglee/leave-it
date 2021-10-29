import { useState } from "react";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";

import { create_food_thunk } from "../../store/food";
import styles from "./CreateFoodForm.module.css";

const CreateFoodForm = () => {
  const dispatch = useDispatch();
  const history = useHistory();

  const [food_name, setFood_name] = useState("");
  const [food_type, setFood_type] = useState("Kibbles");
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

  const isEmptyForm = () => {
    if (!food_name || !calories || !serving_size) return true;
    return false;
  };

  return (
    <div className={styles.container}>
      <form onSubmit={handleSubmit} className={styles.form}>
        <h2 className={styles.header}>Create a food</h2>
        <div>
          <label htmlFor="food_name">Food Name</label>
          <input
            id="food_name"
            type="text"
            placeholder="Food"
            onChange={updateFoodName}
            value={food_name}
            className={styles.input}
          ></input>
          {errors && errors["food_name"] && (
            <div className={styles.errors}>{errors["food_name"]}</div>
          )}
        </div>
        <div>
          <label htmlFor="food_type">Food Type</label>
          <select
            id="food_type"
            onChange={updateFoodType}
            value={food_type}
            className={styles.select}
          >
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
          {errors && errors["food_type"] && (
            <div className={styles.errors}>{errors["food_type"]}</div>
          )}
        </div>
        <div>
          <label htmlFor="serving_size">Serving Size in Grams</label>
          <input
            type="number"
            id="serving_size"
            placeholder="Serving Size in Grams"
            onChange={updateServingSize}
            value={serving_size}
            className={styles.number}
          ></input>
          {errors && errors["serving_size"] && (
            <div className={styles.errors}>{errors["serving_size"]}</div>
          )}
        </div>
        <div>
          <label htmlFor="calories">Calories</label>
          <input
            type="number"
            id="calories"
            placeholder="calories"
            onChange={updateCalories}
            value={calories}
            className={styles.number}
          ></input>
          {errors && errors["calories"] && (
            <div className={styles.errors}>{errors["calories"]}</div>
          )}
        </div>
        <button
          type="submit"
          disabled={isEmptyForm()}
          className={`${styles.button} ${isEmptyForm() ? styles.grey : null}`}
        >
          Submit
        </button>
      </form>
    </div>
  );
};

export default CreateFoodForm;
