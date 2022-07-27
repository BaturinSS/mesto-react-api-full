class Auth {
  constructor({ productionUrl, headers, credentials }) {
    this._productionUrl = productionUrl;
    this._headers = headers;
    this._credentials = credentials;
    this._NODE_ENV = process.env.NODE_ENV;
  }

  _baseUrl = () => {
    let url = '';
    if (this._NODE_ENV === 'production') {
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

  checkToken() {
    return fetch(`${this._baseUrl()}/users/me`, {
      method: 'GET',
      credentials: this._credentials,
      headers: this._headers,
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

export default Auth;
