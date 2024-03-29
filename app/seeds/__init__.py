from flask.cli import AppGroup
from .users import seed_users, undo_users
from.questions import seed_questions, undo_questions
from .answers import seed_answers, undo_answers
from .tags import seed_tags, undo_tags
from .votes import seed_votes, undo_votes
from .bulk_votes import seed_bulk_votes
from .bulk_questions import seed_bulk_questions, undo_questions
from .bulk_answers import seed_bulk_answers

from app.models.db import db, environment, SCHEMA

# Creates a seed group to hold our commands
# So we can type `flask seed --help`
seed_commands = AppGroup('seed')


# Creates the `flask seed all` command
@seed_commands.command('all')
def seed():
    if environment == 'production':
        # Before seeding in production, you want to run the seed undo
        # command, which will  truncate all tables prefixed with
        # the schema name (see comment in users.py undo_users function).
        # Make sure to add all your other model's undo functions below
        undo_users()
        undo_tags()
        undo_questions()
        undo_answers()
        undo_votes()
    seed_users()
    seed_tags()
    seed_bulk_questions()
    seed_questions()
    seed_answers()
    seed_bulk_answers()
    seed_bulk_votes()
    # Add other seed functions here


# Creates the `flask seed undo` command
@seed_commands.command('undo')
def undo():
    undo_users()
    undo_tags()
    undo_questions()
    undo_answers()
    undo_votes()
    # Add other undo functions here
