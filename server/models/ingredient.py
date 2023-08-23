from sqlalchemy_serializer import SerializerMixin
from config import db, bcrypt
from .meal_ingredient import *

class Ingredient(db.Model, SerializerMixin):

  __tablename__ = 'ingredients'
  serialize_rules = ('-user.ingredients', '-meals.ingredients', '-user.meals')

  id = db.Column(db.Integer, primary_key = True)
  name = db.Column(db.String, nullable=False)
  user_id = db.Column(db.Integer, db.ForeignKey('users.id'), nullable=False)
  user = db.relationship('User', back_populates='ingredients')
  meals = db.relationship('Meal', secondary=meal_ingredient, back_populates='ingredients')

  def __repr__(self):
    return f'<Ingredient {self.name}>'