import requests
import xml.etree.ElementTree as ET
from flask import request, session
from flask_restful import Resource
from config import api, db
from models import User, Podcast, Episode, follows
from datetime import datetime 


class Feed(Resource):
    def get(self):
        followed_podcasts = User.query.filter_by(id=session['user_id']).first().followed_podcasts
        episodes = []
        for podcast in followed_podcasts:
            episodes += get_feed_episodes(podcast.feed_url)

        date_format = "%a, %d %b %Y %H:%M:%S %z"
        episodes.sort(key=lambda x: datetime.strptime(x['date'].replace('GMT', '+0000'), date_format))
        return episodes[0:10], 200
        # return [f.to_dict() for f in followed_podcasts], 200


api.add_resource(Feed, '/api/feed')

def get_feed_episodes(url):
    r = requests.get(url)
    root = ET.fromstring(r.text)
    items = root.findall('.//item')
    namespace = {'itunes': 'http://www.itunes.com/dtds/podcast-1.0.dtd'}
    episodes = []
    for item in items:
        title = item.find('title').text
        pubDate = item.find('pubDate').text
        download_link_element = item.find('enclosure')
        mp3 = download_link_element.get('url') if download_link_element is not None else ''
        description_element = item.find('.//itunes:subtitle', namespace)
        description = description_element if description_element else ''
            
        episodes.append({'title': title, 'date': pubDate, 'mp3': mp3, 'description': description})

    return episodes
