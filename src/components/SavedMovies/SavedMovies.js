import { useState, useEffect } from "react";

import SearchForm from "../SearchForm/SearchForm.js";
import MoviesCardList from "../MoviesCardList/MoviesCardList.js";
import Preloader from "../Preloader/Preloader.js";

import mainApi from "../../utils/MainApi.js";

import { useSavedMoviesContext } from "../../contexts/CurrentSavedMoviesContext.js";
import { filterSearchMovies } from "../../utils/utils.js";

function SavedMovies() {
  const [moviesList, setMoviesList] = useState([]);
  const { savedMovies, setSavedMovies } = useSavedMoviesContext();
  const [searchMovie, setSearchMovie] = useState("");
  const [searchedMovieText, setSearchedMovieText] = useState("");
  const [checkedShortsMovies, setCheckedShortsMovies] = useState(true);
  const [isLoading, setIsLoading] = useState(false);

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
        setMoviesList(moviesData);
      })
      .catch((err) => console.log(err))
      .finally(() => setIsLoading(false));
  }, []);

  useEffect(() => {
    if (searchMovie !== "") {
      setMoviesList(filterSearchMovies(searchMovie, savedMovies));
      return;
    }
    setMoviesList(savedMovies);
  }, [savedMovies]);

  useEffect(() => {
    const Debounce = setTimeout(() => {
      const filteredMovies = filterSearchMovies(searchMovie, savedMovies);
      setMoviesList(filteredMovies);
    }, 1000);

    return () => clearTimeout(Debounce);
  }, [searchMovie, savedMovies]);

  function handleCheckedShorts() {
    setCheckedShortsMovies(!checkedShortsMovies);
  }

  function handleSearchMovie(e) {
    setSearchMovie(e.target.value);
  }

  function handleSearchButton(e) {
    e.preventDefault();
    const filteredMovies = filterSearchMovies(searchMovie, savedMovies);
    setMoviesList(filteredMovies);
    setSearchedMovieText(searchMovie);
  }

  return (
    <main className="content">
      <SearchForm
        handleSearchMovie={handleSearchMovie}
        handleCheckedShorts={handleCheckedShorts}
        handleSearchButton={handleSearchButton}
        isChecked={checkedShortsMovies}
      />
      {isLoading ? (
        <Preloader />
      ) : (
        <MoviesCardList
          moviesList={moviesList}
          checkedShortsMovies={checkedShortsMovies}
          searchedMovieText={searchedMovieText}
          isLoading={isLoading}
        />
      )}
    </main>
  );
}

export default SavedMovies;
