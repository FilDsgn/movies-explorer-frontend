import "./Register.css";

import { useEffect } from "react";
import useFormValidation from "../../hooks/useFormValidation.js";

import AuthForm from "../AuthForm/AuthForm.js";

function Register({ onSubmit, onTokenCheck, onLoading }) {
  const { values, errors, isValid, handleChange, setValue, formRef } =
    useFormValidation();

  useEffect(() => {
    setValue("name", "");
    setValue("email", "");
    setValue("password", "");
  }, [setValue]);

  function handleSubmit(e) {
    e.preventDefault();
    if (isValid) {
      const { email, password, name } = values;
      onSubmit(email, password, name);
    }
  }

  // useEffect(() => {
  //   onTokenCheck();
  // }, []);

  return (
    <AuthForm
      name="register"
      title="Добро пожаловать!"
      buttonText="Зарегистрироваться"
      formBottomText="Уже зарегистрированы?"
      linkText="Войти"
      link="/signin"
      handleSubmit={handleSubmit}
      onLoading={onLoading}
      isValid={isValid}
      ref={formRef}
    >
      <label className="auth-form__label">
        Имя
        <input
          type="name"
          name="name"
          onChange={handleChange}
          value={values["name"] ?? ""}
          minLength="2"
          maxLength="30"
          required
          className="auth-form__input"
        ></input>
        <span className="auth-form__input-error">{errors.name}</span>
      </label>
      <label className="auth-form__label">
        E-mail
        <input
          type="email"
          name="email"
          onChange={handleChange}
          value={values["email"] ?? ""}
          required
          className="auth-form__input"
        ></input>
        <span className="auth-form__input-error">{errors.email}</span>
      </label>
      <label className="auth-form__label">
        Пароль
        <input
          type="password"
          name="password"
          onChange={handleChange}
          value={values["password"] ?? ""}
          minLength="6"
          maxLength="15"
          required
          className="auth-form__input"
        ></input>
        <span className="auth-form__input-error">{errors.password}</span>
      </label>
    </AuthForm>
  );
}

export default Register;
