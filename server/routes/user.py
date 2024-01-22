from flask import session, request
from flask_restful import Resource
from ..config import api, db
from ..models import User 

class CheckAuth(Resource):
    def get(self):
        if session.get('user_id'):
            user = User.query.filter_by(id=session['user_id']).first()
            if user: 
                return user.to_dict(), 200

        return {'error': 'Unauthorized'}, 401

api.add_resource(CheckAuth, '/api/check_auth')

class Login(Resource):
    def post(self):
        data = request.get_json()
        user = User.query.filter_by(email = data.get('email')).first()
        if user and user.authenticate(data.get('password')):
            session.permanent = True
            session['user_id'] = user.id
            return user.to_dict(), 201
            
        return {'error': 'Unauthorized'}, 401

api.add_resource(Login, '/api/login')  

class Signup(Resource):
    def post(self):
        data = request.get_json()
        if data.get('password') != data.get('passwordConfirm'):
            return {'error': 'Passwords must match'}, 401
            
        user = User.query.filter_by(email = data.get('email')).first()
        if user:
            return {'error': 'Account exists'}, 401
        
        name = data.get('email').split('@')[0]
        user = User(name=name, email=data.get('email'))
        user.password_hash = data.get('password')
        db.session.add(user)
        db.session.commit()
        session.permanent = True
        session['user_id'] = user.id
        return user.to_dict(), 201


api.add_resource(Signup, '/api/signup')  

class Logout(Resource):
    def get(self):
        session['user_id'] = None
        return {}, 200

api.add_resource(Logout, '/api/logout')               