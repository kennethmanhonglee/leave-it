from datetime import datetime

from .db import db
from app.calories import get_calories


class PetWeight(db.Model):
    __tablename__ = 'pet_weights'

    id = db.Column(db.Integer, primary_key=True)
    pet_id = db.Column(db.Integer, db.ForeignKey('pets.id'), nullable=False)
    weight = db.Column(db.Float, nullable=False)
    unit = db.Column(db.String, nullable=False)
    created_at = db.Column(db.Date, nullable=False)

    # relationships
    pet = db.relationship('Pet', back_populates='weights', uselist=False)

    def to_dict(self):
        today = datetime.today()
        recorded_today = str(today).split(' ')[0] == str(self.created_at)

        return {
            'id': self.id,
            'pet_id': self.pet_id,
            'weight': self.weight,
            'unit': self.unit,
            'created_at': self.created_at,
            'recorded_today': recorded_today
        }
