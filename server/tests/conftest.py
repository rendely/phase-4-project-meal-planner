#!/usr/bin/env python3
import os

os.environ['FLASK_CONFIG'] = 'testing'

import pytest

from server.app import app as flask_app
from server.seed import run_seed

run_seed()

@pytest.fixture
def app():
    app = flask_app
    app.config['TESTING'] = True
    return app

@pytest.fixture
def client_with_session(app):
    with app.test_client() as client:
        with client.session_transaction() as session:
            session['user_id'] = 1
        yield client

def pytest_itemcollected(item):
    par = item.parent.obj
    node = item.obj
    pref = par.__doc__.strip() if par.__doc__ else par.__class__.__name__
    suf = node.__doc__.strip() if node.__doc__ else node.__name__
    if pref or suf:
        item._nodeid = ' '.join((pref, suf))