#!/usr/bin/env python3

# Standard library imports

# Remote library imports
from flask import request, jsonify, make_response
from flask_restful import Resource

# Local imports
from config import app, db, api
# Add your model imports


# Views go here!

@app.route('/')
def index():
    return '<h1>Phase 4 Project Server</h1>'

class Signup(Resource):
    def post(self):
        return make_response(jsonify({'id': 1}), 201)

class Login(Resource):
    def post(self):
        return make_response(jsonify({'id': 1}), 201)

class Ingredients(Resource):
    def get(self):
        return make_response(jsonify([{ 'id': 1, 'name': 'Pasta sauce' },{ 'id': 2, 'name': 'Pasta noodles' }]), 200)

api.add_resource(Ingredients, '/api/ingredients', endpoint='/api/ingredients')
api.add_resource(Signup, '/api/signup', endpoint='/api/signup')
api.add_resource(Login, '/api/login', endpoint='/api/login')

if __name__ == '__main__':
    app.run(port=5555, debug=True)

