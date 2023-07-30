import "./Movies.css";

import { useState, useEffect } from "react";

import SearchForm from "../SearchForm/SearchForm.js";
import MoviesCardList from "../MoviesCardList/MoviesCardList.js";
import Preloader from "../Preloader/Preloader.js";

import moviesApi from "../../utils/MoviesApi.js";

import { filterSearchMovies } from "../../utils/utils.js";

function Movies({ isLoggedIn, savedMovies }) {
  const [moviesData, setMoviesData] = useState([]);
  const [moviesList, setMoviesList] = useState([]);
  const [searchMovie, setSearchMovie] = useState("");
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
      Promise.all([moviesApi.getMoviesList()])
        .then((res) => {
          const [moviesData] = res;
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
  }, [isLoggedIn]);

  // useEffect(() => {
  //   const Debounce = setTimeout(() => {
  //     const filteredMovies = filterSearchMovies(searchMovie, moviesData);
  //     setMoviesList(filteredMovies);
  //     localStorage.setItem("searchedMovies", JSON.stringify(filteredMovies));
  //     localStorage.setItem("searchMovie", searchMovie);
  //   }, 1000);

  //   return () => clearTimeout(Debounce);
  // }, [searchMovie, moviesData]);

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
        />
      )}
    </main>
  );
}

export default Movies;
