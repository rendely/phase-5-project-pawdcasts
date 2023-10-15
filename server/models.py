from config import db
from sqlalchemy_serializer import SerializerMixin


follows = db.Table(
  'follows',
  db.Model.metadata,
  db.Column('user_id', db.ForeignKey('users.id'), primary_key=True),
  db.Column('podcast_id', db.ForeignKey('podcasts.id'), primary_key=True),
  extend_existing=True
)

class User(db.Model, SerializerMixin):

  __tablename__ = 'users'
  # serialize_rules = ('-user.ingredients', '-meals.ingredients', '-user.meals')

  id = db.Column(db.Integer, primary_key = True)
  name = db.Column(db.String, nullable=False)
  email = db.Column(db.String, nullable=False)
  followed_podcasts = db.relationship('Podcast', secondary=follows)

  def __repr__(self):
    return f'<User {self.name=}, {self.email=}, {self.followed_podcasts=}>'

class Podcast(db.Model, SerializerMixin):

  __tablename__ = 'podcasts'
  # serialize_rules = ('-user.ingredients', '-meals.ingredients', '-user.meals')

  id = db.Column(db.Integer, primary_key = True)
  title = db.Column(db.String, nullable=False)
  

  def __repr__(self):
    return f'<Podcast {self.title=}>'


