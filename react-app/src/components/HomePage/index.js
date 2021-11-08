import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import styles from "./HomePage.module.css";
import { get_pets_thunk } from "../../store/pet";
import MealTracker from "../MealTracker";
import { load_meals_thunk } from "../../store/meal";
import PetCards from "../PetCards";

const HomePage = () => {
  const dispatch = useDispatch();
  const pets = useSelector((state) => state.pets);
  const currentUser = useSelector((state) => state.session.user);
  useEffect(() => {
    dispatch(get_pets_thunk());
    // call thunk to load all meals from today
    dispatch(load_meals_thunk());
  }, [dispatch]);

  const date = new Date();
  const date_options = {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  };

  return (
    <div className={styles.home_page}>
      <div className={styles.greetings}>
        <h1>Welcome back, {currentUser.firstname}</h1>
        <h1>{date.toLocaleDateString("en-US", date_options)}</h1>
      </div>
      {Object.values(pets).length > 0 ? (
        <div className={styles.meal_trackers}>
          {Object.values(pets).map((pet) => (
            <PetCards key={pet.id} pet_id={pet.id} />
          ))}
        </div>
      ) : (
        <h1>Create a pet!</h1>
      )}
    </div>
  );
};

export default HomePage;
