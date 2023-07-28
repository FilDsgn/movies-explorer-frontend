import "./AuthForm.css";

import logo from "../../images/logo.svg";

import { forwardRef } from "react";
import { Link } from "react-router-dom";

const AuthForm = forwardRef(
  (
    {
      name,
      title,
      buttonText,
      formBottomText,
      linkText,
      link,
      handleSubmit,
      children,
    },
    ref
  ) => {
    return (
      <form
        action="#"
        name={name}
        onSubmit={handleSubmit}
        noValidate
        ref={ref}
        className="auth-form"
      >
        <img src={logo} alt="logo" className="auth-form__logo"></img>
        <h2 className="auth-form__title">{title}</h2>
        {children}
        <span className="auth-form__error-message">error error</span>
        <button type="submit" className="auth-form__button">
          {buttonText}
        </button>
        <span className="auth-form__text">
          {formBottomText}{" "}
          <Link to={link} className="auth-form__link">
            {linkText}
          </Link>
        </span>
      </form>
    );
  }
);

export default AuthForm;
