from flask import Blueprint, request
from flask_login import login_required, current_user
from datetime import datetime

from app.forms import CreateFoodForm
from app.models import db, Food

food_routes = Blueprint('foods', __name__)


@food_routes.route('')
@login_required
def get_foods():
    '''
    GET /api/foods will return all food entries in the database
    '''
    user_id = current_user.get_id()
    # foods = Food.query.filter(Food.user_id == user_id)
    # use above line to only show food that user made. save for later when we have a search feature for food

    # for now, load all food into redux store
    
    return {food.id: food.to_dict() for food in foods}


@food_routes.route('', methods=['POST'])
@login_required
def create_food():
    '''
    Take in data from form and create a food entry
    '''
    form = CreateFoodForm()
    user_id = current_user.get_id()
    form['csrf_token'].data = request.cookies['csrf_token']
    if (form.validate_on_submit()):
        new_food = Food(
            user_id=user_id,
            food_name=form.data['food_name'],
            food_type=form.data['food_type'],
            serving_size=form.data['serving_size'],
            calories=form.data['calories'],
            created_at=datetime.today()
        )
        db.session.add(new_food)
        db.session.commit()
        return new_food.to_dict()
    else:
        return {'ok': False, 'errors': form.errors}
