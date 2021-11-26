from flask_wtf import FlaskForm
from wtforms import IntegerField, StringField
from wtforms.validators import DataRequired


class PetWeightForm(FlaskForm):
    pet_id = StringField('pet_id', validators=[DataRequired()])
    current_weight = StringField('current_weight', validators=[DataRequired()])
