import React, { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory, useParams } from 'react-router-dom';

import { editPetThunk } from '../../store/pet';
import styles from './EditPetForm.module.css';

function EditPetForm() {
  const dispatch = useDispatch();
  const history = useHistory();
  const { petId } = useParams();
  const pets = useSelector((state) => state.pets);
  const currentUser = useSelector((state) => state.session.user);
  let currentPet;
  if (Object.values(pets).length > 0 && currentUser) {
    if (pets[petId]) {
      currentPet = pets[petId];
    } else {
      history.push('/errors');
    }
  }

  if (currentUser && Object.values(pets).length === 0) history.push('/home');

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

  const [name, setName] = useState(currentPet?.name);
  const [unit, setUnit] = useState(currentPet?.unit);
  const [currentWeight, setCurrentWeight] = useState(currentPet?.currentWeight);
  const [idealWeight, setIdealWeight] = useState(currentPet?.idealWeight);
  const [goal, setGoal] = useState(currentPet?.goal);
  const [errors, setErrors] = useState();
  // for editing image
  const [image, setImage] = useState();
  const [imagePreview, setImagePreview] = useState(currentPet?.image_url);
  const [imageLoading, setImageLoading] = useState(false);
  const [hasPic, setHasPic] = useState(!!currentPet?.image_url);
  const uploadLabel = useRef();

  const updateImage = (e) => {
    const file = e.target.files[0];
    setImage(file);
    setHasPic(true);
  };

  const clickedUpload = () => {
    uploadLabel.current.click();
  };

  const removePicture = () => {
    setImagePreview(null);
    setImage(null);
    setHasPic(false);
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
    } else if (imagePreview) {
      setImagePreview(imagePreview);
    } else {
      setImagePreview(null);
    }
  }, [image]);

  const updateName = (e) => setName(e.target.value);
  const updateUnit = (e) => setUnit(e.target.value);
  const updateGoal = (e) => setGoal(e.target.value);
  const updateCurrentWeight = (e) => setCurrentWeight(e.target.value);
  const updateIdealWeight = (e) => setIdealWeight(e.target.value);

  const isEmptyForm = () => {
    if (!name || !goal || !currentWeight || !idealWeight || !unit) return true;
    return false;
  };

  const handleSubmit = async (e) => { //eslint-disable-line
    e.preventDefault();
    // call thunk and make request
    const newPetData = new FormData();
    newPetData.append('name', name);
    newPetData.append('unit', unit);
    newPetData.append('currentWeight', currentWeight);
    newPetData.append('idealWeight', idealWeight);
    newPetData.append('goal', goal);
    newPetData.append('image', image);
    newPetData.append('hasPic', hasPic);
    setImageLoading(true);
    const data = await dispatch(editPetThunk({ petId, newPetData }));
    if (data) {
      setErrors(data);
    } else {
      return history.goBack();
    }
  };

  const clickedCancel = (e) => {
    e.preventDefault();
    return history.goBack();
  };

  if (!currentPet) return null;

  return (
    <div className={styles.container}>
      <form onSubmit={handleSubmit} className={styles.form}>
        <div>
          <h2 className={styles.header}>
            Edit
            {currentPet?.name}
          </h2>
        </div>
        <div className={styles.pic_upload}>
          <label className={styles.uploadLabel} htmlFor="pet_image_upload" ref={uploadLabel} />
          <input type="file" accept="image/*" id="pet_image_upload" onChange={updateImage} />
          {imagePreview ? (
            <div
              className={styles.upload_button}
              style={{
                backgroundImage: `url(${imagePreview})`,
              }}
              onClick={clickedUpload}
            >
              <div className={styles.image_foreground} />
            </div>
          ) : (
            <div className={styles.upload_button} onClick={clickedUpload}>
              <h2>Add an image</h2>
            </div>
          )}
          {imagePreview && (
          <div onClick={removePicture} className={styles.remove_picture}>
            Remove Picture
          </div>
          )}
        </div>
        <div>
          <label className={styles.labels} htmlFor="name">
            Name
          </label>
          <input id="name" type="text" onChange={updateName} value={name} className={styles.input} />
          {errors && <div className={styles.errors}>{errors.name}</div>}
        </div>
        <div>
          <label className={styles.labels} htmlFor="goal">
            Goal
          </label>
          <select id="goal" value={goal} onChange={updateGoal} className={styles.select}>
            {acceptedGoals.map((acceptedGoal) => (
              <option key={acceptedGoal} value={acceptedGoal}>
                {acceptedGoal}
              </option>
            ))}
          </select>
          {errors && <div className={styles.errors}>{errors.goal}</div>}
        </div>
        <div>
          <label className={styles.labels} htmlFor="unit">
            Preferred Unit
          </label>
          <select id="unit" value={unit} onChange={updateUnit} className={styles.select}>
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
            id="curr_weight"
            type="number"
            min="0"
            onChange={updateCurrentWeight}
            value={currentWeight}
            className={styles.number}
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
            id="idealWeight"
            type="number"
            min="0"
            onChange={updateIdealWeight}
            value={idealWeight}
            className={styles.number}
          />
          {errors && <div className={styles.errors}>{errors.idealWeight}</div>}
        </div>
        <button
          disabled={isEmptyForm()}
          type="submit"
          className={`${styles.button} ${isEmptyForm() ? styles.grey : null}`}
        >
          Edit
          {' '}
          {currentPet.name}
        </button>
        <button type="button" className={`${styles.button} ${styles.cancel_button}`} onClick={clickedCancel}>
          Cancel
        </button>
        {imageLoading && <p className={styles.loading}>Loading...</p>}
      </form>
    </div>
  );
}

export default EditPetForm;
