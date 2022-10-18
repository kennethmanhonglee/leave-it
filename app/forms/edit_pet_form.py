from flask_wtf import FlaskForm
from wtforms import FloatField, StringField
from wtforms.fields.core import BooleanField
from wtforms.validators import DataRequired

from app.forms.pet_form import goal_accepted, is_long, unit_accepted, weight_accepted


class EditPetForm(FlaskForm):
    name = StringField("name", validators=[DataRequired(), is_long])
    currentWeight = FloatField(
        "currentWeight", validators=[DataRequired(), weight_accepted]
    )
    idealWeight = FloatField(
        "idealWeight", validators=[DataRequired(), weight_accepted]
    )
    goal = StringField("goal", validators=[DataRequired(), goal_accepted])
    unit = StringField("unit", validators=[DataRequired(), unit_accepted])
    hasPic = BooleanField("hasPic")
