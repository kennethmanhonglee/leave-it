from .db import db


class Meal(db.Model):
    __tablename__ = 'meals'
    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey('users.id'), nullable=False)
    pet_id = db.Column(db.Integer, db.ForeignKey('pets.id'), nullable=False)
    food_id = db.Column(db.Integer, db.ForeignKey('foods.id'), nullable=False)
    created_at = db.Column(db.Date, nullable=False)

    pet = db.relationship('Pet', back_populates='meals', uselist=False)

    def to_dict(self):
        return {
            'id': self.id,
            'pet_id': self.pet_id,
            'food_id': self.food_id,
            'created_at': self.created_at,
            'user_id': self.user_id
        }
