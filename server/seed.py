#!/usr/bin/env python3

# Standard library imports
from random import randint, choice as rc


# Local imports
from app import app
from models import db, Ingredient, Meal
if __name__ == '__main__':

    with app.app_context():
        print("Starting seed...")

        Ingredient.query.delete()
        Meal.query.delete()

        for i in ['pasta noodle', 'pasta sauce', 'rice', 'chicken']:
            db.session.add(Ingredient(name=i))

        db.session.commit()
