#!/usr/bin/env python3

from datetime import datetime
from flask import request, jsonify, make_response, session, render_template
from flask_restful import Resource
from config import app, db, api

from models.models import *
from routes.routes import *

@app.route('/')
def index():
    return render_template("index.html")

@app.errorhandler(404)
def not_found(e):
    return '404 Not found'

if __name__ == '__main__':
    app.run(port=5555, debug=True)