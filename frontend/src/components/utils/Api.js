class Api {
  constructor({ productionUrl, headers, credentials }) {
    this._productionUrl = productionUrl;
    this._headers = headers;
    this._credentials = credentials;
  }

  _baseUrl = () => {
    const { NODE_ENV } = process.env;
    let url = '';
    if (NODE_ENV === 'production') {
      url = this._productionUrl;
    } else {
      url = 'http://localhost:3000';
    };
    return url;
  }

  _checkResponse(res) {
    return res.ok
      ? res.json()
      : Promise.reject(res.json())
  }

  getUserInfo() {
    return fetch(`${this._baseUrl()}/users/me`, {
      method: 'GET',
      credentials: this._credentials,
      headers: this._headers,
    })
      .then(this._checkResponse)
  }

  getCards() {
    return fetch(`${this._baseUrl()}/cards`, {
      method: 'GET',
      credentials: this._credentials,
      headers: this._headers,
    })
      .then(this._checkResponse)
  }

  editUserInfo(name, about) {
    return fetch(`${this._baseUrl()}/users/me`, {
      method: 'PATCH',
      credentials: this._credentials,
      headers: this._headers,
      body: JSON.stringify({ name, about }),
    })
      .then(this._checkResponse)
  }

  addCard(name, link) {
    return fetch(`${this._baseUrl()}/cards`, {
      method: 'POST',
      credentials: this._credentials,
      headers: this._headers,
      body: JSON.stringify({ name, link }),
    })
      .then(this._checkResponse)
  }

  deleteCard(id) {
    return fetch(`${this._baseUrl()}/cards/${id}`, {
      method: 'DELETE',
      credentials: this._credentials,
      headers: this._headers,
    })
      .then(this._checkResponse)
  }

  addLike(id) {
    return fetch(`${this._baseUrl()}/cards/${id}/likes`, {
      method: 'PUT',
      credentials: this._credentials,
      headers: this._headers
    })
      .then(this._checkResponse)
  }

  deleteLike(id) {
    return fetch(`${this._baseUrl()}/cards/${id}/likes`, {
      method: 'DELETE',
      credentials: this._credentials,
      headers: this._headers
    })
      .then(this._checkResponse)
  }

  editAvatar(avatar) {
    return fetch(`${this._baseUrl()}/users/me/avatar`, {
      method: 'PATCH',
      credentials: this._credentials,
      headers: this._headers,
      body: JSON.stringify({ avatar }),
    })
      .then(this._checkResponse)
  }
}

export const api = new Api({
  productionUrl: 'https://api.server-mesto.ru',
  credentials: 'include',
  headers: {
    'authorization': `Bearer ${localStorage.getItem('jwt')}`,
    'Content-Type': 'application/json',
    'Accept': 'application/json',
  }
});