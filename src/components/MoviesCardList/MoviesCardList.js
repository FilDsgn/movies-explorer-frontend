import "./MoviesCardList.css";

import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import useResize from "../../hooks/useResize";

import MoviesCard from "../MoviesCard/MoviesCard";

import {
  DESKTOP_CARDS_AMOUNT,
  TABLET_CARDS_AMOUNT,
  TABLET_MINI_CARDS_AMOUNT,
  MOBILE_CARDS_AMOUNT,
  DESKTOP_SCREEN_WIDTH,
  TABLET_SCREEN_WIDTH,
  TABLET_MINI_SCREEN_WIDTH,
} from "../../utils/constants.js";

import { filterShortMovies } from "../../utils/utils.js";

function MoviesCardList({
  moviesList,
  savedMovies,
  checkedShortsMovies,
  onSaveMovie,
  onDeleteMovie,
}) {
  const [device, setDevice] = useState(DESKTOP_CARDS_AMOUNT);
  const [moviesCounter, setMoviesCounter] = useState(device.showCards);
  const location = useLocation();
  const filteredMoviesList = filterShortMovies(moviesList, checkedShortsMovies);

  const { width } = useResize();

  useEffect(() => {
    if (width > DESKTOP_SCREEN_WIDTH) {
      setDevice(DESKTOP_CARDS_AMOUNT);
    } else if (width > TABLET_SCREEN_WIDTH && width <= DESKTOP_SCREEN_WIDTH) {
      setDevice(TABLET_CARDS_AMOUNT);
    } else if (
      width > TABLET_MINI_SCREEN_WIDTH &&
      width <= TABLET_SCREEN_WIDTH
    ) {
      setDevice(TABLET_MINI_CARDS_AMOUNT);
    } else {
      setDevice(MOBILE_CARDS_AMOUNT);
    }
  }, [width]);

  useEffect(() => {
    setMoviesCounter(device.showCards);
  }, [checkedShortsMovies, device.showCards, device]);

  function handleShowMoreButton() {
    setMoviesCounter(moviesCounter + device.addCards);
  }

  return (
    <section className="movies">
      <div className="movies__container">
        {location.pathname === "/saved-movies"
          ? filteredMoviesList
              .slice(0, moviesCounter)
              .map((card) => (
                <MoviesCard
                  card={card}
                  key={card.id ?? card._id}
                  savedMovies={savedMovies}
                  onSaveMovie={onSaveMovie}
                  onDeleteMovie={onDeleteMovie}
                />
              ))
              .reverse()
          : filteredMoviesList
              .slice(0, moviesCounter)
              .map((card) => (
                <MoviesCard
                  card={card}
                  key={card.id ?? card._id}
                  savedMovies={savedMovies}
                  onSaveMovie={onSaveMovie}
                  onDeleteMovie={onDeleteMovie}
                />
              ))}
      </div>

      {moviesCounter < filteredMoviesList.length && (
        <button
          type="button"
          onClick={handleShowMoreButton}
          className="movies__button"
        >
          Ещё
        </button>
      )}
      {filteredMoviesList.length === 0 && (
        <span className="movies__error-message">Ничего не найдено</span>
      )}
    </section>
  );
}

export default MoviesCardList;
