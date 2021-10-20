"""commented out neutered field to force changes

Revision ID: 11fa0707cd90
Revises: 08498dca2209
Create Date: 2021-10-20 15:17:59.247767

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = '11fa0707cd90'
down_revision = '08498dca2209'
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.drop_column('pets', 'neutered')
    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.add_column('pets', sa.Column('neutered', sa.BOOLEAN(), autoincrement=False, nullable=False))
    # ### end Alembic commands ###
