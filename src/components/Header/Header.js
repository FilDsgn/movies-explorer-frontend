import "./Header.css";
import { Link } from "react-router-dom";

import logo from "../../images/logo.svg";

import Navigation from "../Navigation/Navigation.js";
import NavigationAuth from "../NavigationAuth/NavigationAuth.js";

function Header({ isLoggedIn }) {
  return (
    <header className="header">
      <Link to="/" className="header__logo">
        <img src={logo} alt="logo bitfilms"></img>
      </Link>
      {isLoggedIn ? <Navigation /> : <NavigationAuth />}
    </header>
  );
}

export default Header;
