from flask import Blueprint
from flask_login import login_required

from app.forms import PetForm
from app.models import Pet

pet_routes = Blueprint('pets', __name__)


@pet_routes.route('')
def pets():
    # get logged in user, and get all pets that belong to the user
    return 'this is the get pets route! its working!'


@pet_routes.route('', methods=['POST'])
def create_pet():
    # take in form data
    print('\n\n\n i am in the post route! \n\n\n')
    form = PetForm()
    print('\n\n\n', form.data, '\n\n\n')
    if form.validate_on_submit():
        # create a pet with given data
        print('\n\n\n', form.data, '\n\n\n')
    return 'hello this is the POST /pets route'
