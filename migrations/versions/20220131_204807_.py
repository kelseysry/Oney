"""empty message

Revision ID: 888c5f3ffcd4
Revises: fa84cb56a69c
Create Date: 2022-01-31 20:48:07.658446

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = '888c5f3ffcd4'
down_revision = 'fa84cb56a69c'
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.drop_constraint('users_credit_id_fkey', 'users', type_='foreignkey')
    op.drop_constraint('users_address_id_fkey', 'users', type_='foreignkey')
    op.drop_column('users', 'credit_id')
    op.drop_column('users', 'address_id')
    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.add_column('users', sa.Column('address_id', sa.INTEGER(), autoincrement=False, nullable=True))
    op.add_column('users', sa.Column('credit_id', sa.INTEGER(), autoincrement=False, nullable=True))
    op.create_foreign_key('users_address_id_fkey', 'users', 'addresses', ['address_id'], ['id'])
    op.create_foreign_key('users_credit_id_fkey', 'users', 'credits', ['credit_id'], ['id'])
    # ### end Alembic commands ###