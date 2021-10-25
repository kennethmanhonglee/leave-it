import { useSelector } from "react-redux";

const MealEntry = ({ meal }) => {
  const foods = useSelector((state) => state.foods);
  let currentFood;
  if (foods) {
    currentFood = foods[meal.food_id];
  }
  console.log(currentFood);
  if (!currentFood) return null;
  return (
    <div>
      this is one food entry:
      {currentFood && currentFood.food_name}
    </div>
  );
};

export default MealEntry;
