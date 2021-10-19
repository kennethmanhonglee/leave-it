from flask import Blueprint, request
from flask_login import login_required

from app.forms import PetForm
from app.models import Pet

pet_routes = Blueprint('pets', __name__)


@pet_routes.route('')
def pets():
    # get logged in user, and get all pets that belong to the user
    return 'this is the get pets route! its working!'


@pet_routes.route('', methods=['POST'])
@login_required
def create_pet():
    # take in form data
    form = PetForm()
    form['csrf_token'].data = request.cookies['csrf_token']
    print('\n\n\n', form.data, '\n\n\n')
    print(form.validate_on_submit())
    if form.validate_on_submit():
        # create a pet with given data
        print('\n\n\n', 'helleo', '\n\n\n')
    return 'hello this is the POST /pets route'
