"""empty message

Revision ID: 3331e7273a85
Revises: bab5c3e8d872
Create Date: 2022-01-30 21:15:03.508503

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = '3331e7273a85'
down_revision = 'bab5c3e8d872'
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.create_table('addresses',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('user_id', sa.Integer(), nullable=True),
    sa.Column('full_name', sa.String(length=60), nullable=False),
    sa.Column('country', sa.String(length=60), nullable=False),
    sa.Column('street_address', sa.String(length=255), nullable=False),
    sa.Column('apt_suite_other', sa.String(length=255), nullable=True),
    sa.Column('zip_code', sa.Integer(), nullable=False),
    sa.Column('city', sa.String(length=60), nullable=False),
    sa.Column('state', sa.String(length=60), nullable=False),
    sa.Column('created_at', sa.DateTime(timezone=True), server_default=sa.text('now()'), nullable=True),
    sa.Column('updated_at', sa.DateTime(timezone=True), server_default=sa.text('now()'), nullable=True),
    sa.ForeignKeyConstraint(['user_id'], ['users.id'], ),
    sa.PrimaryKeyConstraint('id')
    )
    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.drop_table('addresses')
    # ### end Alembic commands ###
