from flask_wtf import FlaskForm
from flask_wtf.recaptcha import validators
from wtforms import StringField
from wtforms.fields.core import FloatField, IntegerField
from wtforms.validators import DataRequired, ValidationError

ACCEPTED_FOOD_TYPES = {'Kibbles', 'Fresh Food', 'Raw Meat', 'Others'}


def type_accepted(form, field):
    food_type = field.data
    if food_type not in ACCEPTED_FOOD_TYPES:
        raise ValidationError(
            'Food type must be one of the following: Kibbles, Fresh Food, Raw Food, Others.')


class CreateFoodForm(FlaskForm):
    food_name = StringField('food_name', validators=[DataRequired()])
    food_type = StringField('food_type', validators=[
                            DataRequired(), type_accepted])
    calories = IntegerField('calories', validators=[DataRequired()])
    serving_size = FloatField('serving_size', validators=[DataRequired()])
