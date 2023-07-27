import { DURATION_SHORT_MOVIES } from "./constants.js";

// Фильтр короткометражных фильмов
export function filterShortMovies(moviesList, checkedShortsMovies) {
  return !checkedShortsMovies
    ? moviesList.filter((card) => card.duration > DURATION_SHORT_MOVIES)
    : moviesList;
}

export function filterSearchMovies(searchText, moviesData) {
  if (!searchText) {
    return moviesData;
  }

  return moviesData.filter((movie) =>
    movie.nameRU.toLowerCase().includes(searchText.toLowerCase())
  );
}

export function convertDuration(duration) {
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
