from flask import request, jsonify, make_response, session
from flask_restful import Resource
from sqlalchemy.exc import IntegrityError
from server.config import app, db, api
from server.models.models import Meal, meal_ingredient

class Meals(Resource):
    def get(self):
        meals =  [m.to_dict() for m in Meal.query.filter_by(user_id=session['user_id']).all()]
        return make_response(jsonify(meals), 200)
    
    def post(self):
        data = request.get_json()
        name = data.get('name')
        time = data.get('time')
        user_id = session['user_id']
        new_meal = Meal(name=data.get('name'), user_id=user_id)
        if time:
            setattr(new_meal, 'time', time)
        try:
            db.session.add(new_meal)
            db.session.commit()
            return make_response(jsonify(new_meal.to_dict()), 201)
        except IntegrityError:
            return {'error': '422'}, 422

class MealById(Resource):
    def patch(self, id):
        meal = Meal.query.filter_by(id=id, user_id=session['user_id']).first()
        data = request.get_json()
        name = data.get('name')
        time = data.get('time')
        meal.name = data.get('name')
        if time:
            meal.time = time
        db.session.commit()
        return make_response(meal.to_dict(), 200)
    
    def delete(self, id):
        Meal.query.filter_by(id=id, user_id=session['user_id']).delete()
        db.session.query(meal_ingredient).filter_by(meal_id = id).delete()
        db.session.commit()
        return {}, 204

api.add_resource(Meals, '/api/meals', endpoint='/api/meals')
api.add_resource(MealById, '/api/meals/<int:id>', endpoint='/api/meals/id')