from flask import Blueprint, request
from flask_login import login_required, current_user
from datetime import datetime

from app.models import db, Meal, Food, Pet

meal_routes = Blueprint('meals', __name__)


@meal_routes.route('')
@login_required
def get_meals():
    '''
    get all meals made by this user on ALL days
    '''
    user_id = current_user.get_id()
    all_user_meals = Meal.query.filter(Meal.user_id == user_id).all()
    print(all_user_meals)

    return 'testing user_meals right now'


@meal_routes.route('', methods=['POST'])
@login_required
def create_meal():
    '''
    take the food_id and pet_id to make a meal in db, so we can show later.
    uses request.get_json() since the data was sent as json
    '''
    food_id = request.get_json()['food_id']
    pet_id = request.get_json()['pet_id']
    food = Food.query.get(food_id)
    pet = Pet.query.get(food_id)
    if not food:
        return {'ok': False, 'errors': 'This food does not exist.'}
    if not pet:
        return {'ok': False, 'errors': 'This pet does not exist.'}

    new_meal = Meal(
        pet_id=pet_id,
        food_id=food_id,
        created_at=datetime.now()
    )
    db.session.add(new_meal)
    db.session.commit()

    return new_meal.to_dict()
