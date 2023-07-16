class MoviesApi {
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

  getMoviesList() {
    return this._request(this._baseUrl, {
      method: "GET",
      headers: this._headers,
    });
  }
}

const moviesApiConfig = {
  baseUrl: "https://api.nomoreparties.co/beatfilm-movies",
  headers: {
    "Content-Type": "application/json",
  },
};

const moviesApi = new MoviesApi(moviesApiConfig);

export default moviesApi;
