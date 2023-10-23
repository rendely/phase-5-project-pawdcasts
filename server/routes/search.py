import requests
from flask import request, session
from flask_restful import Resource
from ..config import api, db
from ..models import User, Podcast, follows
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
        itunes_ids = [p['itunes_id'] for p in results]
        existing_podcasts = Podcast.query.filter(Podcast.itunes_id.in_(itunes_ids)).all()
        podcasts_index = {pod.itunes_id: pod for pod in existing_podcasts}

        followed_podcasts = User.query.filter_by(id=session['user_id']).first().followed_podcasts
        followed_index = [p.id for p in followed_podcasts]

        new_podcasts = [
            Podcast(
                title=p['title'],
                feed_url=p['feedUrl'],
                itunes_id=p['itunes_id'],
                image_url=p['image_url'],
            )
            for p in results if p['itunes_id'] not in podcasts_index
        ]

        db.session.add_all(new_podcasts)
        db.session.commit()


        updated_podcasts = existing_podcasts + new_podcasts
        podcasts_dicts = [p.to_dict() for p in updated_podcasts]
        
        for podcast_dict in podcasts_dicts:
            podcast_dict['followed'] = podcast_dict['id'] in followed_index
        
        return podcasts_dicts, 200
    
api.add_resource(Search, '/api/search')