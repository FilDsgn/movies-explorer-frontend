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
      buttonTextOnLoading,
      formBottomText,
      linkText,
      link,
      handleSubmit,
      onLoading,
      isValid,
      errMessage,
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
        <Link to="/" className="auth-form__logo">
          <img src={logo} alt="logo bitfilms"></img>
        </Link>
        <h2 className="auth-form__title">{title}</h2>
        {children}
        <span className="auth-form__error-message">{errMessage}</span>
        <button
          type="submit"
          disabled={onLoading}
          className={`auth-form__button ${
            !isValid || onLoading ? "auth-form__button_disabled" : ""
          }`}
        >
          {!onLoading ? buttonText : buttonTextOnLoading}
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
