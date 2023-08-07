import "./FilterCheckbox.css";

function FilterCheckbox({ handleCheckedShorts, isChecked }) {
  return (
    <div className="filter">
      <label className="filter__container">
        <input
          type="checkbox"
          className="filter__input"
          checked={isChecked}
          onChange={handleCheckedShorts}
        ></input>
        <span className="filter__slider filter__round"></span>
      </label>
      <p className="filter__text">Короткометражки</p>
    </div>
  );
}

export default FilterCheckbox;
