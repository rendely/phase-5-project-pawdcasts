import requests
from sqlalchemy.exc import IntegrityError
from flask import request, session
from flask_restful import Resource
from config import api, db
from models import User, Podcast, Episode, follows
from datetime import datetime 

class PodcastById(Resource):
    def get(self, id):
        print(id)
        podcast = Podcast.query.filter_by(id=id).first()       
        episodes = get_feed_episodes(podcast.feed_url, podcast)
        episodes.sort(key=lambda x: x.publish_date, reverse=True)
        episodes_dicts = [e.to_dict() for e in episodes[0:30]]
        return {'podcast': podcast.to_dict(), 'episodes': episodes_dicts}, 200

api.add_resource(PodcastById, '/api/podcast/<int:id>')

import xml.etree.ElementTree as ET
def get_feed_episodes(url, podcast):
    r = requests.get(url)
    root = ET.fromstring(r.text)
    items = root.findall('.//item')
    namespace = {'itunes': 'http://www.itunes.com/dtds/podcast-1.0.dtd'}
    existing_episodes = Episode.query.filter_by(podcast_id=podcast.id).all()
    existing_guids = [episode.guid for episode in existing_episodes]
    episodes = []
    for item in items[0:10]:
        title = item.find('title').text
        pubDate = item.find('pubDate').text
        download_link_element = item.find('enclosure')
        mp3 = download_link_element.get('url') if download_link_element is not None else ''
        description_element = item.find('.//itunes:subtitle', namespace)
        description = description_element.text if description_element is not None else ''   
        guid = item.find('guid').text

        if guid not in existing_guids:
            episodes.append(Episode(
                title=title,
                guid=guid,
                publish_date=parse_date(pubDate),
                description=description,
                podcast_id=podcast.id,
                source_url=mp3
            ))

    try:
        db.session.add_all(episodes)
        db.session.commit()
        return episodes + existing_episodes
    except IntegrityError as e: 
        print(e)
        return []
    
        
def parse_date(date_string):
     date_format = "%a, %d %b %Y %H:%M:%S %z"
     return datetime.strptime(date_string.replace('GMT', '+0000'), date_format)
        