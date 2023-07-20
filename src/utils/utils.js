import { DURATION_SHORT_MOVIES } from "./constants.js";

// Фильтр короткометражных фильмов
export function filterShortMovies(moviesList, checkedShortsMovies) {
  return !checkedShortsMovies
    ? moviesList.filter((card) => card.duration > DURATION_SHORT_MOVIES)
    : moviesList;
}
