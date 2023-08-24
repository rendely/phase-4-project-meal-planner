import json

import pytest

class TestUserlRoutes:
  '''Test User routes'''

  @pytest.fixture
  def user_id(self, client_with_session):
    '''Create a user and return its ID'''
    response = client_with_session.post('/api/signup', json={'username': 'test_user', 'password': 'test_pass'})
    assert response.status_code == 201
    user_id =  response.json.get("id")
    yield user_id
    response = client_with_session.delete(f'/api/user/{user_id}')
    assert response.status_code == 204

  def test_get_users(self, client_with_session, user_id):
    '''Test User get'''
    response = client_with_session.get(f'/api/user/{user_id}')
    assert response.status_code == 200

  def test_post_users(self, client_with_session):
    '''Test User post'''    
    response = client_with_session.post('/api/signup',json={'username': 'test_user2', 'password': 'test_pass'})
    assert response.status_code == 201
    response = client_with_session.post('/api/signup', json={})
    assert response.status_code == 422
  
  def test_delete_users(self, client_with_session):
    '''Test User delete'''
    response = client_with_session.post('/api/signup', json={'username': 'test_user3', 'password': 'test_pass'})
    assert response.status_code == 201
    user_id =  response.json.get("id")
    response = client_with_session.delete(f'/api/user/{user_id}')
    assert response.status_code == 204