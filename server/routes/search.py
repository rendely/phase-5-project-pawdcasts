import requests
from flask import request, session
from flask_restful import Resource
from config import api
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
        results = [{"id": r.get('collectionId'), 
                    "name": r.get('collectionName'),
                    "image": r.get('artworkUrl600'),
                    "itunes_url": r.get('collectionViewUrl'),
                    "genre": r.get('primaryGenreName'),
                    "track_count": r.get('trackCount')
                    } 
                    for r in data[0]['results']]
        return results, 200

api.add_resource(Search, '/api/search')