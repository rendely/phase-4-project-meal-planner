from sqlalchemy_serializer import SerializerMixin
from sqlalchemy.ext.associationproxy import association_proxy

from config import db

class Ingredient(db.Model, SerializerMixin):

  __tablename__ = 'ingredients'

  id = db.Column(db.Integer, primary_key = True)
  name = db.Column(db.String, nullable=False)

  def __repr__(self):
    return f'<Ingredient {self.name}>'


class Meal(db.Model, SerializerMixin):

  __tablename__ = 'meals'

  id = db.Column(db.Integer, primary_key = True)
  name = db.Column(db.String, nullable=False)

  def __repr__(self):
    return f'<Meal {self.name}>'    