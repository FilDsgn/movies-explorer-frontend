import "./Navigation.css";

import { useState } from "react";
import { Link } from "react-router-dom";

function Navigation() {
  const [nav, setNav] = useState(false);

  return (
    <nav className={`navigation ${nav && "navigation_bg-color_black"}`}>
      <button
        type="button"
        onClick={() => setNav(!nav)}
        className={`navigation__hamb ${nav && "navigation__hamb_active"}`}
      ></button>
      <div
        className={`navigation__container ${
          nav && "navigation__container_active"
        }`}
      >
        <ul className="navigation__list">
          {nav && (
            <li className="navigation__list-item">
              <Link
                to="/"
                onClick={() => setNav(false)}
                className="navigation__link"
              >
                Главная
              </Link>
            </li>
          )}
          <li className="navigation__list-item">
            <Link
              to="/movies"
              onClick={() => setNav(false)}
              className="navigation__link"
            >
              Фильмы
            </Link>
          </li>
          <li className="navigation__list-item">
            <Link
              to="/saved-movies"
              onClick={() => setNav(false)}
              className="navigation__link"
            >
              Сохранённые фильмы
            </Link>
          </li>
        </ul>
        <Link
          to="/profile"
          onClick={() => setNav(false)}
          className="navigation__button"
        >
          Аккаунт <div className="navigation__button-icon"></div>
        </Link>
      </div>
    </nav>
  );
}

export default Navigation;
