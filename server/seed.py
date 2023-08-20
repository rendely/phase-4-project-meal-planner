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

        db.session.query(meal_ingredient).delete()
        MealPlan.query.delete()
        Ingredient.query.delete()
        Meal.query.delete()
        User.query.delete()
        db.session.commit()

        print("Finished deletions...")

        print("Adding a user...")

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

        print("Finished adding a user...")
        print("Adding meals...")            
        
        new_meal1 = Meal(name='Steak and asparagus', user_id=user.id)
        new_meal1.ingredients.append(Ingredient(name='steak',user_id=user.id))
        new_meal1.ingredients.append(Ingredient(name='asparagus',user_id=user.id))
        db.session.add(new_meal1)
        db.session.commit()

        new_meal2 = Meal(name='Peanut noodles', user_id=user.id)
        new_meal2.ingredients.append(Ingredient(name='rice noodles',user_id=user.id))
        new_meal2.ingredients.append(Ingredient(name='peanut sauce',user_id=user.id))
        new_meal2.ingredients.append(Ingredient(name='tofu',user_id=user.id))
        new_meal2.ingredients.append(Ingredient(name='bok choy',user_id=user.id))
        
        db.session.add(new_meal2)
        db.session.commit()


        new_meal3 = Meal(name='Pasta', user_id=user.id)
        new_meal3.ingredients.append(Ingredient(name='spaghetti',user_id=user.id))
        new_meal3.ingredients.append(Ingredient(name='tomatoe sauce',user_id=user.id))
        new_meal3.ingredients.append(Ingredient(name='ground beef',user_id=user.id))
        
        db.session.add(new_meal3)
        db.session.commit()
        
        print("Finished adding meals...")
        print("Adding meal plans...") 

        today = datetime.date.today()
        weekday = today.weekday()
        monday = today + datetime.timedelta(-weekday)
        wednesday = today + datetime.timedelta(-weekday+2)
        
        meal_plan = MealPlan(date=monday, breakfast_id=new_meal1.id, user_id=user.id)
        db.session.add(meal_plan)
        db.session.commit()
        meal_plan = MealPlan(date=wednesday, lunch_id=new_meal2.id, dinner_id=new_meal3.id, user_id=user.id)
        db.session.add(meal_plan)
        db.session.commit()

        print("Finished seeding...")