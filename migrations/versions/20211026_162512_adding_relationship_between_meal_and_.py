"""adding relationship between meal and food to allow cascade delete from food to meal

Revision ID: 862226a3f545
Revises: 52e74d1d229e
Create Date: 2021-10-26 16:25:12.150509

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = '862226a3f545'
down_revision = '52e74d1d229e'
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.drop_column('foods', 'created_at')
    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.add_column('foods', sa.Column('created_at', sa.DATE(), autoincrement=False, nullable=False))
    # ### end Alembic commands ###