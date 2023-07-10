import "./MoviesCard.css";

import { useLocation } from "react-router-dom";

function MoviesCard({ card }) {
  const location = useLocation();

  return (
    <article className="movies-card">
      <img src={card.image} alt="movie poster" className="movies-card__image" />
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
      <p className="movies-card__duration">{card.duration} мин</p>
    </article>
  );
}

export default MoviesCard;
