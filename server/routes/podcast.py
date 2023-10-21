import requests
from sqlalchemy.exc import IntegrityError
from flask import request, session
from flask_restful import Resource
from config import api, db
from models import User, Podcast, Episode, follows
from datetime import datetime 
from rss_helper import get_feed_episodes

class PodcastById(Resource):
    def get(self, id):
        podcast = Podcast.query.filter_by(id=id).first()       
        episodes = get_feed_episodes(podcast.feed_url, podcast)
        episodes.sort(key=lambda x: x.publish_date, reverse=True)
        episodes_dicts = [e.to_dict() for e in episodes[0:30]]
        return {'podcast': podcast.to_dict(), 'episodes': episodes_dicts}, 200

api.add_resource(PodcastById, '/api/podcast/<int:id>')