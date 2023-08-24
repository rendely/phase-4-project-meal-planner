import json

import pytest

class TestRoutes:
  '''Test routes'''
  def test_index(self, app):
    with app.test_client() as t:
      response = t.get('/')
      assert response.status_code == 200

  def test_get_meals(self, client_with_session):
        response = client_with_session.get('/api/meals')
        assert response.status_code == 200

  def test_post_meals(self, client_with_session):
    headers = {
        'Content-Type': 'application/json'
    }
    data = {
        'name': 'test_meal'
    }
    response = client_with_session.post('/api/meals', json=data)
    assert response.status_code == 201

  def test_get_ingredients(self, client_with_session):
          response = client_with_session.get('/api/ingredients')
          assert response.status_code == 200

  def test_get_meal_plans(self, client_with_session):
          response = client_with_session.get('/api/meal_plans')
          assert response.status_code == 200          
