from flask_wtf import FlaskForm
from wtforms import StringField
from wtforms.fields.core import FloatField, IntegerField
from wtforms.validators import DataRequired, ValidationError

ACCEPTED_FOOD_TYPES = {'Kibbles', 'Fresh Food', 'Raw Meat', 'Others'}


def type_accepted(form, field):
    food_type = field.data
    if food_type not in ACCEPTED_FOOD_TYPES:
        raise ValidationError(
            'Food type must be one of the following: Kibbles, Fresh Food, Raw Food, Others.')


def cal_accepted(form, field):
    num = field.data
    if num < 0 or num > 500:
        raise ValidationError('Please enter a realistic number.')


def serving_accepted(form, field):
    num = field.data
    if num < 0 or num > 500:
        raise ValidationError('Please enter a realistic number.')


def is_long(form, field):
    param = field.data
    if len(param) > 40:
        raise ValidationError('Food name is too long.')


class CreateFoodForm(FlaskForm):
    food_name = StringField('food_name', validators=[DataRequired(), is_long])
    food_type = StringField('food_type', validators=[
                            DataRequired(), type_accepted])
    calories = IntegerField('calories', validators=[
                            DataRequired(), cal_accepted])
    serving_size = FloatField('serving_size', validators=[
                              DataRequired(), serving_accepted])
