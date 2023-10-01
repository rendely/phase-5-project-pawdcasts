import os 
import requests
import xml.etree.ElementTree as ET
import json
from flask import Flask, jsonify, request
from flask_restful import Resource, Api
from flask_cors import CORS
from dotenv import load_dotenv

load_dotenv()

app = Flask(__name__)

api = Api(app)
CORS(app)

# @app.route('/')
# def index():
#     DATABASE_URI = os.environ.get('DATABASE_URI')
#     return DATABASE_URI

class Search(Resource):
    def get(self):
        base_url = 'https://itunes.apple.com/search?media=podcast&limit=10'        
        query = request.args.get('q')
        url = base_url + '&term=' + query
        import os
        print(os.getcwd())
        with open('server/testresults.json', 'r') as f:
            testjson = f.read()
            data = json.loads(testjson), 200
        # r = requests.get(url)
        # data = json.loads(r.text), 200
        results = [{"id": r.get('collectionId'), 
                    "name": r.get('collectionName'),
                    "image": r.get('artworkUrl100'),
                    "itunes_url": r.get('collectionViewUrl'),
                    "genre": r.get('primaryGenreName'),
                    "track_count": r.get('trackCount')
                    } 
                    for r in data[0]['results']]
        return results, 200
        # return query, 200
        return [{ 'id': 1, 'name': 'Hiii' }, { 'id': 2, 'name': 'yooo' }], 200

api.add_resource(Search, '/api/search')

class Follow(Resource):
    def post(self):
        r = request.json
        print(r)
        return {'id': r.get('id')}, 201

api.add_resource(Follow, '/api/follow')

class Xml(Resource):
    def get(self):
        r = requests.get('https://wakingup.libsyn.com/rss')
        root = ET.fromstring(r.text)
        items = root.findall('.//item')
        podcasts = []
        for item in items:
            title = item.find('title').text
            pubDate = item.find('pubDate').text
            download_link = item.find('enclosure')
            mp3 = ''
            if download_link is not None:
                mp3 = download_link.get('url')
            podcasts.append({'title': title, 'date': pubDate, 'mp3': mp3})

        return podcasts, 200 
   
api.add_resource(Xml, '/api/xml')

if __name__ == '__main__':
    app.run(port=5555, debug=True)