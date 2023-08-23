from flask import request, jsonify, make_response, session
from flask_restful import Resource
from config import app, db, api
from models.models import Meal, meal_ingredient

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

api.add_resource(Meals, '/api/meals', endpoint='/api/meals')
api.add_resource(MealById, '/api/meals/<int:id>', endpoint='/api/meals/id')