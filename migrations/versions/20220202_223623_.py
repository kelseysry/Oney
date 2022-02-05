"""empty message

Revision ID: 1e96247d908b
Revises: 888c5f3ffcd4
Create Date: 2022-02-02 22:36:23.732996

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = '1e96247d908b'
down_revision = '888c5f3ffcd4'
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.add_column('credits', sa.Column('user_id', sa.Integer(), nullable=True))
    op.create_foreign_key(None, 'credits', 'users', ['user_id'], ['id'])
    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.drop_constraint(None, 'credits', type_='foreignkey')
    op.drop_column('credits', 'user_id')
    # ### end Alembic commands ###
