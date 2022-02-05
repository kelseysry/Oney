from flask_wtf import FlaskForm
from wtforms import StringField, SelectField, SubmitField, IntegerField, BooleanField, TextAreaField
from wtforms.validators import DataRequired, Email, ValidationError, NumberRange
from app.models import Credit

class CreditForm(FlaskForm):
    user_id = IntegerField('user_id', validators=[DataRequired()])
    full_name = StringField('full_name',validators=[DataRequired()])
    card_number = StringField('card_number', validators=[DataRequired()])
    expiration_date_month = IntegerField('expiration_date_month', validators=[DataRequired()])
    expiration_date_year = IntegerField('expiration_date_year', validators=[DataRequired()])
    security_code = IntegerField('security_code', validators=[DataRequired()])
