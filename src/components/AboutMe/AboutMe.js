import "./AboutMe.css";
import { Link } from "react-router-dom";

import aboutMeImg from "../../images/about-me-img.png";

function AboutMe() {
  return (
    <section id="about-me" className="about-me">
      <h2 className="about-me__title">Студент</h2>
      <div className="about-me__content">
        <article className="about-me__article">
          <h3 className="about-me__name">Виталий</h3>
          <p className="about-me__description">Фронтенд-разработчик, 30 лет</p>
          <p className="about-me__paragraph">
            Я родился и живу в Саратове, закончил факультет экономики СГУ. У
            меня есть жена и дочь. Я люблю слушать музыку, а ещё увлекаюсь
            бегом. Недавно начал кодить. С 2015 года работал в компании «СКБ
            Контур». После того, как прошёл курс по веб-разработке, начал
            заниматься фриланс-заказами и ушёл с постоянной работы.
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
