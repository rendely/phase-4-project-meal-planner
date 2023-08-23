from config import db, bcrypt

meal_ingredient = db.Table(
  'meals_ingredients',
  db.Model.metadata,
  db.Column('meal_id', db.ForeignKey('meals.id'), primary_key=True),
  db.Column('ingredient_id', db.ForeignKey('ingredients.id'), primary_key=True),
  extend_existing=True,
)