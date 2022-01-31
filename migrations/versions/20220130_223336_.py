"""empty message

Revision ID: 519063b34cb1
Revises: d34a66c2534b
Create Date: 2022-01-30 22:33:36.735767

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = '519063b34cb1'
down_revision = 'd34a66c2534b'
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.create_table('credits',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('full_name', sa.String(length=60), nullable=False),
    sa.Column('card_number', sa.Integer(), nullable=False),
    sa.Column('expiration_date_month', sa.Integer(), nullable=False),
    sa.Column('expiration_date_year', sa.Integer(), nullable=False),
    sa.Column('security_code', sa.Integer(), nullable=False),
    sa.Column('created_at', sa.DateTime(timezone=True), server_default=sa.text('now()'), nullable=True),
    sa.Column('updated_at', sa.DateTime(timezone=True), server_default=sa.text('now()'), nullable=True),
    sa.PrimaryKeyConstraint('id')
    )
    op.add_column('users', sa.Column('credit_id', sa.Integer(), nullable=True))
    op.create_foreign_key(None, 'users', 'credits', ['credit_id'], ['id'])
    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.drop_constraint(None, 'users', type_='foreignkey')
    op.drop_column('users', 'credit_id')
    op.drop_table('credits')
    # ### end Alembic commands ###