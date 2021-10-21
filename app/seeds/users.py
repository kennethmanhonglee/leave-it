from app.models import db, User
from faker import Faker

fake = Faker()

# Adds a demo user, you can add other users here if you want


def seed_users():
    demo = User(
        username='demo', firstname='Demo', lastname='User', email='demo@aa.io', password='password')
    marnie = User(
        username='marnie', firstname='Marnie', lastname='Huan', email='marnie@aa.io', password='password')
    bobbie = User(
        username='bobbie', firstname='Bobbie', lastname='Hoe', email='bobbie@aa.io', password='password')

    db.session.add(demo)
    db.session.add(marnie)
    db.session.add(bobbie)

    for _i in range(0, 30):
        new_user = User(
            username=fake.user_name(),
            firstname=fake.first_name(),
            lastname=fake.last_name(),
            email=fake.free_email(),
            password='password'
        )
        db.session.add(new_user)

    db.session.commit()


# Uses a raw SQL query to TRUNCATE the users table.
# SQLAlchemy doesn't have a built in function to do this
# TRUNCATE Removes all the data from the table, and RESET IDENTITY
# resets the auto incrementing primary key, CASCADE deletes any
# dependent entities
def undo_users():
    db.session.execute('TRUNCATE users RESTART IDENTITY CASCADE;')
    db.session.commit()
