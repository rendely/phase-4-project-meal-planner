from flask import request, jsonify, make_response, session
from flask_restful import Resource
from sqlalchemy.exc import IntegrityError
from server.config import app, db, api
from server.models.models import User

@app.before_request
def check_if_logged_in():
    if not session.get('user_id') and \
       not request.endpoint in ['index', 'static', '/','/api/login', '/api/signup']:
        print(request.endpoint)
        return {'error': 'Unauthorized'}, 401

class UserById(Resource):
    def get(self, id):
        user = User.query.filter_by(id=id).first()
        if user:
            return make_response(user.to_dict(), 200)
        else:
            return {}, 404
    
    def delete(self, id):
        User.query.filter_by(id=id).delete()
        return {}, 204


class CheckSession(Resource):
    def get(self):
        if session['user_id']:
            return make_response(jsonify({'id':1, 'username': 'admin'}), 200)        
        return {'error': 'Unauthorized'}, 401

class Signup(Resource):
    def post(self):
        data = request.get_json()
        username = data.get('username')
        password = data.get('password')
        try: 
            user = User(username=username)
            user.password_hash = password
            db.session.add(user)
            db.session.commit()
            session['user_id'] = user.id
            return make_response(jsonify(user.to_dict()), 201)
        except (IntegrityError, ValueError):
            return {'error': '422'}, 422        

class Login(Resource):
    def post(self):
        data = request.get_json()
        user = User.query.filter_by(username = data.get('username')).first()
        if user and user.authenticate(data.get('password')):
            session['user_id'] = user.id
            return make_response(jsonify({'id': 1}), 201)
        return {'error': 'Unauthorized'}, 401
    
class Logout(Resource):
    def delete(self):
        session['user_id'] = None 
        return {}, 204

api.add_resource(UserById, '/api/user/<int:id>', endpoint='/api/user/id')
api.add_resource(CheckSession, '/api/check_session', endpoint='/api/check_session')
api.add_resource(Signup, '/api/signup', endpoint='/api/signup')
api.add_resource(Login, '/api/login', endpoint='/api/login')
api.add_resource(Logout, '/api/logout', endpoint='/api/logout')