#!/usr/bin/env python3

# Standard library imports
from random import randint, choice as rc


# Local imports
from app import app
from models import db, Ingredient, Meal, User
if __name__ == '__main__':

    with app.app_context():
        print("Starting seed...")

        Ingredient.query.delete()
        Meal.query.delete()
        User.query.delete()
        user = User(username='admin')
        user.password_hash = 'admin'

        for i in ['pasta noodle', 'pasta sauce', 'rice', 'chicken']:
            ingredient = Ingredient(name=i)
            ingredient.user = user
            db.session.add(ingredient)

        db.session.add(user)
        db.session.commit()
