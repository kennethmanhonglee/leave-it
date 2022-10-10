from datetime import datetime
from random import randint

from app.forms.pet_form import ACCEPTED_GOALS
from app.models import Pet, PetWeight, db

PET_NAMES = [
    "Quinnie",
    "Yukon",
    "Gazza",
    "Kama",
    "Yarin",
    "Elinor",
    "Lucius",
    "Harmon",
    "Kanobi",
    "Parlo",
    "Winston",
    "Windsor",
    "Hamilton",
    "Zelda",
    "Kaya",
    "Askia",
]

DOG_PICS = [
    "https://images.dog.ceo/breeds/schnauzer-miniature/n02097047_4018.jpg",
    "https://images.dog.ceo/breeds/terrier-irish/n02093991_3653.jpg",
    "https://images.dog.ceo/breeds/terrier-irish/n02093991_3935.jpg",
    "https://images.dog.ceo/breeds/akita/An_Akita_Inu_resting.jpg",
    "https://images.dog.ceo/breeds/dingo/n02115641_5320.jpg",
    "https://images.dog.ceo/breeds/schnauzer-miniature/n02097047_1287.jpg",
    "https://images.dog.ceo/breeds/collie-border/n02106166_416.jpg",
    "https://images.dog.ceo/breeds/kelpie/n02105412_2454.jpg",
    "https://images.dog.ceo/breeds/terrier-tibetan/n02097474_477.jpg",
    "https://images.dog.ceo/breeds/pitbull/20190801_154956.jpg",
    "https://images.dog.ceo/breeds/dachshund/dachshund_4.jpg",
    "https://images.dog.ceo/breeds/bullterrier-staffordshire/n02093256_2737.jpg",
    "https://images.dog.ceo/breeds/terrier-wheaten/n02098105_474.jpg",
    "https://images.dog.ceo/breeds/schipperke/n02104365_6927.jpg",
    "https://images.dog.ceo/breeds/bulldog-french/n02108915_12139.jpg",
    "https://images.dog.ceo/breeds/greyhound-italian/n02091032_5435.jpg",
    "https://images.dog.ceo/breeds/setter-irish/n02100877_1453.jpg",
    "https://images.dog.ceo/breeds/buhund-norwegian/hakon1.jpg",
    "https://images.dog.ceo/breeds/papillon/n02086910_592.jpg",
    "https://images.dog.ceo/breeds/hound-afghan/n02088094_2545.jpg",
    "https://images.dog.ceo/breeds/newfoundland/n02111277_7285.jpg",
    "https://images.dog.ceo/breeds/whippet/n02091134_11875.jpg",
    "https://images.dog.ceo/breeds/komondor/n02105505_4282.jpg",
    "https://images.dog.ceo/breeds/bulldog-french/n02108915_2380.jpg",
    "https://images.dog.ceo/breeds/terrier-american/n02093428_5635.jpg",
    "https://images.dog.ceo/breeds/briard/n02105251_5156.jpg",
    "https://images.dog.ceo/breeds/poodle-miniature/n02113712_1077.jpg",
    "https://images.dog.ceo/breeds/keeshond/n02112350_1861.jpg",
    "https://images.dog.ceo/breeds/basenji/n02110806_1674.jpg",
    "https://images.dog.ceo/breeds/wolfhound-irish/n02090721_968.jpg",
    "https://images.dog.ceo/breeds/mexicanhairless/n02113978_2425.jpg",
    "https://images.dog.ceo/breeds/australian-shepherd/sadie.jpg",
    "https://images.dog.ceo/breeds/cotondetulear/IMG_20160830_202631573.jpg",
    "https://images.dog.ceo/breeds/mastiff-bull/n02108422_1546.jpg",
    "https://images.dog.ceo/breeds/doberman/n02107142_2779.jpg",
    "https://images.dog.ceo/breeds/sheepdog-english/n02105641_2822.jpg",
    "https://images.dog.ceo/breeds/briard/n02105251_8848.jpg",
    "https://images.dog.ceo/breeds/hound-english/n02089973_2017.jpg",
    "https://images.dog.ceo/breeds/mastiff-tibetan/n02108551_290.jpg",
    "https://images.dog.ceo/breeds/bulldog-french/n02108915_8258.jpg",
    "https://images.dog.ceo/breeds/hound-ibizan/n02091244_5238.jpg",
    "https://images.dog.ceo/breeds/appenzeller/n02107908_91.jpg",
    "https://images.dog.ceo/breeds/labradoodle/labradoodle-forrest.png",
    "https://images.dog.ceo/breeds/terrier-welsh/lucy.jpg",
    "https://images.dog.ceo/breeds/saluki/n02091831_7051.jpg",
    "https://images.dog.ceo/breeds/terrier-scottish/n02097298_8301.jpg",
    "https://images.dog.ceo/breeds/setter-gordon/n02101006_772.jpg",
    "https://images.dog.ceo/breeds/setter-english/n02100735_4813.jpg",
    "https://images.dog.ceo/breeds/airedale/n02096051_2045.jpg",
    "https://images.dog.ceo/breeds/pinscher-miniature/n02107312_2716.jpg",
]

# 8 demo users
# avg dog lifespan is 10-13 years
# leaveit will use months to calculate age
# weight = will use kg first, bonus add pounds


def seed_pets():
    for i, name in enumerate(PET_NAMES):
        user_id = randint(1, 3)
        unit = "kg" if randint(1, 2) % 2 == 0 else "lb"
        new_pet = Pet(
            name=name,
            user_id=user_id,
            current_weight=randint(4, 50),
            ideal_weight=randint(4, 50),
            goal=ACCEPTED_GOALS[randint(0, 7)],
            image_url=DOG_PICS[randint(0, 49)],
            unit=unit,
        )
        db.session.add(new_pet)
        db.session.commit()
        new_weight = PetWeight(
            pet_id=new_pet.id,
            weight=new_pet.current_weight,
            unit=unit,
            created_at=datetime.today(),
        )
        db.session.add(new_weight)
        db.session.commit()


# Uses a raw SQL query to TRUNCATE the users table.
# SQLAlchemy doesn't have a built in function to do this
# TRUNCATE Removes all the data from the table, and RESET IDENTITY
# resets the auto incrementing primary key, CASCADE deletes any
# dependent entities
def undo_pets():
    db.session.execute("TRUNCATE pets RESTART IDENTITY CASCADE;")
    db.session.commit()
