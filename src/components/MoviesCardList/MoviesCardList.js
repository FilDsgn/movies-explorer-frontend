import "./MoviesCardList.css";

import { useLocation } from "react-router-dom";

import MoviesCard from "../MoviesCard/MoviesCard";

function MoviesCardList({ moviesList }) {
  const location = useLocation();

  return (
    <section className="movies">
      <div className="movies__container">
        {location.pathname === "/saved-movies"
          ? moviesList.map(
              (card) =>
                card.isLiked && <MoviesCard card={card} key={card._id} />
            )
          : moviesList.map((card) => <MoviesCard card={card} key={card._id} />)}
      </div>
      {moviesList.lenth > 6 && (
        <button type="button" className="movies__button">
          Ещё
        </button>
      )}
    </section>
  );
}

export default MoviesCardList;
