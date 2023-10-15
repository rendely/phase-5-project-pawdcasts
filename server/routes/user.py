from flask import session, request
from flask_restful import Resource
from config import api, db
from models import User 

class CheckAuth(Resource):
    def get(self):
        if session.get('user_id'):
            return {'user_id': session.get('user_id')}, 201

        return {'error': 'Unauthorized'}, 401

api.add_resource(CheckAuth, '/api/check_auth')

class Login(Resource):
    def post(self):
        data = request.get_json()
        user = User.query.filter_by(email = data.get('email')).first()
        if user and user.authenticate(data.get('password')):
            session['user_id'] = user.id
            return {'user_id': user.id, 'user_name': user.name}, 201
        return {'error': 'Unauthorized'}, 401

api.add_resource(Login, '/api/login')        