import { useState, useEffect, useContext } from "react";

import SearchForm from "../SearchForm/SearchForm.js";
import MoviesCardList from "../MoviesCardList/MoviesCardList.js";
import Preloader from "../Preloader/Preloader.js";

import moviesApi from "../../utils/MoviesApi.js";
import mainApi from "../../utils/MainApi.js";

import { CurrentUserContext } from "../../contexts/CurrentUserContext.js";
import { useSavedMoviesContext } from "../../contexts/CurrentSavedMoviesContext.js";

import { filterSearchMovies } from "../../utils/utils.js";

function SavedMovies({ isLoggedIn, onDeleteMovie }) {
  const [moviesData, setMoviesData] = useState([]);
  const [moviesList, setMoviesList] = useState([]);
  const { savedMovies, setSavedMovies } = useSavedMoviesContext();
  const [searchMovie, setSearchMovie] = useState("");
  const [checkedShortsMovies, setCheckedShortsMovies] = useState(true);

  const [isLoading, setIsLoading] = useState(false);

  // useEffect(() => {
  //   setSavedMovies(moviesData);
  // }, []);

  useEffect(() => {
    setIsLoading(true);
    if (isLoggedIn) {
      Promise.all([mainApi.getSavedMovies()])
        .then((res) => {
          const [moviesData] = res;
          setMoviesList(moviesData);
          setMoviesData(moviesData);
          // setSavedMovies(moviesData);
        })
        .catch((err) => console.log(err))
        .finally(() => setIsLoading(false));
    }
  }, [isLoggedIn, onDeleteMovie]);

  // console.log(setSavedMovies(moviesData));

  // useEffect(() => {
  //   setIsLoading(true);
  //   if (isLoggedIn) {
  //     mainApi
  //       .getSavedMovies()
  //       .then((res) => {
  //         setSavedMovies(res);
  //       })
  //       .catch((err) => console.log(err))
  //       .finally(() => setIsLoading(false));
  //   }
  // }, [setSavedMovies]);

  useEffect(() => {
    const Debounce = setTimeout(() => {
      const filteredMovies = filterSearchMovies(searchMovie, moviesData);
      setMoviesList(filteredMovies);
    }, 1000);

    return () => clearTimeout(Debounce);
  }, [searchMovie, moviesData, onDeleteMovie]);

  function handleCheckedShorts() {
    setCheckedShortsMovies(!checkedShortsMovies);
  }

  function handleSearchMovie(e) {
    setSearchMovie(e.target.value);
  }

  function handleSearchButton() {
    const filteredMovies = filterSearchMovies(searchMovie, moviesData);
    setMoviesList(filteredMovies);
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
          savedMovies={moviesData}
          checkedShortsMovies={checkedShortsMovies}
          onDeleteMovie={onDeleteMovie}
        />
      )}
    </main>
  );
}

export default SavedMovies;
