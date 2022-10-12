import React, { useEffect, useRef, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';

import { createPetThunk } from '../../store/pet';
import styles from './PetForm.module.css';

function PetForm() {
  const dispatch = useDispatch(null);
  const history = useHistory();
  const [name, setName] = useState();
  const [unit, setUnit] = useState('kg');
  const [currentWeight, setCurrentWeight] = useState();
  const [idealWeight, setIdealWeight] = useState();
  const [goal, setGoal] = useState('Neutered Adult');
  const [errors, setErrors] = useState();

  // for picture upload
  const [image, setImage] = useState();
  const [imageLoading, setImageLoading] = useState(false);
  const [imagePreview, setImagePreview] = useState(null);
  const pictureLabel = useRef();

  const clickedUpload = () => {
    pictureLabel.current.click();
  };

  const updateImage = (e) => {
    const file = e.target.files[0];
    setImage(file);
  };

  const removePicture = () => {
    setImagePreview(null);
    setImage(null);
  };

  useEffect(() => {
    if (image) {
      const reader = new FileReader();
      // setting the event listener that runs after reading is done
      reader.onload = () => {
        setImagePreview(reader.result);
      };
      // reading the image file as a data url, to render later
      reader.readAsDataURL(image);
    } else {
      setImagePreview(null);
    }
  }, [image]);

  const acceptedGoals = [
    'Neutered Adult',
    'Intact Adult',
    'Inactive/obese prone',
    'Weight Loss',
    'Weight Gain',
    'Active, working dogs',
    'Puppy 0-4 months',
    'Puppy 4 months to adult',
  ];

  const acceptedUnits = ['kg', 'lb'];

  const updateName = (e) => setName(e.target.value);
  const updateUnit = (e) => setUnit(e.target.value);
  const updateCurrentWeight = (e) => setCurrentWeight(e.target.value);
  const updateIdealWeight = (e) => setIdealWeight(e.target.value);
  const updateGoal = (e) => setGoal(e.target.value);

  const isEmptyForm = () => {
    if (!name || !currentWeight || !idealWeight || !unit) return true;
    return false;
  };

  const handleSubmit = async (e) => { // eslint-disable-line
    e.preventDefault();
    // call thunk and make request
    const newPet = new FormData();
    newPet.append('name', name);
    newPet.append('unit', unit);
    newPet.append('currentWeight', currentWeight);
    newPet.append('idealWeight', idealWeight);
    newPet.append('goal', goal);
    newPet.append('image', image);
    setImageLoading(true);
    const data = await dispatch(createPetThunk(newPet));
    if (data) {
      setErrors(data);
      setImageLoading(false);
    } else {
      return history.push('/home');
    }
  };

  const clickedCancel = (e) => {
    e.preventDefault();
    return history.goBack();
  };

  return (
    <div className={styles.container}>
      <form className={styles.form} onSubmit={handleSubmit} autoComplete="off">
        <h2 className={styles.header}>Create a pet</h2>
        <div className={styles.pic_upload}>
          <label
            className={`${styles.uploadLabel} ${styles.labels}`}
            htmlFor="pet_image_upload"
            ref={pictureLabel}
          />
          {imagePreview ? (
            <>
              <div
                className={styles.image_preview}
                onClick={clickedUpload}
                style={{
                  backgroundImage: `url(${imagePreview})`,
                }}
              >
                <div className={styles.image_foreground} />
              </div>
              <div
                className={styles.remove_picture}
                onClick={removePicture}
              >
                Remove
              </div>
            </>
          ) : (
            <div
              className={styles.upload_button}
              onClick={clickedUpload}
            >
              <h2>Add a picture</h2>
            </div>
          )}
          <input type="file" accept="image/*" id="pet_image_upload" onChange={updateImage} />
        </div>
        <div>
          <label className={styles.labels} htmlFor="name">
            Name
          </label>
          <input type="text" onChange={updateName} className={styles.input} id="name" />
          {errors && <div className={styles.errors}>{errors.name}</div>}
        </div>
        <div>
          <label className={styles.labels} htmlFor="goal">
            Goal
          </label>
          <select value={goal} onChange={updateGoal} className={styles.select} id="goal">
            {acceptedGoals.map((acceptedGoal) => (
              <option key={acceptedGoal} value={acceptedGoal}>
                {acceptedGoal}
              </option>
            ))}
          </select>
          {errors && <div className={styles.errors}>{errors.goal}</div>}
        </div>
        <div>
          <label className={styles.labels} htmlFor="goal">
            Preferred Units
          </label>
          <select value={unit} onChange={updateUnit} className={styles.select} id="unit">
            {acceptedUnits.map((acceptedUnit) => (
              <option key={acceptedUnit} value={acceptedUnit}>
                {acceptedUnit}
              </option>
            ))}
          </select>
          {errors && <div className={styles.errors}>{errors.unit}</div>}
        </div>
        <div>
          <label className={styles.labels} htmlFor="curr_weight">
            Current Weight in
            {' '}
            {unit}
          </label>
          <input
            type="number"
            min="0"
            onChange={updateCurrentWeight}
            className={styles.number}
            id="curr_weight"
          />
          {errors && <div className={styles.errors}>{errors.currentWeight}</div>}
        </div>
        <div>
          <label className={styles.labels} htmlFor="idealWeight">
            Ideal Weight in
            {' '}
            {unit}
          </label>
          <input
            type="number"
            min="0"
            onChange={updateIdealWeight}
            className={styles.number}
            id="idealWeight"
          />
          {errors && <div className={styles.errors}>{errors.idealWeight}</div>}
        </div>
        <button
          className={`${styles.button} ${isEmptyForm() ? styles.grey : null}`}
          disabled={isEmptyForm()}
          type="submit"
        >
          Add a pet
        </button>
        <button type="button" className={`${styles.button} ${styles.cancel_button}`} onClick={clickedCancel}>
          Cancel
        </button>
        {imageLoading && <p className={styles.loading}>Loading...</p>}
      </form>
    </div>
  );
}

export default PetForm;
