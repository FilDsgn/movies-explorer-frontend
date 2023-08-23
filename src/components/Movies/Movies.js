import "./Movies.css";

import { useState, useEffect } from "react";

import SearchForm from "../SearchForm/SearchForm.js";
import MoviesCardList from "../MoviesCardList/MoviesCardList.js";
import Preloader from "../Preloader/Preloader.js";

import moviesApi from "../../utils/MoviesApi.js";
import mainApi from "../../utils/MainApi.js";

import { useSavedMoviesContext } from "../../contexts/CurrentSavedMoviesContext.js";
import { filterSearchMovies } from "../../utils/utils.js";

function Movies({ isLoggedIn }) {
  const [moviesData, setMoviesData] = useState([]);
  const [moviesList, setMoviesList] = useState([]);
  const { savedMovies, setSavedMovies } = useSavedMoviesContext();
  const [searchMovie, setSearchMovie] = useState("");
  const [searchedMovieText, setSearchedMovieText] = useState("");
  const [checkedShortsMovies, setCheckedShortsMovies] = useState(
    JSON.parse(localStorage.getItem("isCheckboxActive")) ?? true
  );

  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (localStorage.getItem("searchMovie")) {
      setSearchMovie(localStorage.getItem("searchMovie"));
    }
  }, []);

  useEffect(() => {
    setIsLoading(true);
    if (isLoggedIn) {
      const token = localStorage.getItem("token");
      moviesApi
        .getMoviesList(token)
        .then((moviesData) => {
          setMoviesData(moviesData);
          if (localStorage.getItem("searchedMovies")) {
            setMoviesList(JSON.parse(localStorage.getItem("searchedMovies")));
          } else {
            setMoviesList(moviesData);
          }
        })
        .catch((err) => console.log(err))
        .finally(() => setIsLoading(false));
    }
  }, []);

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (!token) {
      return;
    }

    setIsLoading(true);
    mainApi
      .getSavedMovies(token)
      .then((moviesData) => {
        setSavedMovies(moviesData);
        setSearchedMovieText(localStorage.getItem("searchMovie"));
      })
      .catch((err) => console.log(err))
      .finally(() => setIsLoading(false));
  }, []);

  useEffect(() => {
    const Debounce = setTimeout(() => {
      const filteredMovies = filterSearchMovies(searchMovie, moviesData);
      setMoviesList(filteredMovies);
      localStorage.setItem("searchedMovies", JSON.stringify(filteredMovies));
      localStorage.setItem("searchMovie", searchMovie);
    }, 1000);

    return () => clearTimeout(Debounce);
  }, [searchMovie, moviesData]);

  function handleCheckedShorts() {
    if (!checkedShortsMovies) {
      localStorage.setItem("isCheckboxActive", true);
      setCheckedShortsMovies(true);
    } else {
      localStorage.setItem("isCheckboxActive", false);
      setCheckedShortsMovies(false);
    }
  }

  function handleSearchMovie(e) {
    setSearchMovie(e.target.value);
  }

  function handleSearchButton(e) {
    e.preventDefault();
    const filteredMovies = filterSearchMovies(searchMovie, moviesData);
    localStorage.setItem("searchedMovies", JSON.stringify(filteredMovies));
    localStorage.setItem("searchMovie", searchMovie);
    setSearchedMovieText(searchMovie);
    setMoviesList(filteredMovies);
  }

  return (
    <main className="content">
      <SearchForm
        handleSearchMovie={handleSearchMovie}
        handleCheckedShorts={handleCheckedShorts}
        handleSearchButton={handleSearchButton}
        searchMovie={searchMovie}
        isChecked={checkedShortsMovies}
      />
      {isLoading ? (
        <Preloader />
      ) : (
        <MoviesCardList
          moviesList={moviesList}
          savedMovies={savedMovies}
          checkedShortsMovies={checkedShortsMovies}
          searchedMovieText={searchedMovieText}
          searchMovie={searchMovie}
          isLoading={isLoading}
        />
      )}
    </main>
  );
}

export default Movies;
