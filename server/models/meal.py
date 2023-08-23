from sqlalchemy_serializer import SerializerMixin
from config import db, bcrypt
from .meal_ingredient import *

class Meal(db.Model, SerializerMixin):

  __tablename__ = 'meals'
  
  serialize_rules = ('-ingredients.meals',  '-user.meals', '-user.ingredients')

  id = db.Column(db.Integer, primary_key = True)
  name = db.Column(db.String, nullable=False)
  ingredients = db.relationship('Ingredient', secondary=meal_ingredient, back_populates='meals')
  user_id = db.Column(db.Integer, db.ForeignKey('users.id'), nullable=False)
  user = db.relationship('User', back_populates='meals')

  def __repr__(self):
    return f'<Meal {self.name}>'  