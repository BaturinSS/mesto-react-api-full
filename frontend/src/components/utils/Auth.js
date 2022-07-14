class Auth {
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

  register(password, email) {
    return fetch(`${this._baseUrl()}/signup`, {
      method: 'POST',
      credentials: this._credentials,
      headers: this._headers,
      body: JSON.stringify({ password, email }),
    })
      .then(this._checkResponse)
  };

  authorize(password, email) {
    return fetch(`${this._baseUrl()}/signin`, {
      method: 'POST',
      credentials: this._credentials,
      headers: this._headers,
      body: JSON.stringify({ password, email }),
    })
      .then(this._checkResponse)
  };

  checkToken(token) {
    return fetch(`${this._baseUrl()}/users/me`, {
      method: 'GET',
      credentials: this._credentials,
      headers: this._headers = {
        ...this._headers,
        'Authorization': `Bearer ${token}`
      }
    })
      .then(this._checkResponse);
  };

  deleteToken() {
    return fetch(`${this._baseUrl()}/users/me`, {
      method: 'DELETE',
      credentials: this._credentials,
      headers: this._headers,
    })
      .then(this._checkResponse);
  };
}

export const auth = new Auth({
  productionUrl: 'https://api.server-mesto.ru',
  credentials: 'include',
  headers: {
    'Accept': 'application/json',
    'Content-Type': 'application/json',
  }
});
