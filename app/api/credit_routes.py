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
