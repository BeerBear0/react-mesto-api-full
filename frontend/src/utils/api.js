import { API } from './utils.js';

class Api {
  constructor({ baseUrl }) {
    this._baseUrl = `${window.location.protocol}//${baseUrl}`;
  }

  _getResponseData(res) {
    if (!res.ok) {
      return Promise.reject(`Ошибка: ${res.status}`);
    }
    return res.json();
  }

  getUserInfo(token) {
    console.log(this._baseUrl)
    return fetch(`${this._baseUrl}/users/me`, {
      method: 'GET',
      credentials: 'include',
    }).then(res => this._getResponseData(res));
  }

  changeUserInfo({ name, about }) {
    return fetch(`${this._baseUrl}/users/me`, {
      method: 'PATCH',
      credentials: 'include',
      headers: {
        ...this._headers,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        name: name,
        about: about,
      }),
    }).then(res => this._getResponseData(res));
  }

  changeUserAvatar(url) {
    return fetch(`${this._baseUrl}/users/me/avatar`, {
      method: 'PATCH',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        avatar: url,
      }),
    }).then(res => this._getResponseData(res));
  }

  getCards() {
    return fetch(`${this._baseUrl}/cards`, {
      credentials: 'include',
    }).then(res => this._getResponseData(res));
  }

  addNewCard({ name, link }) {
    return fetch(`${this._baseUrl}/cards`, {
      method: 'POST',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        name,
        link,
      }),
    }).then(res => this._getResponseData(res));
  }

  deleteCard(cardId, token) {
    console.log(cardId)
    return fetch(`${this._baseUrl}/cards/${cardId}`, {
      method: 'DELETE',
      credentials: 'include',
      headers: {
        // 'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
    }).then(res => this._getResponseData(res));
  }

  addLike(cardId, token) {
    return fetch(`${this._baseUrl}/cards/${cardId}/likes`, {
      method: 'PUT',
      credentials: 'include',
      headers: {
        // 'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
    }).then(res => this._getResponseData(res));
  }

  removeLike(cardId, token) {
    return fetch(`${this._baseUrl}/cards/${cardId}/likes`, {
      method: 'DELETE',
      credentials: 'include',
      headers: {
        // 'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
    }).then(res => this._getResponseData(res));
  }

  changeLikeCardStatus(cardId, isLiked) {
    if (!isLiked) {
      return this.addLike(cardId);
    } else {
      return this.removeLike(cardId);
    }
  }
}

export const api = new Api(API);
