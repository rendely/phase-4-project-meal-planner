#!/usr/bin/env python3

# Remote library imports
from flask import request, jsonify, make_response, session, render_template
from flask_restful import Resource
from datetime import datetime

# Local imports
from config import app, db, api
from models import Ingredient, Meal, User, meal_ingredient, MealPlan


# Views go here!

@app.errorhandler(404)
def not_found(e):
    return '404 Not found'

@app.route('/')
def index():
    return render_template("index.html")

@app.before_request
def check_if_logged_in():
    if not session.get('user_id') and \
       not request.endpoint in ['index', 'static', '/','/api/login', '/api/signup']:
        return {'error': 'Unauthorized'}, 401

class CheckSession(Resource):
    def get(self):
        if session['user_id']:
            return make_response(jsonify({'id':1, 'username': 'admin'}), 200)        
        return {'error': 'Unauthorized'}, 401


class Signup(Resource):
    def post(self):
        data = request.get_json()
        user = User(username=data.get('username'))
        user.password_hash = data.get('password')
        try: 
            db.session.add(user)
            db.session.commit()
            return make_response(jsonify({'id': 1}), 201)
        except IntegrityError:
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


class Meals(Resource):
    def get(self):
        meals =  [m.to_dict() for m in Meal.query.filter_by(user_id=session['user_id']).all()]
        return make_response(jsonify(meals), 200)
    
    def post(self):
        data = request.get_json()
        new_meal = Meal(name=data.get('name'), user_id=session['user_id'])
        try:
            db.session.add(new_meal)
            db.session.commit()
            return make_response(jsonify(new_meal.to_dict()), 201)
        except IntegrityError:
            return {'error': '422'}, 422

class MealPlans(Resource):
    def get(self):
        meal_plans = MealPlan.query.filter_by(user_id = session['user_id']).all()
        meal_plans_dicts = [mp.to_dict() for mp in meal_plans]
        return make_response(meal_plans_dicts, 200)
    
    def delete(self):
        MealPlan.query.filter_by(user_id = session['user_id']).delete()
        db.session.commit()
        return {}, 204

    def post(self):
        data = request.get_json()
        excluded_attrs = ['meal_plan_id', 'date']

        if data.get('meal_plan_id'):
            meal_plan = MealPlan.query.filter_by(id = data.get('meal_plan_id')).first()
        else:
            date = datetime.strptime(data['date'], '%Y-%m-%d').date()
            meal_plan = MealPlan(date=date, user_id=session['user_id'])
        for attr in data:
            if attr not in excluded_attrs:
                print(f'{attr=}, {type(data[attr])}')
                setattr(meal_plan,attr, None if data[attr] == '' else data[attr])
        try:
            db.session.add(meal_plan)
            db.session.commit()
            return make_response(meal_plan.to_dict(), 201)
        except IntegrityError:
            print(e)
            return {'error': '422'}, 422        

class MealById(Resource):
    def patch(self, id):
        meal = Meal.query.filter_by(id=id, user_id=session['user_id']).first()
        meal.name = request.get_json().get('name')
        db.session.commit()
        return make_response(meal.to_dict(), 200)
    
    def delete(self, id):
        try:
            Meal.query.filter_by(id=id, user_id=session['user_id']).delete()
            db.session.query(meal_ingredient).filter_by(meal_id = id).delete()
            db.session.commit()
            return {}, 200
        except IntegrityError:
            print(e)
            return {'error': '422'}, 422

class MealAndIngredient(Resource):
    def delete(self, meal_id, ingredient_id):
        try: 
            db.session.query(meal_ingredient).filter_by(meal_id = meal_id, ingredient_id =ingredient_id).delete()
            db.session.commit()
            return {}, 200
        except IntegrityError:
            print(e)
            return {'error': '422'}, 422
    
    def post(self, meal_id, ingredient_id):
        ingredient_id = request.get_json().get('ingredient_id')
        try:
            meal = Meal.query.filter_by(id = meal_id).first()
            ingredient = Ingredient.query.filter_by(id = ingredient_id).first()
            meal.ingredients.append(ingredient)
            db.session.commit()
            return make_response(jsonify(meal.to_dict()), 201)
        except IntegrityError:
            print(e)
            return {'error': '422'}, 422

class Ingredients(Resource):
    def get(self):
        ingredients = [i.to_dict() for i in Ingredient.query.filter_by(user_id = session['user_id']).all()]
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

    def patch(self):
        data = request.get_json()
        ingredient = Ingredient.query.filter_by(id=id).first()
        for attr in data:
            setattr(ingredient, attr, data[attr])
        try:
            db.session.commit()
            return make_response(ingredient.to_dict(), 201)
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
api.add_resource(MealById, '/api/meals/<int:id>', endpoint='/api/meals/id')
api.add_resource(MealPlans, '/api/meal_plans', endpoint='/api/meal_plans')
api.add_resource(MealAndIngredient, '/api/meals/<int:meal_id>/ingredients/<int:ingredient_id>', endpoint='/api/meals/id/ingredient/id')
api.add_resource(Signup, '/api/signup', endpoint='/api/signup')
api.add_resource(Login, '/api/login', endpoint='/api/login')
api.add_resource(Logout, '/api/logout', endpoint='/api/logout')

if __name__ == '__main__':
    app.run(port=5555, debug=True)
