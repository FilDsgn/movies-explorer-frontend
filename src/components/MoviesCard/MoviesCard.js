import "./MoviesCard.css";

import { useLocation } from "react-router-dom";

function MoviesCard({ card }) {
  const location = useLocation();

  function convertDuration(duration) {
    const hours = Math.trunc(duration / 60);
    const minutes = duration % 60;

    const result = [];

    if (hours > 0) {
      result.push(`${hours}ч`);
    }

    if (minutes < 10) {
      result.push(`0${minutes}м`);
    } else {
      result.push(`${minutes}м`);
    }

    return result.join(" ");
  }

  return (
    <article className="movies-card">
      <img
        src={`https://api.nomoreparties.co/${card.image.url}`}
        alt="movie poster"
        className="movies-card__image"
      />
      <div className="movies-card__wrapper">
        <h2 className="movies-card__title">{card.nameRU}</h2>
        {location.pathname === "/saved-movies" ? (
          <button
            type="button"
            className="movies-card__button movies-card__button-delete"
          ></button>
        ) : (
          <button
            type="button"
            className={`movies-card__button movies-card__button-like ${
              card.isLiked && "movies-card__button-like_active"
            }`}
          ></button>
        )}
      </div>
      <p className="movies-card__duration">{convertDuration(card.duration)}</p>
    </article>
  );
}

export default MoviesCard;
