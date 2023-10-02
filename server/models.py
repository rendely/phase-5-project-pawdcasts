from config import db
from sqlalchemy_serializer import SerializerMixin

class User(db.Model, SerializerMixin):

  __tablename__ = 'users'
  # serialize_rules = ('-user.ingredients', '-meals.ingredients', '-user.meals')

  id = db.Column(db.Integer, primary_key = True)
  name = db.Column(db.String, nullable=False)
  email = db.Column(db.String, nullable=False)
  follows = db.relationship('Follow', back_populates='user')

  def __repr__(self):
    return f'<User {self.name=}, {self.email=}>'

class Follow(db.Model, SerializerMixin):

  __tablename__ = 'follows'
  serialize_rules = ('-user.ingredients', '-meals.ingredients', '-user.meals')

  id = db.Column(db.Integer, primary_key = True)
  itunes_id = db.Column(db.Integer, nullable=False)
  user = db.relationship('User', back_populates='follows')
  user_id = db.Column(db.Integer, db.ForeignKey('users.id'), nullable=False)

  def __repr__(self):
    return f'<Follow {self.user_id=}, {self.itunes_id=}>'