from flask import Blueprint, request
from flask_login import login_required, current_user
from datetime import datetime

from app.forms import CreateFoodForm
from app.forms.edit_food_form import EditFoodForm
from app.models import db, Food

food_routes = Blueprint('foods', __name__)


@food_routes.route('')
@login_required
def get_foods():
    '''
    GET /api/foods will return all food entries in the database
    '''
    # user_id = current_user.get_id()
    # foods = Food.query.filter(Food.user_id == user_id)
    # return {food.id: food.to_dict() for food in foods}
    # use above lines to only show food that user made. save for later when we have a search feature for food

    # for now, load all food into redux store
    foods = Food.query.all()
    return {food.id: food.to_dict() for food in foods}


@food_routes.route('', methods=['POST'])
@login_required
def create_food():
    '''
    Take in data from form and create a food entry
    '''
    form = CreateFoodForm()
    user_id = current_user.get_id()
    print('\n\n\n', form.data, '\n\n\n')
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


@food_routes.route('/<int:food_id>', methods=['PUT'])
@login_required
def edit_food(food_id):
    '''
    Take in data from form and edit a food entry with it
    '''
    food_to_edit = Food.query.get(food_id)
    if not food_to_edit:
        return {'ok': False, 'errors': 'This food does not exist.'}

    form = EditFoodForm()
    form['csrf_token'].data = request.cookies['csrf_token']
    if (form.validate_on_submit()):
        food_to_edit.food_name = form.data['food_name']
        food_to_edit.food_type = form.data['food_type']
        food_to_edit.serving_size = form.data['serving_size']
        food_to_edit.calories = form.data['calories']
        food_to_edit.created_at = datetime.today()

        db.session.commit()
        return {'ok': True, 'food': food_to_edit.to_dict()}
    else:
        return {'ok': False, 'errors': form.errors}


@food_routes.route('/<int:food_id>', methods=['DELETE'])
@login_required
def delete_food(food_id):
    '''
    Query for food to delete, and delete it
    '''
    food_to_delete = Food.query.get(food_id)
    if not food_to_delete:
        return {'ok': False, 'errors': 'This food does not exists.'}
    db.session.delete(food_to_delete)
    db.session.commit()
    return {'ok': True, 'food_id': food_id}
