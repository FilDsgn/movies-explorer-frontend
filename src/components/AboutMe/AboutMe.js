import "./AboutMe.css";
import { Link } from "react-router-dom";

import aboutMeImg from "../../images/about-me-img2.png";

function AboutMe() {
  return (
    <section id="about-me" className="about-me">
      <h2 className="about-me__title">Разработчик проекта</h2>
      <div className="about-me__content">
        <article className="about-me__article">
          <h3 className="about-me__name">Александр</h3>
          <p className="about-me__description">Фронтенд-разработчик, 31 год</p>
          <p className="about-me__paragraph">
            Я родился и живу в Ростовской области, закончил РГСУ. Занимался
            дизайном и созданием контента для соц сетей. С недавнего времени
            начал кодить, прошел обучение в Яндекс.Практикум. Сейчас развиваюсь
            в фронтенд разработке и планирую продолжать работать в этой сфере.
          </p>
          <Link
            to="https://github.com/FilDsgn"
            target="_blank"
            className="about-me__link"
          >
            Github
          </Link>
        </article>
        <img
          src={aboutMeImg}
          alt="student avatar"
          className="about-me__photo"
        ></img>
      </div>
    </section>
  );
}

export default AboutMe;
