import os

from flask_bcrypt import Bcrypt
from flask import Flask
from flask_cors import CORS
from flask_migrate import Migrate
from flask_restful import Api
from flask_sqlalchemy import SQLAlchemy
from sqlalchemy import MetaData

app = Flask(__name__,
            static_url_path='',
            static_folder='../client/build',
            template_folder='../client/build'
            )            
config_mode = os.environ.get('FLASK_CONFIG', 'production')

current_dir = os.path.dirname(os.path.abspath(__file__))
database_path = os.path.join(current_dir, "instance/app.db")

if config_mode == 'testing':
    app.config['SQLALCHEMY_DATABASE_URI'] = f'sqlite:///{database_path}'
else:
    app.config['SQLALCHEMY_DATABASE_URI'] = os.environ.get('DATABASE_URI')

if 'SECRET_KEY' not in os.environ:
    raise Exception('No SECRET_KEY')
    
app.secret_key = os.environ.get('SECRET_KEY')
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
app.json.compact = False
metadata = MetaData(naming_convention={
    "fk": "fk_%(table_name)s_%(column_0_name)s_%(referred_table_name)s",
})
db = SQLAlchemy(metadata=metadata)
migrate = Migrate(app, db)
db.init_app(app)
bcrypt = Bcrypt(app)
api = Api(app)
CORS(app)