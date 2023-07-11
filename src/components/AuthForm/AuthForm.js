import "./AuthForm.css";

import logo from "../../images/logo.svg";

import { Link } from "react-router-dom";

function AuthForm({
  name,
  title,
  buttonText,
  formBottomText,
  linkText,
  children,
}) {
  return (
    <form name={name} className="auth-form">
      <img src={logo} alt="logo" className="auth-form__logo"></img>
      <h2 className="auth-form__title">{title}</h2>
      {children}
      <button type="submit" className="auth-form__button">
        {buttonText}
      </button>
      <span className="auth-form__text">
        {formBottomText}{" "}
        <Link to="/" className="auth-form__link">
          {linkText}
        </Link>
      </span>
    </form>
  );
}

export default AuthForm;
