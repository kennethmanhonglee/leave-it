import { useSelector } from "react-redux";

const PetCards = ({ pet_id }) => {
  const pets = useSelector((state) => state.pets);
  let currentPet;
  if (Object.values(pets).length > 0) {
    currentPet = pets[+pet_id];
  }
  return pet_id;
};

export default PetCards;
