"""added user id to meal model

Revision ID: ec11c25325f6
Revises: 1a609501f3f7
Create Date: 2021-10-22 16:00:05.938112

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = 'ec11c25325f6'
down_revision = '1a609501f3f7'
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.add_column('meals', sa.Column('user_id', sa.Integer(), nullable=False))
    op.create_foreign_key(None, 'meals', 'users', ['user_id'], ['id'])
    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.drop_constraint(None, 'meals', type_='foreignkey')
    op.drop_column('meals', 'user_id')
    # ### end Alembic commands ###