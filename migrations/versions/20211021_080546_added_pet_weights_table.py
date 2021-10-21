"""added pet-weights table

Revision ID: bbb60b634a0f
Revises: 1233fbba4a92
Create Date: 2021-10-21 08:05:46.619218

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = 'bbb60b634a0f'
down_revision = '1233fbba4a92'
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.create_table('pet_weights',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('pet_id', sa.Integer(), nullable=False),
    sa.Column('weight', sa.Float(), nullable=False),
    sa.Column('created_at', sa.DateTime(), nullable=False),
    sa.ForeignKeyConstraint(['pet_id'], ['pets.id'], ),
    sa.PrimaryKeyConstraint('id')
    )
    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.drop_table('pet_weights')
    # ### end Alembic commands ###
