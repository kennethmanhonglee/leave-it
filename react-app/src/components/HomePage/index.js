import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import styles from "./HomePage.module.css";
import { get_pets_thunk } from "../../store/pet";
import MealTracker from "../MealTracker";

const HomePage = () => {
  const dispatch = useDispatch();
  const pets = useSelector((state) => state.pets);
  const currentUser = useSelector((state) => state.session.user);
  useEffect(() => {
    dispatch(get_pets_thunk());
  }, []);

  useEffect(() => {
    
  })

  return (
    <div className={styles.home_page}>
      <h1>Welcome back, {currentUser.firstname}</h1>
      {Object.values(pets).length > 0 ? (
        <div className={styles.meal_trackers}>
          {Object.values(pets).map((pet) => (
            <MealTracker key={pet.id} pet_id={pet.id} />
          ))}
        </div>
      ) : (
        <h1>Create a pet!</h1>
      )}
    </div>
  );
};

export default HomePage;
