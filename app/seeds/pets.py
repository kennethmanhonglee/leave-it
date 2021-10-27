from random import randint
from datetime import datetime

from app.models import db, Pet, PetWeight
from app.forms.pet_form import ACCEPTED_GOALS

PET_NAMES = [
    'Quinnie',
    'Yukon',
    'Gazza',
    'Kama',
    'Yarin',
    'Elinor',
    'Lucius',
    'Harmon',
    'Kanobi',
    'Parlo',
    'Winston',
    'Windsor',
    'Hamilton',
    'Zelda',
    'Kaya',
    'Askia'
]

# 8 demo users
# avg dog lifespan is 10-13 years
# leaveit will use months to calculate age
# weight = will use kg first, bonus add pounds


def seed_pets():
    for i, name in enumerate(PET_NAMES):
        neutered = str(randint(1, 2) % 2 == 1)
        user_id = randint(1, 8)
        new_pet = Pet(
            name=name,
            user_id=user_id,
            current_weight=randint(4, 50),
            ideal_weight=randint(4, 50),
            goal=ACCEPTED_GOALS[randint(0, 7)]
        )
        db.session.add(new_pet)
        db.session.commit()
        new_weight = PetWeight(
            pet_id=new_pet.id,
            weight=new_pet.current_weight,
            created_at=datetime.today()
        )
        db.session.add(new_weight)
        db.session.commit()


# Uses a raw SQL query to TRUNCATE the users table.
# SQLAlchemy doesn't have a built in function to do this
# TRUNCATE Removes all the data from the table, and RESET IDENTITY
# resets the auto incrementing primary key, CASCADE deletes any
# dependent entities
def undo_pets():
    db.session.execute('TRUNCATE pets RESTART IDENTITY CASCADE;')
    db.session.commit()
