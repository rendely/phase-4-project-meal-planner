import json

import pytest

class TestMealRoutes:
  '''Test Meal routes'''

  @pytest.fixture
  def meal_id(self, client_with_session):
    '''Create a meal and return its ID'''
    response = client_with_session.post('/api/meals', json={'name': 'test_meal'})
    assert response.status_code == 201
    return response.json.get("id")

  def test_get_meals(self, client_with_session):
    '''Test Meal get'''
    response = client_with_session.get('/api/meals')
    assert response.status_code == 200

  def test_post_meals(self, client_with_session):
    '''Test Meal post'''    
    response = client_with_session.post('/api/meals', json={'name': 'test_meal'})
    assert response.status_code == 201
    response = client_with_session.post('/api/meals', json={})
    assert response.status_code == 422
  
  def test_delete_meals(self, client_with_session, meal_id):
    '''Test deleting a meal'''
    response = client_with_session.delete(f'/api/meals/{meal_id}')
    assert response.status_code == 204