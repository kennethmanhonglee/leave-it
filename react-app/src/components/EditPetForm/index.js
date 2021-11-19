import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory, useParams } from "react-router-dom";

import { edit_pet_thunk } from "../../store/pet";
import styles from "./EditPetForm.module.css";

const EditPetForm = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const { pet_id } = useParams();
  const pets = useSelector((state) => state.pets);
  const currentUser = useSelector((state) => state.session.user);
  let current_pet;
  if (Object.values(pets).length > 0 && currentUser) {
    if (pets[pet_id]) {
      current_pet = pets[pet_id];
    } else {
      history.push("/home");
    }
  }

  if (currentUser && Object.values(pets).length === 0) history.push("/home");

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

  const [name, setName] = useState(current_pet?.name);
  const [current_weight, setCurrentWeight] = useState(
    current_pet?.current_weight
  );
  const [ideal_weight, setIdealWeight] = useState(current_pet?.ideal_weight);
  const [goal, setGoal] = useState(current_pet?.goal);
  const [errors, setErrors] = useState();
  // for editing image
  const [image, setImage] = useState();
  const [imagePreview, setImagePreview] = useState(current_pet?.image_url);
  const [imageLoading, setImageLoading] = useState(false);
  const [hasPic, setHasPic] = useState(current_pet?.image_url ? true : false);
  const upload_label = useRef();

  const updateImage = (e) => {
    const file = e.target.files[0];
    setImage(file);
    setHasPic(true);
  };

  const clickedUpload = () => {
    upload_label.current.click();
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
  const updateGoal = (e) => setGoal(e.target.value);
  const updateCurrentWeight = (e) => setCurrentWeight(e.target.value);
  const updateIdealWeight = (e) => setIdealWeight(e.target.value);

  const isEmptyForm = () => {
    if (!name || !goal || !current_weight || !ideal_weight) return true;
    return false;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    // call thunk and make request
    const newPetData = new FormData();
    newPetData.append("name", name);
    newPetData.append("current_weight", current_weight);
    newPetData.append("ideal_weight", ideal_weight);
    newPetData.append("goal", goal);
    newPetData.append("image", image);
    newPetData.append("hasPic", hasPic);
    setImageLoading(true);
    console.log(newPetData);
    const data = await dispatch(edit_pet_thunk({ pet_id, newPetData }));
    if (data) {
      setErrors(data);
    } else {
      return history.goBack();
    }
  };

  if (!current_pet) return null;
  else {
    return (
      <div className={styles.container}>
        <form onSubmit={handleSubmit} className={styles.form}>
          <div>
            <h2 className={styles.header}>Edit {current_pet?.name}</h2>
          </div>
          <div className={styles.pic_upload}>
            <label
              className={styles.upload_label}
              htmlFor="pet_image_upload"
              ref={upload_label}
            ></label>
            <input
              type="file"
              accept="image/*"
              id="pet_image_upload"
              onChange={updateImage}
            ></input>
            {imagePreview ? (
              <div
                className={styles.upload_button}
                style={{
                  backgroundImage: `url(${imagePreview})`,
                }}
                onClick={clickedUpload}
              >
                <div className={styles.image_foreground}></div>
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
            <input
              type="text"
              placeholder="Name"
              onChange={updateName}
              value={name}
              className={styles.input}
            ></input>
            {errors && <div className={styles.errors}>{errors["name"]}</div>}
          </div>
          <div>
            <select
              value={goal}
              onChange={updateGoal}
              className={styles.select}
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
            <input
              type="number"
              min="0"
              placeholder="Current Weight in Kilograms"
              onChange={updateCurrentWeight}
              value={current_weight}
              className={styles.number}
            ></input>
            {errors && (
              <div className={styles.errors}>{errors["current_weight"]}</div>
            )}
          </div>
          <div>
            <input
              type="number"
              min="0"
              placeholder="Ideal Weight in Kilograms"
              onChange={updateIdealWeight}
              value={ideal_weight}
              className={styles.number}
            ></input>
            {errors && (
              <div className={styles.errors}>{errors["ideal_weight"]}</div>
            )}
          </div>
          <button
            disabled={isEmptyForm()}
            type="submit"
            className={`${styles.button} ${isEmptyForm() ? styles.grey : null}`}
          >
            Edit {current_pet.name}
          </button>
          {imageLoading && <p className={styles.loading}>Loading...</p>}
        </form>
      </div>
    );
  }
};

export default EditPetForm;
