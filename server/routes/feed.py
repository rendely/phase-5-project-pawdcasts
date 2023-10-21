import requests
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
            episodes += get_feed_episodes(podcast.feed_url, podcast)

        episodes.sort(key=lambda x: x.publish_date, reverse=True)
        return [e.to_dict() for e in episodes[0:10]], 200


api.add_resource(Feed, '/api/feed')


import xml.etree.ElementTree as ET
def get_feed_episodes(url, podcast):
    r = requests.get(url)
    root = ET.fromstring(r.text)
    items = root.findall('.//item')
    namespace = {'itunes': 'http://www.itunes.com/dtds/podcast-1.0.dtd'}
    episodes = []
    for item in items[0:10]:
        title = item.find('title').text
        pubDate = item.find('pubDate').text
        download_link_element = item.find('enclosure')
        mp3 = download_link_element.get('url') if download_link_element is not None else ''
        description_element = item.find('.//itunes:subtitle', namespace)
        description = description_element.text if description_element is not None else ''    

        episodes.append(Episode(
            title=title,
            publish_date=parse_date(pubDate),
            description=description,
            podcast_id=podcast.id,
            source_url=mp3
        ))

    db.session.add_all(episodes)
    db.session.commit()
    return episodes 
        
def parse_date(date_string):
     date_format = "%a, %d %b %Y %H:%M:%S %z"
     return datetime.strptime(date_string.replace('GMT', '+0000'), date_format)
        # episodes.sort(key=lambda x: datetime.strptime(x['date'].replace('GMT', '+0000'), date_format), reverse=True)