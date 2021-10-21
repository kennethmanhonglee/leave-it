from flask import Blueprint
from flask_login import login_required, current_user

from app.models import db, Food

food_routes = Blueprint('foods', __name__)


@food_routes.route('')
@login_required
def get_foods():
    '''
    GET /api/foods will return all food entries in the database
    '''
    foods = Food.query.all()
    return {food.id: food for food in foods}


@food_routes.route('', methods=['POST'])
@login_required
def create_food():
    '''
    Take in data from form and create a food entry
    '''
    print('we are at the create route for foods')
    pass
