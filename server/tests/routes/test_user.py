import json

import pytest

class TestUserlRoutes:
  '''Test User routes'''

  @pytest.fixture
  def user_id(self, client_with_session):
    '''Create a user and return its ID'''
    response = client_with_session.post('/api/signup', json={'username': 'test_user', 'password': 'test_pass'})
    assert response.status_code == 201
    return response.json.get("id")

  def test_get_users(self, client_with_session, user_id):
    '''Test User get'''
    response = client_with_session.get(f'/api/user/{user_id}')
    assert response.status_code == 200

  # def test_post_users(self, client_with_session):
  #   '''Test Meal post'''    
  #   response = client_with_session.post('/api/meals', json={'name': 'test_meal'})
  #   assert response.status_code == 201
  #   response = client_with_session.post('/api/meals', json={})
  #   assert response.status_code == 422
  
  # def test_delete_users(self, client_with_session, meal_id):
  #   '''Test Meal delete'''
  #   response = client_with_session.delete(f'/api/meals/{meal_id}')
  #   assert response.status_code == 204