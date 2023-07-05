import "./NavTab.css";
import { Link } from "react-router-dom";

function NavTab() {
  return (
    <nav className="navtab">
      <div className="navtab__container">
        <Link to="/" className="navtab__item">
          О проекте
        </Link>
        <Link to="/" className="navtab__item">
          Технологии
        </Link>
        <Link to="/" className="navtab__item">
          Студент
        </Link>
      </div>
    </nav>
  );
}

export default NavTab;
