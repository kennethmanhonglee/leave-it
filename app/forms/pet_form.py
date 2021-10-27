from flask_wtf import FlaskForm
from wtforms import StringField, FloatField, IntegerField
from wtforms.validators import DataRequired, ValidationError


ACCEPTED_GOALS = [

    'Neutered Adult',
    'Intact Adult',
    'Inactive/obese prone',
    'Weight Loss',
    'Weight Gain',
    'Active, working dogs',
    'Puppy 0-4 months',
    'Puppy 4 months to adult',
]


def goal_accepted(form, field):
    goal = field.data
    if goal not in ACCEPTED_GOALS:
        raise ValidationError(
            'Goal must be chosen from the list.'
        )


class PetForm(FlaskForm):
    name = StringField('name', validators=[DataRequired()])
    current_weight = FloatField('current_weight', validators=[DataRequired()])
    ideal_weight = FloatField('ideal_weight', validators=[DataRequired()])
    goal = StringField('goal', validators=[DataRequired(), goal_accepted])
