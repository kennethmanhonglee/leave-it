from flask_wtf import FlaskForm
from wtforms import StringField
from wtforms.validators import DataRequired, ValidationError

from app.models import User


def user_exists(form, field):
    # Checking if user exists
    loginParam = field.data
    user = (
        User.query.filter(User.email == loginParam).first()
        or User.query.filter(User.username == loginParam).first()
    )
    if not user:
        raise ValidationError("This user does not exist.")


def password_matches(form, field):
    # Checking if password matches
    password = field.data
    loginParam = form.data["loginParam"]
    user = (
        User.query.filter(User.email == loginParam).first()
        or User.query.filter(User.username == loginParam).first()
    )
    if not user:
        # raise ValidationError('No such user exists.')
        return
    if not user.check_password(password):
        raise ValidationError("Password was incorrect.")


class LoginForm(FlaskForm):
    loginParam = StringField("email", validators=[DataRequired(), user_exists])
    password = StringField("password", validators=[DataRequired(), password_matches])
