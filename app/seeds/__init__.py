from flask.cli import AppGroup

from .foods import seed_foods, undo_foods
from .pets import seed_pets, undo_pets
from .users import seed_users, undo_users

# Creates a seed group to hold our commands
# So we can type `flask seed --help`
seed_commands = AppGroup("seed")


# Creates the `flask seed all` command
@seed_commands.command("all")
def seed():
    seed_users()
    # Add other seed functions here
    seed_pets()
    seed_foods()


# Creates the `flask seed undo` command
@seed_commands.command("undo")
def undo():
    undo_users()
    # Add other undo functions here
    undo_pets()
    undo_foods()
