import "./Portfolio.css";
import { Link } from "react-router-dom";

function Portfolio() {
  return (
    <section className="portfolio">
      <h2 className="portfolio__title">Портфолио</h2>
      <ul className="portfolio__list">
        <li className="portfolio__list-item">
          <Link to="/" className="portfolio__list-link">
            Статичный сайт
          </Link>
          <Link to="/" className="portfolio__list-link">
            &#8599;
          </Link>
        </li>
        <li className="portfolio__list-item">
          <Link to="/" className="portfolio__list-link">
            Адаптивный сайт
          </Link>
          <Link to="/" className="portfolio__list-link">
            &#8599;
          </Link>
        </li>
        <li className="portfolio__list-item">
          <Link to="/" className="portfolio__list-link">
            Одностраничное приложение
          </Link>
          <Link to="/" className="portfolio__list-link">
            &#8599;
          </Link>
        </li>
      </ul>
    </section>
  );
}

export default Portfolio;
