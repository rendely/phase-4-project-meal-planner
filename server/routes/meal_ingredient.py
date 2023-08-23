from flask import request, jsonify, make_response, session
from flask_restful import Resource
from config import app, db, api
from models.models import meal_ingredient, Ingredient, Meal

class MealAndIngredient(Resource):
    def get(self, meal_id, ingredient_id):
        meal_ingredient = db.session.query(meal_ingredient).filter_by(meal_id = meal_id, ingredient_id =ingredient_id).first()
        return make_response(meal_ingredient.to_dict(), 200)

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
    def delete(self, meal_id, ingredient_id):
        try: 
            db.session.query(meal_ingredient).filter_by(meal_id = meal_id, ingredient_id =ingredient_id).delete()
            db.session.commit()
            return {}, 200
        except IntegrityError:
            print(e)
            return {'error': '422'}, 422
    
api.add_resource(MealAndIngredient, '/api/meals/<int:meal_id>/ingredients/<int:ingredient_id>', endpoint='/api/meals/id/ingredient/id')
