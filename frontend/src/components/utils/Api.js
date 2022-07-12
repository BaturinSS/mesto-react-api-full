class Api {
  constructor({ baseUrl, headers, credentials }) {
    this._baseUrl = baseUrl;
    this._headers = headers;
    this._credentials = credentials;
  }

  _checkResponse(res) {
    return res.ok
      ? res.json()
      : Promise.reject(res.json())
  }

  getUserInfo() {
    return fetch(`${this._baseUrl}/users/me`, {
      method: 'GET',
      credentials: true,
      headers: this._headers,
    })
      .then(this._checkResponse)
  }

  getCards() {
    return fetch(`${this._baseUrl}/cards`, {
      method: 'GET',
      credentials: true,
      headers: this._headers,
    })
      .then(this._checkResponse)
  }

  editUserInfo(name, about) {
    return fetch(`${this._baseUrl}/users/me`, {
      method: 'PATCH',
      credentials: true,
      headers: this._headers,
      body: JSON.stringify({ name, about }),
    })
      .then(this._checkResponse)
  }

  addCard(name, link) {
    return fetch(`${this._baseUrl}/cards`, {
      method: 'POST',
      credentials: true,
      headers: this._headers,
      body: JSON.stringify({ name, link }),
    })
      .then(this._checkResponse)
  }

  deleteCard(id) {
    return fetch(`${this._baseUrl}/cards/${id}`, {
      method: 'DELETE',
      credentials: true,
      headers: this._headers,
    })
      .then(this._checkResponse)
  }

  addLike(id) {
    return fetch(`${this._baseUrl}/cards/${id}/likes`, {
      method: 'PUT',
      credentials: true,
      headers: this._headers
    })
      .then(this._checkResponse)
  }

  deleteLike(id) {
    return fetch(`${this._baseUrl}/cards/${id}/likes`, {
      method: 'DELETE',
      credentials: true,
      headers: this._headers
    })
      .then(this._checkResponse)
  }

  editAvatar(avatar) {
    return fetch(`${this._baseUrl}/users/me/avatar`, {
      method: 'PATCH',
      credentials: true,
      headers: this._headers,
      body: JSON.stringify({ avatar }),
    })
      .then(this._checkResponse)
  }
}

export const api = new Api({
  baseUrl: 'https://api.server-mesto.ru',
  credentials: true,
  headers: {
    'Content-Type': 'application/json',
    // 'Access-Control-Allow-Credentials': true,
  }
});