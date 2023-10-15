from flask import session
from flask_restful import Resource
from config import api, db
from models import User 

class CheckAuth(Resource):
    def get(self):
        if session.get('user_id'):
            return {'user_id': session.get('user_id')}, 201

        return {'error': 'Unauthorized'}, 401

api.add_resource(CheckAuth, '/api/check_auth')