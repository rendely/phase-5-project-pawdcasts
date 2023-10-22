import requests
from sqlalchemy.exc import IntegrityError
from flask import request, session
from flask_restful import Resource
from ..config import api, db
from ..models import User, Podcast, Episode, History, follows
from datetime import datetime 
from ..rss_helper import get_feed_episodes

class EpisodeById(Resource):
    def get(self, id):
        episode = Episode.query.filter_by(id=id).first()    
        history = History.query.filter_by(episode_id=id, user_id=session['user_id']).first()
        if history is None:
            history = History(
                episode_id=id,
                user_id=session['user_id'],
                current_time=0
            )
            db.session.add(history)
            db.session.commit()
        result = episode.to_dict()
        result['current_time'] = history.current_time
        return result, 201
    
    def patch(self, id):
        history = History.query.filter_by(episode_id=id, user_id=session['user_id']).first()
        history.current_time = request.json['current_time']
        db.session.commit()
        return {}, 200

api.add_resource(EpisodeById, '/api/episode/<int:id>')