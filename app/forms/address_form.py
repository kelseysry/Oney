from flask_wtf import FlaskForm
from wtforms import StringField, SelectField, SubmitField, IntegerField, BooleanField, TextAreaField
from wtforms.validators import DataRequired, Email, ValidationError, NumberRange
from app.models import Address

class AddressForm(FlaskForm):
    user_id = IntegerField('user_id', validators=[DataRequired()])
    full_name = StringField('full_name',validators=[DataRequired()])
    country = StringField('country',validators=[DataRequired()])
    street_address = StringField('street_address',validators=[DataRequired()])
    apt_suite_other = StringField('apt_suite_other')
    zip_code = IntegerField('zip_code', validators=[DataRequired()])
    city = StringField('city',validators=[DataRequired()])
    state = StringField('state',validators=[DataRequired()])
