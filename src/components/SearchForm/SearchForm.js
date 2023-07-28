import "./SearchForm.css";

import FilterCheckbox from "../FilterCheckbox/FilterCheckbox.js";

function SearchForm({
  handleSearchMovie,
  handleCheckedShorts,
  handleSearchButton,
  searchMovie,
  isChecked,
}) {
  return (
    <section className="search">
      <div className="search__container">
        <form className="search__form">
          <div className="search__icon"></div>
          <input
            placeholder="Фильм"
            type="text"
            onChange={handleSearchMovie}
            value={searchMovie}
            required
            className="search__input"
          ></input>
          <button
            type="button"
            onClick={handleSearchButton}
            className="search__button"
          ></button>
        </form>
        <FilterCheckbox
          handleCheckedShorts={handleCheckedShorts}
          isChecked={isChecked}
        />
      </div>
    </section>
  );
}

export default SearchForm;
