from flask import Blueprint, jsonify, redirect, url_for, session, request
from app.models import Address, db, User
from app.forms import AddressForm

address_routes = Blueprint('addresses', __name__)

@address_routes.route('/user/<int:user_id>')
def user_address(user_id):
    address = Address.query.filter(Address.user_id == user_id).first()
    if address:
      return {'address' : [address.to_dict()]}
    else:
      return  {'address' : []}


@address_routes.route('/user/edit/<int:user_id>', methods=['GET','PUT'])
def user_address_update(user_id):
    address = Address.query.filter(Address.user_id == user_id).first()
    form = AddressForm()
    form['csrf_token'].data = request.cookies['csrf_token']
    if form.validate_on_submit():
      address.user_id = form.data['user_id']
      address.full_name = form.data['full_name']
      address.country = form.data['country']
      address.street_address = form.data['street_address']
      address.apt_suite_other = form.data['apt_suite_other']
      address.zip_code = form.data['zip_code']
      address.city = form.data['city']
      address.state = form.data['state']

      db.session.commit()
      return address.to_dict()
    else:
      # print("errrrrrrrrrors", form.errors)
      return "bad data"

@address_routes.route('/user/new/', methods=['POST'])
def create_address():
  form = AddressForm()
  form['csrf_token'].data = request.cookies['csrf_token']
  if form.validate_on_submit():
    address = Address()
    form.populate_obj(address)
    db.session.add(address)
    db.session.commit()
    return {"msg": "address added"}
  else:
    print("errrrrrrrrrors", form.errors)
    return "bad data"
