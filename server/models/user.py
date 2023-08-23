from sqlalchemy_serializer import SerializerMixin
from sqlalchemy.ext.hybrid import hybrid_property
from config import db, bcrypt

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