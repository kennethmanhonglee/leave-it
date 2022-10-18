from flask_wtf import FlaskForm
from wtforms import StringField
from wtforms.validators import DataRequired

from app.forms.pet_form import weight_accepted


class PetWeightForm(FlaskForm):
    petId = StringField("petId", validators=[DataRequired()])
    unit = StringField("petId", validators=[DataRequired()])
    currentWeight = StringField(
        "currentWeight", validators=[DataRequired(), weight_accepted]
    )
