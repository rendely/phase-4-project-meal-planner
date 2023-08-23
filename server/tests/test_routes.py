import pytest
from flask_testing import TestCase

from server.config import app
from server.models.models import *
from server.routes.routes import *

class TestUserRoutes(TestCase):
  def create_app(self):
    app.config['TESTING'] = True
    return app

  def setUp(self):
    # session['user_id'] = 1
    pass

  # Called after each test
  def tearDown(self):
    # Cleanup operations, like dropping test tables or clearing DB, can be done here
    pass

  def test_get_meals(self):
    response = self.client.get('/api/meals')
    print(response.data.decode('utf-8'))
    self.assert200(response)
