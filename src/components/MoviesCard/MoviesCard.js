import "./MoviesCard.css";

function MoviesCard({ card }) {
  return (
    <article className="movies-card">
      <img src={card.image} alt="movie poster" className="movies-card__image" />
      <div className="movies-card__wrapper">
        <h2 className="movies-card__title">{card.nameRU}</h2>
        <button type="button" className="movies-card__button"></button>
      </div>
      <p className="movies-card__duration">{card.duration} мин</p>
    </article>
  );
}

export default MoviesCard;
