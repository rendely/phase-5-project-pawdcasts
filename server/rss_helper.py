import xml.etree.ElementTree as ET
import requests 
from .models import Episode
from .config import db
from sqlalchemy.exc import IntegrityError
from datetime import datetime 

def get_feed_episodes(url, podcast):
    r = requests.get(url)
    root = ET.fromstring(r.text)
    items = root.findall('.//item')
    namespace = {'itunes': 'http://www.itunes.com/dtds/podcast-1.0.dtd', 'content': 'http://purl.org/rss/1.0/modules/content/'}
    existing_episodes = Episode.query.filter_by(podcast_id=podcast.id).all()
    existing_guids = {episode.guid: episode for episode in existing_episodes}
    episodes = []
    for item in items[0:10]:
        title = item.find('title').text
        pubDate = item.find('pubDate').text
        download_link_element = item.find('enclosure')
        mp3 = download_link_element.get('url') if download_link_element is not None else ''
        # description_element = item.find('.//itunes:subtitle', namespace)
        # description = description_element.text if description_element is not None else ''
                
        itunes_summary = item.find('.//itunes:summary', namespace).text if item.find('.//itunes:summary', namespace) is not None else ''
        
        description = item.find('description').text if item.find('description') is not None else ''
        
        content = item.find('.//content:encoded',namespace).text if item.find('.//content:encoded',namespace) is not None else ''

        
        if content != '':            
            final_description = content
        elif description != '':
            final_description = description
        else:
            final_description = itunes_summary

        guid = item.find('guid').text
        
        if guid not in existing_guids:
            episodes.append(Episode(
                title=title,
                guid=guid,
                publish_date=parse_date(pubDate),
                description=final_description,
                podcast_id=podcast.id,
                source_url=mp3
            ))
        else:
            updated_episode = existing_guids[guid]
            updated_episode.title = title
            updated_episode.description = final_description
            updated_episode.source_url = mp3
            episodes.append(updated_episode)

    try:
        db.session.add_all(episodes)
        db.session.commit()
        return episodes
    except IntegrityError as e: 
        print(e)
        return []
    
        
def parse_date(date_string):
     date_format = "%a, %d %b %Y %H:%M:%S %z"
     return datetime.strptime(date_string.replace('GMT', '+0000'), date_format)
        