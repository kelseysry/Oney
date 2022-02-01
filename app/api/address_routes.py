from flask import Blueprint, jsonify, redirect, url_for, session, request
from app.models import Address, db, User
from app.forms import AddressForm

address_routes = Blueprint('addresses', __name__)

@address_routes.route('/user/<int:user_id>')
def user_address(user_id):
    address = Address.query.filter(Address.user_id == user_id).first()
    print("address----------", address)
    if address:
      return {'address' : [address.to_dict()]}
    else:
      return  {'address' : []}
