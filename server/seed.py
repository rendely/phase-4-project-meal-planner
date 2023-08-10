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

        for i in ['pasta noodle', 'pasta sauce', 'rice', 'chicken']:
            db.session.add(Ingredient(name=i))

        user = User(username='admin')
        user.password_hash = 'admin'
        db.session.add(user)
        db.session.commit()
