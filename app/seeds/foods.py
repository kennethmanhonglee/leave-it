from datetime import datetime
from random import randint

from app.models import db, Food


def seed_foods():
    kibbles_a = Food(
        user_id=randint(1, 8),
        food_name='Very Tasty Kibbles',
        food_type='Kibbles',
        serving_size=100,
        calories=100,
        created_at=datetime.today()
    )
    db.session.add(kibbles_a)
    kibbles_b = Food(
        user_id=randint(1, 8),
        food_name='Dribble Kibbles',
        food_type='Kibbles',
        serving_size=150,
        calories=90,
        created_at=datetime.today()
    )
    db.session.add(kibbles_b)
    steak = Food(
        user_id=randint(1, 8),
        food_name='Ribeye Steak',
        food_type='Raw Meat',
        serving_size=100,
        calories=200,
        created_at=datetime.today()
    )
    db.session.add(steak)
    nutrimix = Food(
        user_id=randint(1, 8),
        food_name='Nutrimix Fresh Food',
        food_type='Fresh Food',
        serving_size=200,
        calories=100,
        created_at=datetime.today()
    )
    db.session.add(nutrimix)
    milkbone = Food(
        user_id=randint(1, 8),
        food_name='Milk Bone',
        food_type='Others',
        serving_size=200,
        calories=150,
        created_at=datetime.today()
    )
    db.session.add(milkbone)

    db.session.commit()


def undo_foods():
    db.session.execute('TRUNCATE foods RESTART IDENTITY CASCADE;')
    db.session.commit()
