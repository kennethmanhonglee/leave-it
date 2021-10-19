from flask_wtf import FlaskForm
from sqlalchemy.orm import column_property
from wtforms import StringField, BooleanField, FloatField, IntegerField
from wtforms import validators
from wtforms.validators import DataRequired


class PetForm(FlaskForm):
    name = StringField('name', validators=[DataRequired()])
    age = IntegerField('age', validators=[DataRequired()])
    current_weight = FloatField('current_weight', validators=[DataRequired()])
    ideal_weight = FloatField('ideal_weight', validators=[DataRequired()])
    neutered = BooleanField('neutered', validators=[DataRequired()])
