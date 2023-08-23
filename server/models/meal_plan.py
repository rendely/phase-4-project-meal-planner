from sqlalchemy_serializer import SerializerMixin
from server.config import db

class MealPlan(db.Model, SerializerMixin):

  __tablename__ = 'meal_plans'

  id = db.Column(db.Integer, primary_key = True)
  user_id = db.Column(db.Integer, db.ForeignKey('users.id'), nullable=False)
  date = db.Column(db.Date, nullable=False)
  breakfast_id = db.Column(db.Integer, db.ForeignKey('meals.id'))
  lunch_id = db.Column(db.Integer, db.ForeignKey('meals.id'))
  dinner_id = db.Column(db.Integer, db.ForeignKey('meals.id'))

  def __repr__(self):
    return f'<MealPlan {self.date}>'