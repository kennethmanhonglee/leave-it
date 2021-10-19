from .db import db


class Pet(db.Model):
    __tablename__ = 'pets'

    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(40), nullable=False)
    user_id = db.Column(db.Integer, db.ForeignKey('users.id'), nullable=False)
    age = db.Column(db.Integer, nullable=False)
    current_weight = db.Column(db.Float, nullable=False)
    ideal_weight = db.Column(db.Float, nullable=False)
    neutered = db.Column(db.Boolean, nullable=False)

    # relationships
    user = db.relationship('User', back_populates='pets', uselist=False)

    def to_dict(self):
        return {
            'id': self.id,
            'name': self.name,
            'user_id': self.user_id,
            'age': self.age,
            'current_weight': self.current_weight,
            'ideal_weight': self.ideal_weight,
            'neutered': self.neutered
        }
