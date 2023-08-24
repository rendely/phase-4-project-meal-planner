import json

import pytest

class TestMealRoutes:
  '''Test Meal routes'''

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

class TestIngredientRoutes:
  '''Test Ingredient routes'''

  @pytest.fixture
  def ingredient_id(self, client_with_session):
    '''Create an ingredient and return its ID'''
    response = client_with_session.post('/api/ingredients', json={'name': 'test_ingredient'})
    assert response.status_code == 201
    return response.json.get("id")

  def test_get_ingredients(self, client_with_session):
    '''Test Ingredient get'''
    response = client_with_session.get('/api/ingredients')
    assert response.status_code == 200

  def test_post_ingredients(self, client_with_session):
    '''Test Ingredient post'''    
    response = client_with_session.post('/api/ingredients', json={'name': 'test_ingredient'})
    assert response.status_code == 201
    response = client_with_session.post('/api/ingredients', json={})
    assert response.status_code == 422
  
  def test_delete_ingredient(self, client_with_session, ingredient_id):
    '''Test Ingredient delete'''
    response = client_with_session.delete(f'/api/ingredients/{ingredient_id}')
    assert response.status_code == 204
          
