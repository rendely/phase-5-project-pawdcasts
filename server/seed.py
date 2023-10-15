import datetime

from app import app, db
from models import *

def run_seed():
    with app.app_context():
        print("Starting seed...")

        db.session.query(follows).delete()
        User.query.delete()
        Podcast.query.delete()
        Episode.query.delete()
        db.session.commit()

        print("Finished deletions...")

        print("Adding a user...")

        user = User(name='matt', email='matt@matt.com')
        db.session.add(user)
        db.session.commit()

if __name__ == '__main__':
    run_seed()