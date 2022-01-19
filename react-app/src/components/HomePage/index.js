import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";

import styles from "./HomePage.module.css";
import { get_pets_thunk } from "../../store/pet";
import { load_meals_thunk } from "../../store/meal";
import PetCard from "./PetCard";
import UserCard from "./UserCard";

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
      <div className={styles.user_container}>
        <UserCard user={currentUser} petsCount={Object.values(pets).length} />
      </div>
      <div className={styles.container}>
        <div className={styles.greetings}>
          <h1>Welcome back, {currentUser.firstname}</h1>
          <h1>{date.toLocaleDateString("en-US", date_options)}</h1>
        </div>
        {Object.values(pets).length > 0 ? (
          <div className={styles.pet_cards}>
            {Object.values(pets).map((pet) => (
              <PetCard key={pet.id} pet_id={pet.id} />
            ))}
          </div>
        ) : (
          <Link className={styles.create_link} to="/add_a_pet">
            Create a Pet!
          </Link>
        )}
      </div>
    </div>
  );
};

export default HomePage;
