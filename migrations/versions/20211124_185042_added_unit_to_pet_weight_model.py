"""added unit to pet weight model

Revision ID: 7b24b8dbedd2
Revises: 9f4e9ab8f480
Create Date: 2021-11-24 18:50:42.360419

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = '7b24b8dbedd2'
down_revision = '9f4e9ab8f480'
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.add_column('pet_weights', sa.Column('unit', sa.String(), nullable=False))
    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.drop_column('pet_weights', 'unit')
    # ### end Alembic commands ###