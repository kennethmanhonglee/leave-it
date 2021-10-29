from flask import Blueprint, request
from flask_login import login_required, current_user
from datetime import datetime

from app.forms import PetForm
from app.models import db, Pet, PetWeight
from app.api.auth_routes import validation_errors_to_error_messages

pet_routes = Blueprint('pets', __name__)


@pet_routes.route('')
@login_required
def pets():
    '''
    Returns all pets that belong to the currently logged in user.
    '''
    user_id = current_user.get_id()
    all_pets_for_user = Pet.query.filter(Pet.user_id == user_id).all()
    return {pet.id: pet.to_dict()for pet in all_pets_for_user}


@pet_routes.route('', methods=['POST'])
@login_required
def create_pet():
    # take in form data
    user_id = current_user.get_id()
    form = PetForm()
    form['csrf_token'].data = request.cookies['csrf_token']
    if form.validate_on_submit():
        existing_pet = Pet.query.filter(
            Pet.name == form.data['name'], Pet.user_id == user_id).first()
        if existing_pet:
            return {'ok': False, 'errors': ['Pet already exists.']}

        # create a pet with given data
        new_pet = Pet(
            name=form.data['name'],
            user_id=user_id,
            goal=form.data['goal'],
            current_weight=form.data['current_weight'],
            ideal_weight=form.data['ideal_weight'],
        )
        db.session.add(new_pet)
        db.session.commit()
        new_pet_weight = PetWeight(
            pet_id=new_pet.id,
            weight=new_pet.current_weight,
            created_at=datetime.today()
        )
        db.session.add(new_pet_weight)
        db.session.commit()
        return new_pet.to_dict()
    else:
        return {'ok': False, 'errors': form.errors}, 401


@pet_routes.route('/<int:pet_id>', methods=['PUT'])
@login_required
def edit_pet(pet_id):
    # take in form data
    user_id = current_user.get_id()
    form = PetForm()
    form['csrf_token'].data = request.cookies['csrf_token']
    if form.validate_on_submit():
        existing_pet = Pet.query.get(pet_id)
        if not existing_pet:
            return {'ok': False, 'errors': ['Pet does not exist.']}

        # create a pet with given data
        existing_pet.name = form.data['name']
        existing_pet.goal = form.data['goal']
        existing_pet.current_weight = form.data['current_weight']
        existing_pet.ideal_weight = form.data['ideal_weight']
        db.session.commit()
        new_pet_weight = PetWeight(
            pet_id=existing_pet.id,
            weight=existing_pet.current_weight,
            created_at=datetime.today()
        )
        db.session.add(new_pet_weight)
        db.session.commit()
        return {'ok': True, 'new_pet': existing_pet.to_dict()}
    else:
        return {'ok': False, 'errors': form.errors}


@pet_routes.route('/<int:pet_id>', methods=['DELETE'])
@login_required
def delete_pet(pet_id):
    existing_pet = Pet.query.get(pet_id)
    if not existing_pet:
        return {'ok': False, 'errors': ['Pet does not exist.']}
    db.session.delete(existing_pet)
    db.session.commit()

    return {'deleted': True}
