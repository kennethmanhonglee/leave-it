from .db import db


class Food(db.Model):
    __tablename__ = 'foods'

    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey('users.id'), nullable=False)
    food_name = db.Column(db.String(100), nullable=False)
    food_type = db.Column(db.String(100), nullable=False)
    calories = db.Column(db.Integer, nullable=False)
    created_at = db.Column(db.DateTime, nullable=False)

    user = db.relationship(
        'User', back_populates='created_foods', uselist=False)
