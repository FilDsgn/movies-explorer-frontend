import "./MoviesCardList.css";

import MoviesCard from "../MoviesCard/MoviesCard";

function MoviesCardList({ moviesList }) {
  return (
    <section className="movies">
      <div className="movies__container">
        {moviesList.map((card) => (
          <MoviesCard card={card} />
        ))}
      </div>
      <button type="button" className="movies__button">
        Ещё
      </button>
    </section>
  );
}

export default MoviesCardList;
