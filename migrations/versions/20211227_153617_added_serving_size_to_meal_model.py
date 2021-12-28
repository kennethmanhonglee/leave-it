"""added serving size to meal model

Revision ID: 8ee103345189
Revises: 7b24b8dbedd2
Create Date: 2021-12-27 15:36:17.312321

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = '8ee103345189'
down_revision = '7b24b8dbedd2'
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.add_column('meals', sa.Column('serving_size', sa.Integer(), nullable=False))
    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.drop_column('meals', 'serving_size')
    # ### end Alembic commands ###