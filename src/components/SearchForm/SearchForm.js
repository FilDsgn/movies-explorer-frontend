import "./SearchForm.css";

import FilterCheckbox from "../FilterCheckbox/FilterCheckbox.js";

function SearchForm({ handleSearchMovie }) {
  return (
    <section className="search">
      <div className="search__container">
        <form className="search__form">
          <div className="search__icon"></div>
          <input
            placeholder="Фильм"
            type="text"
            onChange={handleSearchMovie}
            required
            className="search__input"
          ></input>
          <button className="search__button"></button>
        </form>
        <FilterCheckbox />
      </div>
    </section>
  );
}

export default SearchForm;
