from flask import request, session
from flask_restful import Resource
from ..config import api, db
from ..models import User, Podcast, follows

class Follow(Resource):
    def post(self):
        user = User.query.filter_by(id=session['user_id']).first()
        r = request.json
        podcast_id = r['id']
        podcast = Podcast.query.filter_by(id=podcast_id).first()
        if r['followed'] is False:
            user.followed_podcasts.append(podcast)
        else:
            user.followed_podcasts.remove(podcast)            
        db.session.commit()
        return {'followed': r['followed']}, 201

api.add_resource(Follow, '/api/follow')