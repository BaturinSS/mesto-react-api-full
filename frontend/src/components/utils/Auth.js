class Auth {
  constructor({ productionUrl, headers }) {
    this._productionUrl = productionUrl;
    this._headers = headers;
  }

  _baseUrl = () => {
    const { NODE_ENV } = process.env;
    let url = '';
    if (NODE_ENV === 'development') {
      url = 'http://localhost:3000';
    } else if (NODE_ENV === 'production') {
      url = this._productionUrl;
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
      credentials: 'include',
      headers: this._headers,
      body: JSON.stringify({ password, email }),
    })
      .then(this._checkResponse)
  };

  authorize(password, email) {
    return fetch(`${this._baseUrl()}/signin`, {
      method: 'POST',
      credentials: 'include',
      headers: this._headers,
      body: JSON.stringify({ password, email }),
    })
      .then(this._checkResponse)
  };

  checkToken(token) {
    return fetch(`${this._baseUrl()}/users/me`, {
      method: 'GET',
      // headers: this._headers = {
      //   ...this._headers,
      //   'Authorization': `Bearer ${token}`
      // }
    })
      .then(this._checkResponse)
  }
}

export const auth = new Auth({
  productionUrl: 'https://api.server-mesto.ru',
  headers: {
    'Content-Type': 'application/json',
  }
});
