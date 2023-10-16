import os 
import requests
import xml.etree.ElementTree as ET
from config import app, api
from flask_restful import Resource
from flask import jsonify, request, session 
from models import *
from routes.search import *
from routes.user import *
from routes.follow import *

@app.before_request
def check_api_authentication():
    if request.path.startswith('/api') and request.path != '/api/login':
        if 'user_id' not in session:
            return jsonify({'error': 'Unauthorized'}), 401

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