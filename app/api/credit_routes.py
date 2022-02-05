from flask import Blueprint, jsonify, redirect, url_for, session, request
from app.models import Credit, db, User
from app.forms import CreditForm

credit_routes = Blueprint('credits', __name__)

@credit_routes.route('/user/<int:user_id>')
def user_credit(user_id):
    credit = Credit.query.filter(Credit.user_id == user_id).first()
    print("credit????????", credit.to_dict())
    if credit:
      return {'credit' : [credit.to_dict()]}
    else:
      print("errrrrrrrrrors", form.errors)
      return  {'credit' : []}

@credit_routes.route('/user/edit/<int:user_id>', methods=['GET','PUT'])
def user_credit_update(user_id):
    credit = Credit.query.filter(Credit.user_id == user_id).first()
    form = CreditForm()
    form['csrf_token'].data = request.cookies['csrf_token']
    if form.validate_on_submit():
      credit.full_name = form.data['full_name']
      credit.card_number = form.data['card_number']
      credit.expiration_date_month = form.data['expiration_date_month']
      credit.expiration_date_year = form.data['expiration_date_year']
      credit.security_code = form.data['security_code']
      credit.user_id = form.data['user_id']

      db.session.commit()
      return credit.to_dict()
    else:
      print("errrrrrrrrrors", form.errors)
      return "bad data"
