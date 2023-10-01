import os 
import requests
import xml.etree.ElementTree as ET
from flask import Flask, jsonify
from flask_restful import Resource, Api
from dotenv import load_dotenv
load_dotenv()

app = Flask(__name__)

api = Api(app)

@app.route('/')
def index():
    DATABASE_URI = os.environ.get('DATABASE_URI')
    return DATABASE_URI

class XML(Resource):
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
   
api.add_resource(XML, '/api/xml')

if __name__ == '__main__':
    app.run(port=5555, debug=True)