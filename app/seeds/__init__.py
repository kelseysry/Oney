from flask.cli import AppGroup
from .users import seed_users, undo_users
from .categories import seed_categories, undo_categories
from .products import seed_products, undo_products
from .reviews import seed_reviews, undo_reviews
from .carts import seed_carts, undo_carts
from .addresses import seed_addresses, undo_addresses
from .credits import seed_credits, undo_credits
# Creates a seed group to hold our commands
# So we can type `flask seed --help`
seed_commands = AppGroup('seed')


# Creates the `flask seed all` command
@seed_commands.command('all')
def seed():
    # Seed the most important tables first
    seed_users()
    seed_addresses()
    seed_credits()
    seed_categories()
    seed_products()
    seed_reviews()
    seed_carts()
    # Add other seed functions here


# Creates the `flask seed undo` command
@seed_commands.command('undo')
def undo():
    # ORDER HERE IS VERY IMPORTANT!!!
    # START BY DELETING TABLES THAT DO NOT DEPEND ON ANYTHING!!!
    undo_carts()
    undo_reviews()
    undo_products()
    undo_categories()
    undo_credits()
    undo_addresses()
    undo_users()
    # Add other undo functions here
