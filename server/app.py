#!/usr/bin/env python3

# Standard library imports

# Remote library imports
from flask import request, jsonify, make_response, session
from flask_restful import Resource

# Local imports
from config import app, db, api
from models import Ingredient, Meal, User, meal_ingredient


# Views go here!

@app.route('/')
def index():
    return '<h1>Phase 4 Project Server</h1>'

class CheckSession(Resource):
    def get(self):
        if session['user_id']:
            return make_response(jsonify({'id':1, 'username': 'admin'}), 200)        
        return {'error': '401'}, 401


class Signup(Resource):
    def post(self):
        return make_response(jsonify({'id': 1}), 201)

class Login(Resource):
    def post(self):
        data = request.get_json()
        user = User.query.filter_by(username = data.get('username')).first()
        if user and user.authenticate(data.get('password')):
            session['user_id'] = user.id
            return make_response(jsonify({'id': 1}), 201)
        return {'error': '401'}, 401
    
class Logout(Resource):
    def delete(self):
        session['user_id'] = None 
        return {}, 204


class Meals(Resource):
    def get(self):
        meals =  [m.to_dict() for m in Meal.query.all()]
        return make_response(jsonify(meals), 200)

class MealAndIngredient(Resource):
    def delete(self, meal_id, ingredient_id):
        try: 
            db.session.query(meal_ingredient).filter_by(meal_id = meal_id, ingredient_id =ingredient_id ).delete()
            db.session.commit()
            return {}, 200
        except e:
            print(e)
            return {}, 404
    
    def post(self, meal_id, ingredient_id):
        ingredient_id = request.get_json().get('ingredient_id')
        try:
            meal = Meal.query.filter_by(id = meal_id).first()
            ingredient = Ingredient.query.filter_by(id = ingredient_id).first()
            meal.ingredients.append(ingredient)
            db.session.commit()
            return make_response(jsonify(meal.to_dict()), 201)
        except e:
            print(e)
            return {}, 400

class Ingredients(Resource):
    def get(self):
        ingredients = [i.to_dict() for i in Ingredient.query.all()]
        return make_response(jsonify(ingredients), 200)

    def post(self):
        data = request.get_json()
        newIngredient = Ingredient(name=data.get('name'), user_id = session['user_id'])
        try:
            db.session.add(newIngredient)
            db.session.commit()
            return make_response(newIngredient.to_dict(), 201)
        except IntegrityError:
            return {'error': '422'}, 422

    def delete(self):
        id = request.get_json()['id']
        Ingredient.query.filter_by(id=id).delete()
        db.session.commit()
        return {}, 204
        

api.add_resource(CheckSession, '/api/check_session', endpoint='/api/check_session')
api.add_resource(Ingredients, '/api/ingredients', endpoint='/api/ingredients')
api.add_resource(Meals, '/api/meals', endpoint='/api/meals')
api.add_resource(MealAndIngredient, '/api/meals/<int:meal_id>/ingredients/<int:ingredient_id>', endpoint='/api/meals/id/ingredient/id')
api.add_resource(Signup, '/api/signup', endpoint='/api/signup')
api.add_resource(Login, '/api/login', endpoint='/api/login')
api.add_resource(Logout, '/api/logout', endpoint='/api/logout')

if __name__ == '__main__':
    app.run(port=5555, debug=True)

