import "./Movies.css";

import SearchForm from "../SearchForm/SearchForm.js";
import MoviesCardList from "../MoviesCardList/MoviesCardList.js";

function Movies({ moviesList }) {
  return (
    <main className="content">
      <SearchForm />
      <MoviesCardList moviesList={moviesList} />
    </main>
  );
}

export default Movies;
