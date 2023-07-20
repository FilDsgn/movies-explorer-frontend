import "./Movies.css";

import { useState, useEffect } from "react";

import SearchForm from "../SearchForm/SearchForm.js";
import MoviesCardList from "../MoviesCardList/MoviesCardList.js";
import Preloader from "../Preloader/Preloader.js";

import moviesApi from "../../utils/MoviesApi.js";

function Movies({ isLoggedIn }) {
  const [moviesData, setMoviesData] = useState([]);
  const [moviesList, setMoviesList] = useState([]);
  const [searchMovie, setSearchMovie] = useState("");
  const [checkedShortsMovies, setCheckedShortsMovies] = useState(true);

  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setIsLoading(true);
    if (isLoggedIn) {
      Promise.all([moviesApi.getMoviesList()])
        .then((res) => {
          const [moviesData] = res;
          setMoviesData(moviesData);
          setMoviesList(moviesData);
        })
        .catch((err) => console.log(err))
        .finally(() => setIsLoading(false));
    }
  }, [isLoggedIn]);

  useEffect(() => {
    const Debounce = setTimeout(() => {
      const filteredMovies = filterMovies(searchMovie, moviesData);
      setMoviesList(filteredMovies);
    }, 1000);

    return () => clearTimeout(Debounce);
  }, [searchMovie, moviesData]);

  function handleCheckedShorts() {
    setCheckedShortsMovies(!checkedShortsMovies);
  }

  function handleSearchMovie(e) {
    setSearchMovie(e.target.value);
  }

  function handleSearchButton() {
    const filteredMovies = filterMovies(searchMovie, moviesData);
    setMoviesList(filteredMovies);
  }

  function filterMovies(searchText, moviesData) {
    if (!searchText) {
      return moviesData;
    }

    return moviesData.filter((movie) =>
      movie.nameRU.toLowerCase().includes(searchText.toLowerCase())
    );
  }

  return (
    <main className="content">
      <SearchForm
        handleSearchMovie={handleSearchMovie}
        handleCheckedShorts={handleCheckedShorts}
        handleSearchButton={handleSearchButton}
      />
      {isLoading ? (
        <Preloader />
      ) : (
        <MoviesCardList
          moviesList={moviesList}
          checkedShortsMovies={checkedShortsMovies}
        />
      )}
    </main>
  );
}

export default Movies;
