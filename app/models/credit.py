from .db import db
from sqlalchemy.sql import func

class Credit(db.Model):
    __tablename__ = 'credits'

    id = db.Column(db.Integer, primary_key=True)
    full_name = db.Column(db.String(60), nullable=False)
    card_number = db.Column(db.String(16), nullable=False)
    expiration_date_month = db.Column(db.Integer, nullable=False)
    expiration_date_year = db.Column(db.Integer, nullable=False)
    security_code = db.Column(db.Integer, nullable=False)
    created_at = db.Column(db.DateTime(timezone=True), server_default=func.now())
    updated_at = db.Column(db.DateTime(timezone=True), server_default=func.now())

    user = db.relationship("User", back_populates="credit")

    def to_dict(self):
        return {
            'id': self.id,
            'full_name': self.full_name,
            'card_number': self.card_number,
            'expiration_date_month': self.expiration_date_month,
            'expiration_date_year': self.expiration_date_year,
            'security_code': self.security_code,
            'created_at': self.created_at,
            'updated_at': self.updated_at
        }
