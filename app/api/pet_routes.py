from flask import Blueprint, request
from flask_login import login_required, current_user
from datetime import datetime

from app.forms import PetForm, EditPetForm, PetWeightForm
from app.models import db, Pet, PetWeight
from app.aws import allowed_file, get_unique_filename, upload_file_to_s3, delete_from_s3

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
        if 'image' in request.files:
            image = request.files['image']
            if not allowed_file(image.filename):
                return {'errors': {
                    'image': 'File type is not supported. Please upload a file of one of these file types: PDF, PNG, JPG, JPEG, GIF'
                }}

            image.filename = get_unique_filename(image.filename)
            upload = upload_file_to_s3(image)

            if 'url' not in upload:
                return upload, 400

            existing_pet = Pet.query.filter(
                Pet.name == form.data['name'], Pet.user_id == user_id).first()
            if existing_pet:
                return {'ok': False, 'errors': {'name': ['Pet already exists.']}}
        else:
            upload = None
        # create a pet with given data
        new_pet = Pet(
            name=form.data['name'],
            user_id=user_id,
            goal=form.data['goal'],
            unit=form.data['unit'],
            current_weight=form.data['current_weight'],
            ideal_weight=form.data['ideal_weight'],
            image_url=upload['url'] if upload is not None else None
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


@ pet_routes.route('/<int:pet_id>', methods=['PATCH'])
@ login_required
def edit_pet(pet_id):
    # take in form data
    user_id = current_user.get_id()
    form = EditPetForm()
    form['csrf_token'].data = request.cookies['csrf_token']

    if 'image' in request.files:
        image = request.files['image']
        if not allowed_file(image.filename):
            return {'errors': {
                'image': 'File type is not supported. Please upload a file of one of these file types: PDF, PNG, JPG, JPEG, GIF'
            }}

        image.filename = get_unique_filename(image.filename)
        upload = upload_file_to_s3(image)

        if 'url' not in upload:
            return upload, 400
    else:
        upload = None
    if form.validate_on_submit():
        existing_pet = Pet.query.get(pet_id)
        if not existing_pet:
            return {'ok': False, 'errors': ['Pet does not exist.']}

        # checking whether we have a picture
        new_image_url = existing_pet.image_url
        # if user uploaded, use user pic
        if upload is not None:
            new_image_url = upload['url']
        # if user had no picture, and didnt upload - none
        if existing_pet.image_url is None and upload is None:
            new_image_url = None
        # if user had picture, and didnt upload
        elif existing_pet.image_url and upload is None:
            # check hasPic to see if user wants to keep picture
            new_image_url = existing_pet.image_url if form.data['hasPic'] is True else None

        # create a pet with given data
        existing_pet.name = form.data['name']
        existing_pet.goal = form.data['goal']
        existing_pet.current_weight = form.data['current_weight']
        existing_pet.ideal_weight = form.data['ideal_weight']
        existing_pet.image_url = new_image_url
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


@ pet_routes.route('/<int:pet_id>', methods=['DELETE'])
@ login_required
def delete_pet(pet_id):
    existing_pet = Pet.query.get(pet_id)
    if not existing_pet:
        return {'ok': False, 'errors': ['Pet does not exist.']}
    image_url = existing_pet.image_url
    if image_url is not None:
        delete_from_s3(image_url)
    db.session.delete(existing_pet)
    db.session.commit()

    return {'deleted': True}


@pet_routes.route('/<int:pet_id>/new_weight', methods=['POST'])
@login_required
def new_weight(pet_id):
    '''
    Log new weight for the pet
    '''
    existing_pet = Pet.query.get(pet_id)
    if not existing_pet:
        return {'ok': False, 'errors': ['Pet does not exist.']}
    form = PetWeightForm()
    form['csrf_token'].data = request.cookies['csrf_token']
    if form.validate_on_submit():
        new_pet_weight = PetWeight(
            pet_id=existing_pet.id,
            weight=form.data['current_weight'],
            created_at=datetime.today()
        )

        existing_pet.current_weight = form.data['current_weight']

        db.session.add(new_pet_weight)
        db.session.add(existing_pet)
        db.session.commit()

        return {'ok': True, 'new_pet': existing_pet.to_dict()}
    return {'ok': False, 'errors': form.errors}
