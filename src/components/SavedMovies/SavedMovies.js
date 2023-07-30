import { useState, useEffect } from "react";

import SearchForm from "../SearchForm/SearchForm.js";
import MoviesCardList from "../MoviesCardList/MoviesCardList.js";
import Preloader from "../Preloader/Preloader.js";

import { useSavedMoviesContext } from "../../contexts/CurrentSavedMoviesContext.js";
import { filterSearchMovies } from "../../utils/utils.js";

function SavedMovies({ isLoggedIn, isLoading }) {
  const [moviesList, setMoviesList] = useState([]);
  const { savedMovies } = useSavedMoviesContext();
  const [searchMovie, setSearchMovie] = useState("");
  const [checkedShortsMovies, setCheckedShortsMovies] = useState(true);

  useEffect(() => {
    if (isLoggedIn) {
      setMoviesList(savedMovies);
    }
  }, [savedMovies, isLoggedIn]);

  // useEffect(() => {
  //   const Debounce = setTimeout(() => {
  //     const filteredMovies = filterSearchMovies(searchMovie, savedMovies);
  //     setMoviesList(filteredMovies);
  //   }, 1000);

  //   return () => clearTimeout(Debounce);
  // }, [searchMovie, savedMovies]);

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
        isChecked={checkedShortsMovies}
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

export default SavedMovies;
