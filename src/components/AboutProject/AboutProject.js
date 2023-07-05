import "./AboutProject.css";

function AboutProject() {
  return (
    <section className="about-project">
      <h2 className="about-project__title">О проекте</h2>
      <div className="about-project__columns">
        <div className="about-project__column">
          <h3 className="about-project__column-title">
            Дипломный проект включал 5 этапов
          </h3>
          <p className="about-project__column-paragraph">
            Составление плана, работу над бэкендом, вёрстку, добавление
            функциональности и финальные доработки.
          </p>
        </div>
        <div className="about-project__column">
          <h3 className="about-project__column-title">
            Дипломный проект включал 5 этапов
          </h3>
          <p className="about-project__column-paragraph">
            У каждого этапа был мягкий и жёсткий дедлайн, которые нужно было
            соблюдать, чтобы успешно защититься.
          </p>
        </div>
      </div>

      <div className="about-project__timeline">
        <p className="about-project__timeline-paragraph about-project__timeline-paragraph_main-color">
          1 неделя
        </p>
        <p className="about-project__timeline-paragraph">4 недели</p>

        <h3 className="about-project__timeline-title">Back-end</h3>
        <h3 className="about-project__timeline-title">Front-end</h3>
      </div>
    </section>
  );
}

export default AboutProject;
