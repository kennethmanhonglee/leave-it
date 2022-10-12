import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

import styles from './HomePage.module.css';
import { getPetsThunk } from '../../store/pet';
import { loadMealsThunk } from '../../store/meal';
import PetCard from './PetCard';

function HomePage() {
  const dispatch = useDispatch();
  const pets = useSelector((state) => state.pets);
  const currentUser = useSelector((state) => state.session.user);
  useEffect(() => {
    dispatch(getPetsThunk());
    // call thunk to load all meals from today
    dispatch(loadMealsThunk());
  }, [dispatch]);

  const date = new Date();
  const dateOptions = {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  };

  return (
    <div className={styles.home_page}>
      <div className={styles.container}>
        <div className={styles.greetings}>
          <h1>
            Welcome back,
            {currentUser.firstname}
          </h1>
          <h1>{date.toLocaleDateString('en-US', dateOptions)}</h1>
        </div>
        {Object.values(pets).length > 0 ? (
          <div className={styles.pet_cards}>
            {Object.values(pets).map((pet) => (
              <PetCard key={pet.id} petId={pet.id} />
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
}

export default HomePage;
