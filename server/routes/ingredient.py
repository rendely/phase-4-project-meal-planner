from flask import request, jsonify, make_response, session
from flask_restful import Resource
from sqlalchemy.exc import IntegrityError
from server.config import app, db, api
from server.models.models import Ingredient

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

api.add_resource(Ingredients, '/api/ingredients', endpoint='/api/ingredients')