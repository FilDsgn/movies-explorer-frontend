import "./NavTab.css";

import { Link } from "react-scroll";

function NavTab() {
  return (
    <nav className="navtab">
      <ul className="navtab__container">
        <li>
          <Link
            to="about-project"
            smooth={true}
            duration={500}
            className="navtab__item"
          >
            О проекте
          </Link>
        </li>
        <li>
          <Link
            to="techs"
            smooth={true}
            duration={500}
            className="navtab__item"
          >
            Технологии
          </Link>
        </li>
        <li>
          <Link
            to="about-me"
            smooth={true}
            duration={500}
            className="navtab__item"
          >
            Студент
          </Link>
        </li>
      </ul>
    </nav>

    // <nav className="navtab">
    //   <ul className="navtab__container">
    //     <li>
    //       <a href="#about-project" className="navtab__item">
    //         О проекте
    //       </a>
    //     </li>
    //     <li>
    //       <a href="#techs" className="navtab__item">
    //         Технологии
    //       </a>
    //     </li>
    //     <li>
    //       <a href="#about-me" className="navtab__item">
    //         Студент
    //       </a>
    //     </li>
    //   </ul>
    // </nav>
  );
}

export default NavTab;
