#!/usr/bin/env python3
import ipdb

# Local imports
from app import app
from models import db, Ingredient, Meal

if __name__ == '__main__':
    
    with app.app_context():
        ingredient = Ingredient(name='Bread')
        ipdb.set_trace()
        print(ingredient)
        
