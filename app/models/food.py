from .db import db


class Food(db.Model):
    __tablename__ = 'foods'

    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey('users.id'), nullable=False)
    food_name = db.Column(db.String(100), nullable=False)
    food_type = db.Column(db.String(100), nullable=False)
    serving_size = db.Column(db.Float, nullable=False)
    calories = db.Column(db.Integer, nullable=False)
    created_at = db.Column(db.DateTime, nullable=False)

    user = db.relationship(
        'User', back_populates='created_foods', uselist=False)

    def to_dict(self):
        return {
            'id': self.id,
            'user_id': self.user_id,
            'food_name': self.food_name,
            'food_type': self.food_type,
            'calories': self.calories,
            'created_at': self.created_at,
            'serving_size': self.serving_size
        }
