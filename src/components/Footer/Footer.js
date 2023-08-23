import "./Footer.css";
import { Link } from "react-router-dom";

function Footer() {
  return (
    <footer className="footer">
      <div className="footer__container">
        <h2 className="footer__title">Проект BeatFilm.</h2>
        <div className="footer__content">
          <p className="footer__copyright">&copy; 2023</p>
          <ul className="footer__list">
            <li>
              <Link
                to="https://practicum.yandex.ru/"
                target="_blank"
                className="footer__list-item"
              >
                Яндекс.Практикум
              </Link>
            </li>
            <li>
              <Link
                to="https://github.com/FilDsgn"
                target="_blank"
                className="footer__list-item"
              >
                Github
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
