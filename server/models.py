from sqlalchemy.ext.hybrid import hybrid_property
from sqlalchemy_serializer import SerializerMixin
from sqlalchemy.ext.associationproxy import association_proxy

from config import db, bcrypt

meal_ingredient = db.Table(
  'meals_ingredients',
  db.Model.metadata,
  db.Column('meal_id', db.ForeignKey('meals.id'), primary_key=True),
  db.Column('ingredient_id', db.ForeignKey('ingredients.id'), primary_key=True),
  extend_existing=True,
)

class User(db.Model, SerializerMixin):

  __tablename__ = 'users'
  serialize_rules = ('-ingredients.user', '-_password_hash', '-meals.user')
  
  id = db.Column(db.Integer, primary_key = True)
  username = db.Column(db.String, unique=True, nullable=False)
  _password_hash = db.Column(db.String)
  ingredients = db.Relationship('Ingredient', back_populates='user')
  meals = db.Relationship('Meal', back_populates='user')

  @hybrid_property
  def password_hash(self):
      raise AttributeError('Password hashes may not be viewed.')
  
  @password_hash.setter
  def password_hash(self, password):
      self._password_hash =  bcrypt.generate_password_hash(password).decode('utf-8')

  def authenticate(self, password):
      return bcrypt.check_password_hash(self._password_hash, password)
  
  def __repr__(self):
    return f'<User {self.username}>'

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

  
# class MealPlan(db.Model, SerializerMixin):

#   __tablename__ = 'meal_plans'

#   id = db.Column(db.Integer, primary_key = True)
#   date = db.Column(db.Date, nullable=False, unique=True)
#   meal_type = db.Column(db.Enum)
#   meal_id 
