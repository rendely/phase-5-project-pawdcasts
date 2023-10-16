import requests
from flask import request, session
from flask_restful import Resource
from config import api, db
from models import User, Podcast, follows
import json

class Search(Resource):
    def get(self):
        base_url = 'https://itunes.apple.com/search?media=podcast&limit=10'        
        query = request.args.get('q')
        url = base_url + '&term=' + query

        # with open('server/testresults.json', 'r') as f:
        #     testjson = f.read()
        #     data = json.loads(testjson), 200
        
        r = requests.get(url)
        data = json.loads(r.text), 200
        results = [{"itunes_id": r.get('collectionId'), 
                    "title": r.get('collectionName'),
                    "image_url": r.get('artworkUrl600'),
                    "itunes_url": r.get('collectionViewUrl'),
                    "feedUrl": r.get('feedUrl'),
                    "genre": r.get('primaryGenreName'),
                    "track_count": r.get('trackCount')
                    } 
                    for r in data[0]['results']]
        
        updated_results = []
        for p in results:
            db_podcast = Podcast.query.filter_by(itunes_id = p['itunes_id']).first()
            if db_podcast:
                updated_results.append(db_podcast)
            else:
                podcast = Podcast(
                    title=p['title'], 
                    feed_url=p['feedUrl'],
                    itunes_id = p['itunes_id'],
                    image_url = p['image_url'],
                    )
                db.session.add(podcast)
                updated_results.append(podcast)
        db.session.commit()
            
        return [p.to_dict() for p in updated_results], 200
    
api.add_resource(Search, '/api/search')