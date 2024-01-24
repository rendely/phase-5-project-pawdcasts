from datetime import datetime as dt
import requests
from flask import request, session
from flask_restful import Resource
from ..config import api, db
from ..models import User, Podcast, Episode, follows
from ..rss_helper import get_feed_episodes

cache_duration_secs = 600

class Feed(Resource):
    def get(self):
        followed_podcasts = User.query.filter_by(id=session['user_id']).first().followed_podcasts
        episodes = []
        updated_time = round(dt.now().timestamp())

        for podcast in followed_podcasts:
            print(f'{podcast.last_updated_time}=')
            print(f'{updated_time - cache_duration_secs}=')
            if podcast.feed_url is not None and podcast.last_updated_time < updated_time - cache_duration_secs:
                episodes += get_feed_episodes(podcast.feed_url, podcast)
            else:
                episodes.extend(podcast.episodes)
            podcast.last_updated_time = updated_time

        db.session.add_all(followed_podcasts)
        db.session.commit()

        episodes.sort(key=lambda x: x.publish_date, reverse=True)
        return [e.to_dict() for e in episodes[0:30]], 200


api.add_resource(Feed, '/api/feed')