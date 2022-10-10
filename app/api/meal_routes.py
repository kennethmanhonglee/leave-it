from datetime import datetime

from flask import Blueprint, request
from flask_login import current_user, login_required

from app.models import Food, Meal, Pet, db

meal_routes = Blueprint("meals", __name__)


@meal_routes.route("", methods=["POST"])
@login_required
def create_meal():
    """
    take the food_id and pet_id to make a meal in db, so we can show later.
    uses request.get_json() since the data was sent as json
    """
    user_id = current_user.get_id()
    food_id = request.get_json()["food_id"]
    pet_id = request.get_json()["pet_id"]
    serving_size = request.get_json()["serving_size"]
    calories = request.get_json()["calories"]
    food = Food.query.get(food_id)
    pet = Pet.query.get(pet_id)
    if not food:
        return {"ok": False, "errors": "This food does not exist."}
    if not pet:
        return {"ok": False, "errors": "This pet does not exist."}
    if int(serving_size) > 500 or int(serving_size) < 0:
        return {
            "ok": False,
            "errors": f"Serving size for {food.food_name} must be less than 500g.",
        }

    new_meal = Meal(
        user_id=user_id,
        pet_id=pet_id,
        food_id=food_id,
        serving_size=serving_size,
        calories=calories,
        created_at=datetime.today(),
    )
    db.session.add(new_meal)
    db.session.commit()

    return new_meal.to_dict()


@meal_routes.route("/today")
@login_required
def get_today_meals():
    user_id = current_user.get_id()
    all_user_meals_today = Meal.query.filter(
        Meal.user_id == user_id, Meal.created_at == datetime.today().date()
    ).all()
    return {meal.id: meal.to_dict() for meal in all_user_meals_today}


@meal_routes.route("/<int:meal_id>", methods=["DELETE"])
@login_required
def delete_meal(meal_id):
    meal_to_delete = Meal.query.get(meal_id)
    if not meal_to_delete:
        return {"ok": False, "errors": "This meal does not exist."}
    db.session.delete(meal_to_delete)
    db.session.commit()

    return {"ok": True, "meal_id": meal_id}
