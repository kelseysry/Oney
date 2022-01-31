from .db import db
from sqlalchemy.sql import func

class Address(db.Model):
    __tablename__ = 'addresses'

    id = db.Column(db.Integer, primary_key=True)
    full_name = db.Column(db.String(60), nullable=False)
    country = db.Column(db.String(60), nullable=False)
    street_address = db.Column(db.String(255), nullable=False)
    apt_suite_other = db.Column(db.String(255), nullable=True)
    zip_code = db.Column(db.Integer, nullable=False)
    city = db.Column(db.String(60), nullable=False)
    state = db.Column(db.String(60), nullable=False)
    created_at = db.Column(db.DateTime(timezone=True), server_default=func.now())
    updated_at = db.Column(db.DateTime(timezone=True), server_default=func.now())

    user = db.relationship("User", back_populates="address")

    def to_dict(self):
        return {
            'id': self.id,
            'full_name': self.full_name,
            'country': self.country,
            'street_address': self.street_address,
            'apt_suite_other': self.apt_suite_other,
            'zip_code': self.zip_code,
            'city': self.city,
            'state': self.state,
            'created_at': self.created_at,
            'updated_at': self.updated_at
        }
