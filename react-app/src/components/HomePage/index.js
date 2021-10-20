import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import { get_pets_thunk } from "../../store/pet";
import { isSelected } from "../../utils";

const HomePage = () => {
  const dispatch = useDispatch();
  const pets = useSelector((state) => state.pets);
  const currentUser = useSelector((state) => state.session.user);
  useEffect(() => {
    // IIFE to load pets to state
    console.log("HELLO?");
    dispatch(get_pets_thunk());
  }, []);

  return (
    <>
      <h1>home page</h1>
      {currentUser && <h1>{currentUser.firstname}</h1>}
      {pets && console.log(pets)}
    </>
  );
};

export default HomePage;
