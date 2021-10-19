from flask import Blueprint, request
from flask_login import login_required, current_user

from app.forms import PetForm
from app.models import db, Pet

pet_routes = Blueprint('pets', __name__)


@pet_routes.route('')
def pets():
    # get logged in user, and get all pets that belong to the user
    return 'this is the get pets route! its working!'


@pet_routes.route('', methods=['POST'])
@login_required
def create_pet():
    # take in form data
    user_id = current_user.get_id()
    form = PetForm()
    form['csrf_token'].data = request.cookies['csrf_token']
    if form.validate_on_submit():
        # create a pet with given data
        new_pet = Pet(
            name=form.data['name'],
            user_id=user_id,
            age=form.data['age'],
            current_weight=form.data['current_weight'],
            ideal_weight=form.data['ideal_weight'],
            neutered=form.data['neutered'],
        )
        db.session.add(new_pet)
        db.session.commit()
        return new_pet.to_dict()
    else:
        return {'ok': False, 'errors': form.errors}
