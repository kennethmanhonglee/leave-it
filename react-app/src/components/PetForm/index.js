import { useEffect, useRef, useState } from "react";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router";

import { create_pet_thunk } from "../../store/pet";
import styles from "./PetForm.module.css";

const PetForm = () => {
  const dispatch = useDispatch(null);
  const history = useHistory();
  const [name, setName] = useState();
  const [current_weight, setCurrentWeight] = useState();
  const [ideal_weight, setIdealWeight] = useState();
  const [goal, setGoal] = useState("Neutered Adult");
  const [errors, setErrors] = useState();

  // for picture upload
  const [image, setImage] = useState();
  const [imageLoading, setImageLoading] = useState(false);
  const [imagePreview, setImagePreview] = useState(null);
  const picture_label = useRef();

  const clickedUpload = () => {
    picture_label.current.click();
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

  const ACCEPTED_GOALS = [
    "Neutered Adult",
    "Intact Adult",
    "Inactive/obese prone",
    "Weight Loss",
    "Weight Gain",
    "Active, working dogs",
    "Puppy 0-4 months",
    "Puppy 4 months to adult",
  ];

  const updateName = (e) => setName(e.target.value);
  const updateCurrentWeight = (e) => setCurrentWeight(e.target.value);
  const updateIdealWeight = (e) => setIdealWeight(e.target.value);
  const updateGoal = (e) => setGoal(e.target.value);

  const isEmptyForm = () => {
    if (!name || !current_weight || !ideal_weight) return true;
    return false;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    // call thunk and make request
    const newPet = new FormData();
    newPet.append("name", name);
    newPet.append("current_weight", current_weight);
    newPet.append("ideal_weight", ideal_weight);
    newPet.append("goal", goal);
    newPet.append("image", image);
    setImageLoading(true);
    const data = await dispatch(create_pet_thunk(newPet));
    if (data) {
      setErrors(data);
    } else {
      return history.push("/home");
    }
  };

  const clickedCancel = (e) => {
    e.preventDefault();
    return history.goBack();
  };

  return (
    <div className={styles.container}>
      <form className={styles.form} onSubmit={handleSubmit}>
        <h2 className={styles.header}>Create a pet</h2>
        <div className={styles.pic_upload}>
          <label
            className={styles.upload_label}
            className={styles.labels}
            htmlFor="pet_image_upload"
            ref={picture_label}
          ></label>
          {imagePreview ? (
            <>
              <div
                className={styles.image_preview}
                onClick={clickedUpload}
                style={{
                  backgroundImage: `url(${imagePreview})`,
                }}
              >
                <div className={styles.image_foreground}></div>
              </div>
              <div className={styles.remove_picture} onClick={removePicture}>
                Remove
              </div>
            </>
          ) : (
            <div className={styles.upload_button} onClick={clickedUpload}>
              <h2>Add a picture</h2>
            </div>
          )}
          <input
            type="file"
            accept="image/*"
            id="pet_image_upload"
            onChange={updateImage}
          ></input>
        </div>
        <div>
          <label className={styles.labels} htmlFor="name">
            Name
          </label>
          <input
            type="text"
            placeholder="Name"
            onChange={updateName}
            className={styles.input}
            id="name"
          ></input>
          {errors && <div className={styles.errors}>{errors["name"]}</div>}
        </div>
        <div>
          <label className={styles.labels} htmlFor="goal">
            Goal
          </label>
          <select
            value={goal}
            onChange={updateGoal}
            className={styles.select}
            id="goal"
          >
            {ACCEPTED_GOALS.map((goal) => (
              <option key={goal} value={goal}>
                {goal}
              </option>
            ))}
          </select>
          {errors && <div className={styles.errors}>{errors["goal"]}</div>}
        </div>
        <div>
          <label className={styles.labels} htmlFor="curr_weight">
            Current Weight in Kilograms (kg)
          </label>
          <input
            type="number"
            min="0"
            placeholder="Current Weight in Kilograms"
            onChange={updateCurrentWeight}
            className={styles.number}
            id="curr_weight"
          ></input>
          {errors && (
            <div className={styles.errors}>{errors["current_weight"]}</div>
          )}
        </div>
        <div>
          <label className={styles.labels} htmlFor="ideal_weight">
            Ideal Weight in Kilograms (kg)
          </label>
          <input
            type="number"
            min="0"
            placeholder="Ideal Weight in Kilograms"
            onChange={updateIdealWeight}
            className={styles.number}
            id="ideal_weight"
          ></input>
          {errors && (
            <div className={styles.errors}>{errors["ideal_weight"]}</div>
          )}
        </div>
        <button
          className={`${styles.button} ${isEmptyForm() ? styles.grey : null}`}
          disabled={isEmptyForm()}
          type="submit"
        >
          Add a pet
        </button>
        <button
          className={`${styles.button} ${styles.cancel_button}`}
          onClick={clickedCancel}
        >
          Cancel
        </button>
        {imageLoading && <p className={styles.loading}>Loading...</p>}
      </form>
    </div>
  );
};

export default PetForm;
