from flask import Blueprint, request
from flask_login import login_required, current_user

from app.forms import PetForm
from app.models import db, Pet

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


@pet_routes.route('/<int:pet_id>', methods=['PUT'])
@login_required
def edit_pet(pet_id):
    # take in form data
    user_id = current_user.get_id()
    form = PetForm()
    form['csrf_token'].data = request.cookies['csrf_token']
    if form.validate_on_submit():
        # existing_pet = Pet.query.filter(
        #     Pet.name == form.data['name'], Pet.user_id == user_id).first()
        existing_pet = Pet.query.get(pet_id)
        if not existing_pet:
            return {'ok': False, 'errors': ['Pet does not exist.']}

        # create a pet with given data
        existing_pet.name = form.data['name']
        existing_pet.age = form.data['age']
        existing_pet.current_weight = form.data['current_weight']
        existing_pet.ideal_weight = form.data['ideal_weight']
        existing_pet.neutered = form.data['neutered']
        db.session.commit()
        return existing_pet.to_dict()
    else:
        return {'ok': False, 'errors': form.errors}
