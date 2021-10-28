from flask_wtf import FlaskForm
from wtforms import StringField
from wtforms.validators import DataRequired, Email, ValidationError

from app.models import User


def user_exists(form, field):
    # Checking if user exists
    email = field.data
    user = User.query.filter(User.email == email).first()
    if user:
        raise ValidationError('Email address is already in use.')


def username_exists(form, field):
    # Checking if username is already in use
    username = field.data
    user = User.query.filter(User.username == username).first()
    if user:
        raise ValidationError('Username is already in use.')


def is_email(form, field):
    email = field.data
    if len(email.split('@')) != 2:
        raise ValidationError('Must use a valid email address.')
    if len(email.split('@')[1].split('.')) < 2:
        raise ValidationError('Must use a valid email address.')
    if len(email) > 255:
        raise ValidationError('The email is too long.')


def is_long(form, field):
    param = field.data
    if len(param) > 40:
        raise ValidationError(f'The input for {field.name} is too long.')


class SignUpForm(FlaskForm):
    username = StringField(
        'username', validators=[DataRequired(), username_exists, is_long])
    firstname = StringField(
        'firstname', validators=[DataRequired(), is_long])
    lastname = StringField(
        'lastname', validators=[DataRequired(), is_long])
    email = StringField('email', validators=[
                        DataRequired(), user_exists, is_email])
    password = StringField('password', validators=[DataRequired()])
