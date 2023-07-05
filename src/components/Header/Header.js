import "./Header.css";
import { Link } from "react-router-dom";

import logo from "../../images/logo.svg";

const isLoggedIn = false;

function Header() {
  return (
    <header className="header">
      <Link to="/" className="header__logo">
        <img src={logo} alt="logo bitfilms"></img>
      </Link>

      {!isLoggedIn ? (
        <nav className="header__menu header__menu-auth">
          <Link to="/" className="header__menu-item">
            Регистрация
          </Link>
          <Link to="/" className="header__menu-button">
            Войти
          </Link>
        </nav>
      ) : (
        <nav className="header__menu">
          <nav className="header__menu-items">
            <Link to="/" className="header__menu-item">
              Фильмы
            </Link>
            <Link to="/" className="header__menu-item">
              Сохранённые фильмы
            </Link>
          </nav>
          <Link to="/" className="header__profile-button">
            Аккаунт <div className="header__profile-icon"></div>
          </Link>
        </nav>
      )}
    </header>
  );
}

export default Header;
