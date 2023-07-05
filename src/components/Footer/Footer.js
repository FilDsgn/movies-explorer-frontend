import "./Footer.css";
import { Link } from "react-router-dom";

function Footer() {
  return (
    <section className="footer">
      <div className="footer__container">
        <h2 className="footer__title">
          Учебный проект Яндекс.Практикум х BeatFilm.
        </h2>
        <div className="footer__content">
          <p className="footer__copyright">&copy; 2020</p>
          <ul className="footer__list">
            <li>
              <Link to="/" className="footer__list-item">
                Яндекс.Практикум
              </Link>
            </li>
            <li>
              <Link to="/" className="footer__list-item">
                Github
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </section>
  );
}

export default Footer;
