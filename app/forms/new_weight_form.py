from flask_wtf import FlaskForm
from wtforms import IntegerField
from wtforms.validators import DataRequired


class PetWeightForm(FlaskForm):
    pet_id = IntegerField('pet_id', validators=[DataRequired()])
    current_weight = IntegerField('pet_id', validators=[DataRequired()])
