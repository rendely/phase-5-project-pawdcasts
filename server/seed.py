import datetime

from .app import app, db
from .models import *

def run_seed():
    with app.app_context():
        print("Starting seed...")

        db.session.query(follows).delete()
        Comment.query.delete()
        History.query.delete()
        Episode.query.delete()
        Podcast.query.delete()
        User.query.delete()
        db.session.commit()

        print("Finished deletions...")

        print("Adding a user...")

        user = User(name='Matt', email='matt@matt.com')
        user.password_hash = 'matt'
        db.session.add(user)

        user = User(name='Tom', email='tom@tom.com')
        user.password_hash = 'tom'
        db.session.add(user)
        db.session.commit()

if __name__ == '__main__':
    run_seed()