import { API } from './utils.js';

class AuthApi {
  constructor({baseUrl}) {
    this._baseUrl = `${window.location.protocol}//${baseUrl}`;
  }

  _getResponseData(res) {
    if (!res.ok) {
      return Promise.reject(`Ошибка: ${res.status}`);
    }
    return res.json();
  }

  register({ email, password }, token) {
    return fetch(`${this._baseUrl}/signup`, {
      method: 'POST',
      headers: {
        // 'Authorization': `Bearer, ${token}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email,
        password,
      }),
    }).then(res => this._getResponseData(res));
  }

  authorize({ email, password }, token) {
    return fetch(`${this._baseUrl}/signin`, {
      method: 'POST',
      credentials: 'include',
      headers: {
        // 'Authorization': `Bearer, ${token}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email,
        password,
      }),
    }).then(res => this._getResponseData(res));
  }

  tokenCheck() {
    return fetch(`${this._baseUrl}/users/me`, {
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json',
      },
    }).then(res => this._getResponseData(res));
  }

  logout() {
    return fetch(`${this._baseUrl}/logout`, {
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json',
      },
    }).then(res => this._getResponseData(res));
  }
}

export const auth = new AuthApi(API);
