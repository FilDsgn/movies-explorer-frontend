import "./MoviesCard.css";

import { useState, useEffect, useContext } from "react";
import { useLocation } from "react-router-dom";

import { CurrentUserContext } from "../../contexts/CurrentUserContext.js";

import { convertDuration } from "../../utils/utils.js";

function MoviesCard({ card, onSaveMovie, onDeleteMovie }) {
  const currentUser = useContext(CurrentUserContext);
  // const savedMovies = useContext(CurrentSavedMoviesContext);
  const [isSavedMovie, setIsSavedMovie] = useState(false);

  // console.log(savedMovies);

  // const isSavedMovie = savedMovies.some(
  //   (movie) => movie.movieId === card.id || movie.movieId === card._id
  // );

  // useEffect(() => {
  //   const isSavedMovie = savedMovies.some(
  //     (movie) => movie.movieId === card.id || movie.movieId === card._id
  //   );
  //   setIsSavedMovie(isSavedMovie);
  // }, [savedMovies, card]);

  const location = useLocation();

  function handleLikeClick() {
    onSaveMovie(card);
    console.log(card.id);
  }

  // function handleLikeClick() {
  //   if (!isSavedMovie) {
  //     onSaveMovie(card);
  //     console.log(card.id);
  //   }

  //   onDeleteMovie(card);
  // }

  function handleDeleteClick() {
    onDeleteMovie(card);
  }

  return (
    <article className="movies-card">
      <img
        src={`${
          location.pathname === "/movies"
            ? `https://api.nomoreparties.co/${card.image.url}`
            : `${card.image}`
        }`}
        alt="movie poster"
        className="movies-card__image"
      />
      <div className="movies-card__wrapper">
        <h2 className="movies-card__title">{card.nameRU}</h2>
        {location.pathname === "/saved-movies" ? (
          <button
            type="button"
            className="movies-card__button movies-card__button-delete"
            onClick={handleDeleteClick}
          ></button>
        ) : (
          <button
            type="button"
            className={`movies-card__button movies-card__button-like ${
              isSavedMovie ? "movies-card__button-like_active" : ""
            }`}
            onClick={handleLikeClick}
          ></button>
        )}
      </div>
      <p className="movies-card__duration">{convertDuration(card.duration)}</p>
    </article>
  );
}

export default MoviesCard;
