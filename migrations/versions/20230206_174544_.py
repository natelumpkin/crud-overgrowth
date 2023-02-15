"""empty message

Revision ID: 25fb14c2ee8a
Revises: 45e2fb276503
Create Date: 2023-02-06 17:45:44.834175

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = '25fb14c2ee8a'
down_revision = '45e2fb276503'
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.add_column('answers', sa.Column('totalScore', sa.Integer(), nullable=True))
    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.drop_column('answers', 'totalScore')
    # ### end Alembic commands ###