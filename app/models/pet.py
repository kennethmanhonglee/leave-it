from datetime import datetime

from app.calories import get_calories
from .db import db


class Pet(db.Model):
    __tablename__ = 'pets'

    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(20), nullable=False)
    user_id = db.Column(db.Integer, db.ForeignKey('users.id'), nullable=False)
    current_weight = db.Column(db.Float, nullable=False)
    ideal_weight = db.Column(db.Float, nullable=False)
    goal = db.Column(db.String, nullable=False)

    # relationships
    user = db.relationship('User', back_populates='pets', uselist=False)
    weights = db.relationship(
        'PetWeight', back_populates='pet', cascade='all, delete-orphan')
    meals = db.relationship('Meal', back_populates='pet',
                            cascade='all, delete-orphan')

    def to_dict(self):
        return {
            'id': self.id,
            'name': self.name,
            'current_weight': self.current_weight,
            'ideal_weight': self.ideal_weight,
            'weights': [weight.to_dict() for weight in self.weights],
            'goal': self.goal,
            'goal_calories': get_calories(self),
            'user_id': self.user_id
        }
