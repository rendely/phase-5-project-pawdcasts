from config import db, bcrypt
from sqlalchemy_serializer import SerializerMixin
from sqlalchemy.ext.hybrid import hybrid_property

follows = db.Table(
    'follows',
    db.Model.metadata,
    db.Column('user_id', db.ForeignKey('users.id'), primary_key=True),
    db.Column('podcast_id', db.ForeignKey('podcasts.id'), primary_key=True),
    extend_existing=True
)

class User(db.Model, SerializerMixin):

    __tablename__ = 'users'
    serialize_rules = ('-_password_hash',)

    id = db.Column(db.Integer, primary_key = True)
    name = db.Column(db.String, nullable=False)
    email = db.Column(db.String, nullable=False)
    followed_podcasts = db.relationship('Podcast', secondary=follows)
    _password_hash = db.Column(db.String)

    @hybrid_property
    def password_hash(self):
        raise AttributeError('Password hashes may not be viewed.')
  
    @password_hash.setter
    def password_hash(self, password):
        self._password_hash =  bcrypt.generate_password_hash(password).decode('utf-8')

    def authenticate(self, password):
        return bcrypt.check_password_hash(self._password_hash, password)

    def __repr__(self):
        return f'<User {self.name=}, {self.email=}, {self.followed_podcasts=}>'

class Podcast(db.Model, SerializerMixin):

    __tablename__ = 'podcasts'

    id = db.Column(db.Integer, primary_key = True)
    itunes_id = db.Column(db.Integer)
    title = db.Column(db.String, nullable=False)
    description = db.Column(db.String)
    feed_url = db.Column(db.String)
    image_url = db.Column(db.String)
    episodes = db.relationship('Episode', back_populates='podcast')
    

    def __repr__(self):
        return f'<Podcast {self.title=}>'

class Episode(db.Model, SerializerMixin):

    __tablename__ = 'episodes'

    serialize_rules=('-podcast.episodes',)

    id = db.Column(db.Integer, primary_key = True)
    guid = db.Column(db.String, unique=True, nullable=False)
    title = db.Column(db.String)
    description = db.Column(db.String)
    duration_seconds = db.Column(db.Integer)
    source_url = db.Column(db.String)
    publish_date = db.Column(db.Date)
    podcast_id = db.Column(db.Integer, db.ForeignKey('podcasts.id'), nullable=False)
    podcast = db.relationship('Podcast', back_populates='episodes')

    def __repr__(self):
        return f'<Episode {self.title=}>'

