import requests
from sqlalchemy.exc import IntegrityError
from flask import request, session
from flask_restful import Resource
from config import api, db
from models import User, Podcast, Episode, follows
from datetime import datetime 
from rss_helper import get_feed_episodes

class EpisodeById(Resource):
    def get(self, id):
        episode = Episode.query.filter_by(id=id).first()    
        print(episode)          
        return episode.to_dict(), 200

api.add_resource(EpisodeById, '/api/episode/<int:id>')