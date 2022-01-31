from app.models import db, Credit


def seed_credits():
    user1 = Credit(
      full_name = 'Demo User',
      card_number = 1234567891234567,
      expiration_date_month = 1,
      expiration_date_year = 2025,
      security_code = 111
    )

    db.session.add(user1)

    db.session.commit()

def undo_credits():
    db.session.execute('TRUNCATE credits RESTART IDENTITY CASCADE;')
    db.session.commit()
