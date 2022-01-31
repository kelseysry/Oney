from app.models import db, Address


def seed_addresses():
    user1 = Address(
      full_name = 'Demo User',
      country = 'United States',
      street_address = '825 Battery St',
      apt_suite_other = '',
      zip_code = '94111',
      city = 'San Francisco',
      state = 'CA'
    )

    db.session.add(user1)

    db.session.commit()

def undo_addresses():
    db.session.execute('TRUNCATE addresses RESTART IDENTITY CASCADE;')
    db.session.commit()
