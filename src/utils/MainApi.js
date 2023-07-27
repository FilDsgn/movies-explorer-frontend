import { mainApiConfig } from "./constants.js";

class MainApi {
  constructor(config) {
    this._baseUrl = config.baseUrl;
    this._headers = config.headers;
  }

  _checkResponse(res) {
    if (res.ok) {
      return res.json();
    }

    return Promise.reject(`Ошибка ${res.status}`);
  }

  _request(url, options) {
    return fetch(url, options).then(this._checkResponse);
  }

  register(data) {
    return this._request(`${this._baseUrl}/signup`, {
      method: "POST",
      headers: this._headers,
      body: JSON.stringify(data),
    });
  }

  authorize(data) {
    return this._request(`${this._baseUrl}/signin`, {
      method: "POST",
      headers: this._headers,
      body: JSON.stringify(data),
    });
  }

  getContent(token) {
    return this._request(`${this._baseUrl}/users/me`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
  }

  getUserInfo() {
    return this._request(`${this._baseUrl}/users/me`, {
      method: "GET",
      headers: this._headers,
    });
  }

  setUserInfo(data) {
    return this._request(`${this._baseUrl}/users/me`, {
      method: "POST",
      headers: this._headers,
      body: JSON.stringify(data),
    });
  }

  saveMovie(data) {
    return this._request(`${this._baseUrl}/movies`, {
      method: "POST",
      headers: this._headers,
      body: JSON.stringify(data),
    });
  }

  deleteMovie(id) {
    return this._request(`${this._baseUrl}/movies/${id}`, {
      method: "DELETE",
      headers: this._headers,
    });
  }

  getSavedMovies() {
    return this._request(`${this._baseUrl}/movies`, {
      method: "GET",
      headers: this._headers,
    });
  }
}

const mainApi = new MainApi(mainApiConfig);

export default mainApi;
