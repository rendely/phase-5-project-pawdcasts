import os 
from config import app
from flask import jsonify, request, session 

from routes.search import *
from routes.user import *
from routes.follow import *
from routes.feed import *
from routes.podcast import *

@app.before_request
def check_api_authentication():
    if request.path.startswith('/api') and request.path != '/api/login':
        if 'user_id' not in session:
            return jsonify({'error': 'Unauthorized'}), 401

if __name__ == '__main__':
    app.run(port=5555, debug=True)