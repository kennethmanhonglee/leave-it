from flask_wtf import FlaskForm
from wtforms import FloatField, StringField
from wtforms.validators import DataRequired, ValidationError

ACCEPTED_GOALS = [
    "Neutered Adult",
    "Intact Adult",
    "Inactive/obese prone",
    "Weight Loss",
    "Weight Gain",
    "Active, working dogs",
    "Puppy 0-4 months",
    "Puppy 4 months to adult",
]

ACCEPTED_UNITS = ["kg", "lb"]


def goal_accepted(form, field):
    goal = field.data
    if goal not in ACCEPTED_GOALS:
        raise ValidationError("Goal must be chosen from the list.")


def unit_accepted(form, field):
    unit = field.data
    if unit not in ACCEPTED_UNITS:
        raise ValidationError("Unit must be chosen from the list.")


def weight_accepted(form, field):
    weight = field.data
    unit = form.data["unit"]
    if unit == "kg":
        if weight < 0 or weight > 150:
            raise ValidationError("Weight must be realistic.")
    if unit == "lb":
        if weight < 0 or weight > 350:
            raise ValidationError("Weight must be realistic.")


def is_long(form, field):
    param = field.data
    if len(param) > 20:
        raise ValidationError("The input is too long.")


class PetForm(FlaskForm):
    name = StringField("name", validators=[DataRequired(), is_long])
    current_weight = FloatField(
        "current_weight", validators=[DataRequired(), weight_accepted]
    )
    ideal_weight = FloatField(
        "ideal_weight", validators=[DataRequired(), weight_accepted]
    )
    goal = StringField("goal", validators=[DataRequired(), goal_accepted])
    unit = StringField("unit", validators=[DataRequired(), unit_accepted])
