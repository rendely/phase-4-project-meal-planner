import pytest

class TestRoutes:
  '''Test routes'''
  def test_index(self, app):
    with app.test_client() as t:
      response = t.get('/')
      assert response.status_code == 200

  def test_meals(self, client_with_session):
        response = client_with_session.get('/api/meals')
        assert response.status_code == 200