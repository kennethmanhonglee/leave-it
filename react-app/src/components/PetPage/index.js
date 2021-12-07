import { useDispatch, useSelector } from "react-redux";
import { useHistory, useParams } from "react-router";

import MealTracker from "../MealTracker";
import styles from "./PetPage.module.css";
import default_dog from "../../assets/images/default_dog.png";
import { delete_pet_thunk } from "../../store/pet";

const PetPage = () => {
  const { pet_id } = useParams();
  const history = useHistory();
  const dispatch = useDispatch();
  const pets = useSelector((state) => state.pets);
  let current_pet;
  if (Object.values(pets).length > 0) {
    current_pet = pets[+pet_id];
  }

  const delete_pet = async () => {
    const result = await dispatch(delete_pet_thunk(pet_id));
    if (result) return history.push("/home");
  };

  if (!current_pet) return null;
  return (
    <div className={styles.pet_page}>
      <div className={styles.pet_info}>
        <div
          className={styles.pet_image}
          style={{
            backgroundImage: `url(${
              current_pet.image_url ? current_pet.image_url : default_dog
            })`,
          }}
        ></div>
        <div className={styles.header}>
          <div className={styles.name_and_utils}>
            <h1 className={styles.pet_name}>{current_pet.name}</h1>
            <div className={styles.util_div}>
              <div
                className={styles.editing_div}
                onClick={() => history.push(`/edit_pet/${pet_id}`)}
              >
                <button>Edit</button>
              </div>
              <div className={styles.deleting_div} onClick={delete_pet}>
                {/* show modal later on */}
                <button>Delete</button>
              </div>
            </div>
          </div>
          <h2 className={styles.stats}>
            Goal: <span>{current_pet.goal} </span>
          </h2>
          <h2 className={styles.stats}>
            Current Weight:{" "}
            <span>
              {current_pet.current_weight}
              {current_pet.unit}{" "}
            </span>
          </h2>
          <h2 className={styles.stats}>
            Ideal Weight:{" "}
            <span>
              {current_pet.ideal_weight}
              {current_pet.unit}{" "}
            </span>
          </h2>
        </div>
      </div>
      <MealTracker pet_id={pet_id} />
    </div>
  );
};

export default PetPage;
