import { useState, useEffect, useContext } from "react";

import SearchForm from "../SearchForm/SearchForm.js";
import MoviesCardList from "../MoviesCardList/MoviesCardList.js";
import Preloader from "../Preloader/Preloader.js";

import moviesApi from "../../utils/MoviesApi.js";
import mainApi from "../../utils/MainApi.js";

import { CurrentUserContext } from "../../contexts/CurrentUserContext.js";
import { useSavedMoviesContext } from "../../contexts/CurrentSavedMoviesContext.js";

import { filterSearchMovies } from "../../utils/utils.js";

function SavedMovies({ isLoggedIn, onDeleteMovie, onLoading }) {
  // const [moviesData, setMoviesData] = useState([]);
  const [moviesList, setMoviesList] = useState([]);
  const { savedMovies, setSavedMovies } = useSavedMoviesContext();
  const [searchMovie, setSearchMovie] = useState("");
  const [checkedShortsMovies, setCheckedShortsMovies] = useState(true);

  // const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (isLoggedIn) {
      setMoviesList(savedMovies);
    }
  }, [savedMovies, isLoggedIn]);

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

  function handleSearchButton() {
    const filteredMovies = filterSearchMovies(searchMovie, savedMovies);
    setMoviesList(filteredMovies);
  }

  return (
    <main className="content">
      <SearchForm
        handleSearchMovie={handleSearchMovie}
        handleCheckedShorts={handleCheckedShorts}
        handleSearchButton={handleSearchButton}
      />
      {onLoading ? (
        <Preloader />
      ) : (
        <MoviesCardList
          moviesList={moviesList}
          // savedMovies={moviesData}
          checkedShortsMovies={checkedShortsMovies}
        />
      )}
    </main>
  );
}

export default SavedMovies;
