#!/usr/bin/env python3

# Standard library imports
from random import randint, choice as rc
import datetime

# Local imports
from app import app
from models import db, Ingredient, Meal, User, meal_ingredient, MealPlan
if __name__ == '__main__':

    with app.app_context():
        print("Starting seed...")

        Ingredient.query.delete()
        Meal.query.delete()
        User.query.delete()
        MealPlan.query.delete()
        db.session.query(meal_ingredient).delete()

        user = User(username='admin')
        user.password_hash = 'admin'
        db.session.add(user)
        db.session.commit()

        for i in ['pasta noodle', 'pasta sauce', 'rice', 'chicken', 'ground beef', 'bread', \
                'milk', 'eggs', 'butter', 'flour', 'sugar', 'salt', 'black pepper', 'olive oil', \
                'tomato', 'cucumber', 'lettuce', 'carrots', 'broccoli', 'bell peppers', 'onions',\
                'garlic', 'potatoes', 'canned beans', 'canned tomatoes', 'canned tuna', 'cereal',\
                'oats', 'yogurt', 'cheese', 'frozen vegetables', 'frozen fruits', 'peanut butter',\
                'jam', 'honey', 'breadcrumbs', 'mayonnaise', 'mustard', 'ketchup', 'soy sauce', \
                'vinegar', 'canned soup', 'salad dressing', 'pasta salad ingredients', \
                'tortilla wraps', 'salsa', 'granola bars', 'nuts', 'dried fruits', 'chocolate chips']:
            ingredient = Ingredient(name=i)
            ingredient.user = user
            db.session.add(ingredient)
        
        new_meal = Meal(name='Steak and asparagus', user_id=user.id)
        new_meal.ingredients.append(Ingredient(name='steak',user_id=user.id))
        new_meal.ingredients.append(Ingredient(name='asparagus',user_id=user.id))
        db.session.add(new_meal)
        db.session.commit()

        new_meal = Meal(name='Peanut noodles', user_id=user.id)
        new_meal.ingredients.append(Ingredient(name='rice noodles',user_id=user.id))
        new_meal.ingredients.append(Ingredient(name='peanut sauce',user_id=user.id))
        new_meal.ingredients.append(Ingredient(name='tofu',user_id=user.id))
        new_meal.ingredients.append(Ingredient(name='bok choy',user_id=user.id))
        
        db.session.add(new_meal)
        db.session.commit()

        new_meal = Meal(name='Pasta', user_id=user.id)
        new_meal.ingredients.append(Ingredient(name='spaghetti',user_id=user.id))
        new_meal.ingredients.append(Ingredient(name='tomatoe sauce',user_id=user.id))
        new_meal.ingredients.append(Ingredient(name='ground beef',user_id=user.id))
        
        db.session.add(new_meal)
        db.session.commit()
        
        today = datetime.date.today()
        weekday = today.weekday()
        monday = today + datetime.timedelta(-weekday)
        wednesday = today + datetime.timedelta(-weekday+2)
        
        meal_plan = MealPlan(date=monday, breakfast_id=1, user_id=user.id)
        db.session.add(meal_plan)
        db.session.commit()
        meal_plan = MealPlan(date=wednesday, lunch_id=2, user_id=user.id)
        db.session.add(meal_plan)
        db.session.commit()

