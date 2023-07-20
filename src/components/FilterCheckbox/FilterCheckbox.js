import "./FilterCheckbox.css";

function FilterCheckbox({ handleCheckedShorts }) {
  return (
    <div className="filter">
      <label className="filter__container">
        <input
          type="checkbox"
          className="filter__input"
          // checked={isChecked}
          onClick={handleCheckedShorts}
          defaultChecked
        ></input>
        <span className="filter__slider filter__round"></span>
      </label>
      <p className="filter__text">Короткометражки</p>
    </div>
  );
}

export default FilterCheckbox;
