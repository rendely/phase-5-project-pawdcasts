import requests
from flask import request, session
from flask_restful import Resource
from ..config import api, db
from ..models import User, Podcast, Episode, follows
from ..rss_helper import get_feed_episodes

class Feed(Resource):
    def get(self):
        followed_podcasts = User.query.filter_by(id=session['user_id']).first().followed_podcasts
        episodes = []
        for podcast in followed_podcasts:
            episodes += get_feed_episodes(podcast.feed_url, podcast)

        episodes.sort(key=lambda x: x.publish_date, reverse=True)
        return [e.to_dict() for e in episodes[0:10]], 200


api.add_resource(Feed, '/api/feed')