from concurrent.futures import ThreadPoolExecutor, as_completed
from datetime import datetime as dt
from flask import session
from flask_restful import Resource
from server.config import api, db
from server.models import User
from server.rss_helper import get_feed_episodes

cache_duration_secs = 600

class Feed(Resource):
    def get(self):
        followed_podcasts = User.query.filter_by(id=session['user_id']).first().followed_podcasts
        episodes = []
        updated_time = round(dt.now().timestamp())

        # Using ThreadPoolExecutor to handle get_feed_episodes concurrently
        with ThreadPoolExecutor() as executor:
            future_to_podcast = {
                executor.submit(get_feed_episodes, podcast.feed_url, podcast): podcast
                for podcast in followed_podcasts
                if podcast.feed_url is not None and podcast.last_updated_time < updated_time - cache_duration_secs
            }

            for future in as_completed(future_to_podcast):
                podcast = future_to_podcast[future]
                try:
                    episodes += future.result()
                except Exception as e:
                    print(f"An error occurred while fetching episodes for {podcast.feed_url}: {e}")
                podcast.last_updated_time = updated_time

        # Add episodes from cached podcasts
        for podcast in followed_podcasts:
            if podcast.feed_url is None or podcast.last_updated_time >= updated_time - cache_duration_secs:
                episodes.extend(podcast.episodes)

        # Commit changes of updating last updated time
        db.session.add_all(followed_podcasts)
        db.session.commit()

        episodes.sort(key=lambda x: x.publish_date, reverse=True)
        return [e.to_dict() for e in episodes[0:30]], 200


api.add_resource(Feed, '/api/feed')
