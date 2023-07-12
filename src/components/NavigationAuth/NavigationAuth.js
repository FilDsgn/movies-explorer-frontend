import "./NavigationAuth.css";

import { Link } from "react-router-dom";

function NavigationAuth() {
  return (
    <nav className="navigation-auth">
      <Link to="/signup" className="navigation-auth__item">
        Регистрация
      </Link>
      <Link to="/signin" className="navigation-auth__button">
        Войти
      </Link>
    </nav>
  );
}

export default NavigationAuth;
