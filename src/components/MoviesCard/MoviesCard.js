import "./MoviesCard.css";

import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";

import { useSavedMoviesContext } from "../../contexts/CurrentSavedMoviesContext";

import { convertDuration } from "../../utils/utils.js";

import mainApi from "../../utils/MainApi.js";

function MoviesCard({ card }) {
  const { savedMovies, setSavedMovies } = useSavedMoviesContext();
  const [isSavedMovie, setIsSavedMovie] = useState(false);

  const location = useLocation();

  useEffect(() => {
    const isSavedMovie = savedMovies.some(
      (movie) => movie.movieId === card.id || movie.movieId === card._id
    );
    setIsSavedMovie(isSavedMovie);
  }, [savedMovies, card]);

  function handleSaveMovie() {
    const newMovie = {
      ...card,
      image: `https://api.nomoreparties.co${card.image.url}`,
      thumbnail: `https://api.nomoreparties.co${card.image.formats.thumbnail.url}`,
      movieId: card.id,
    };

    delete newMovie.created_at;
    delete newMovie.updated_at;
    delete newMovie.id;

    const token = localStorage.getItem("token");

    mainApi
      .saveMovie(newMovie, token)
      .then((movie) => {
        setSavedMovies([...savedMovies, movie]);
        setIsSavedMovie(true);
      })
      .catch((err) => console.log(err));
  }

  function handleDeleteMovie() {
    const param = location.pathname === "/movies" ? card.id : card.movieId;

    const deletedMovie = savedMovies.find((movie) => movie.movieId === param);

    // mainApi
    //   .deleteMovie(deletedMovie._id)
    //   .then((res) => {
    //     setSavedMovies((state) =>
    //       state.filter((movie) => movie._id !== deletedMovie._id)
    //     );
    //     setIsSavedMovie(false);
    //   })
    //   .catch((err) => console.log(err));
    const token = localStorage.getItem("token");

    mainApi
      .deleteMovie(deletedMovie._id, token)
      .then((res) => {
        setSavedMovies((state) =>
          state.filter((movie) => movie._id !== deletedMovie._id)
        );
        setIsSavedMovie(false);
      })
      .catch((err) => console.log(err));
  }

  return (
    <article className="movies-card">
      <a
        className="movies-card__link"
        href={card.trailerLink}
        target="_blank"
        rel="noreferrer"
      >
        <img
          src={`${
            location.pathname === "/movies"
              ? `https://api.nomoreparties.co/${card.image.url}`
              : `${card.image}`
          }`}
          alt="movie poster"
          className="movies-card__image"
        />
      </a>

      <div className="movies-card__wrapper">
        <h2 className="movies-card__title">{card.nameRU}</h2>
        {location.pathname === "/saved-movies" ? (
          <button
            type="button"
            className="movies-card__button movies-card__button-delete"
            onClick={handleDeleteMovie}
          ></button>
        ) : (
          <button
            type="button"
            className={`movies-card__button movies-card__button-like ${
              isSavedMovie ? "movies-card__button-like_active" : ""
            }`}
            onClick={!isSavedMovie ? handleSaveMovie : handleDeleteMovie}
          ></button>
        )}
      </div>
      <p className="movies-card__duration">{convertDuration(card.duration)}</p>
    </article>
  );
}

export default MoviesCard;
