import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import { get_pets_thunk } from "../../store/pet";
import MealTracker from "../MealTracker";

const HomePage = () => {
  const dispatch = useDispatch();
  const pets = useSelector((state) => state.pets);
  const currentUser = useSelector((state) => state.session.user);
  useEffect(() => {
    dispatch(get_pets_thunk());
  }, []);

  return (
    <>
      <h1>Welcome back</h1>
      {currentUser && <h1>{currentUser.firstname}</h1>}
      {pets &&
        Object.values(pets).map((pet) => <MealTracker pet_id={pet.id} />)}
    </>
  );
};

export default HomePage;
