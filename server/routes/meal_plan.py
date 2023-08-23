from datetime import datetime
from flask import request, jsonify, make_response, session, render_template
from flask_restful import Resource
from config import app, db, api
from models.models import MealPlan

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

api.add_resource(MealPlans, '/api/meal_plans', endpoint='/api/meal_plans')